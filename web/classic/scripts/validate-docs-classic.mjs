/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later

Validate classic docs guide JS: no TS syntax, no encoding corruption.
Exit 1 on failure.
*/
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const guidesDir = path.resolve(__dirname, '../src/features/docs/guides')

const TS_PATTERNS = [
  { name: 'import type', re: /import type\s+\{/ },
  { name: 'export type', re: /export type\s+/ },
  { name: 'Record<> annotation', re: /:\s*Record</ },
  { name: ': Lang return', re: /:\s*Lang\b/ },
  { name: 'typed function arg', re: /function\s+\w+\([^)]*:\s*string/ },
  { name: 'GuideCopy type', re: /:\s*GuideCopy/ },
  { name: 'doubled GuideMarkdown export', re: /export function get\w+GuideMarkdownGuideMarkdown/ },
]

/** Must exist after sync from default (UTF-8 sanity) */
const REQUIRED_SNIPPETS = [
  { file: 'integration-markdown.js', snippets: ["'# API 文档'", '完整接口文档', 'Cherry Studio × 1router.ai'] },
  { file: 'integration-guide-content.js', snippets: ['参数配置', '配置步骤', '桌面端多模型'] },
  { file: 'claude-code-guide-markdown.js', snippets: ['Claude Code 教程', 'docs-figure-grid'] },
  { file: 'opencode-guide-markdown.js', snippets: ['OpenCode 教程', 'router-anthropic'] },
]

/** Corrupted / placeholder Chinese */
const BAD_PATTERNS = [
  { name: 'placeholder API title', re: /'# API \?\?'/ },
  { name: 'run of question marks in zh string', re: /'[^'\n]*\?{4,}[^'\n]*'/ },
]

let failed = false

function fail(msg) {
  console.error('FAIL:', msg)
  failed = true
}

const files = fs.readdirSync(guidesDir).filter((f) => f.endsWith('.js'))

for (const file of files) {
  const content = fs.readFileSync(path.join(guidesDir, file), 'utf8')
  for (const { name, re } of TS_PATTERNS) {
    if (re.test(content)) {
      fail(`${file}: TypeScript leftover (${name})`)
    }
  }
  for (const { name, re } of BAD_PATTERNS) {
    if (re.test(content)) {
      fail(`${file}: encoding corruption (${name})`)
    }
  }
}

for (const { file, snippets } of REQUIRED_SNIPPETS) {
  const p = path.join(guidesDir, file)
  if (!fs.existsSync(p)) {
    fail(`missing ${file}`)
    continue
  }
  const content = fs.readFileSync(p, 'utf8')
  for (const s of snippets) {
    if (!content.includes(s)) {
      fail(`${file}: missing expected snippet: ${s}`)
    }
  }
}

// DocsGuideMarkdown must use rehype-raw
const guideMd = fs.readFileSync(
  path.resolve(__dirname, '../src/features/docs/components/DocsGuideMarkdown.jsx'),
  'utf8'
)
if (!guideMd.includes('RehypeRaw')) {
  fail('DocsGuideMarkdown.jsx: missing RehypeRaw (HTML blocks will show as text)')
}

if (failed) {
  console.error('\nFix: node scripts/sync-docs-from-default.mjs')
  process.exit(1)
}

console.log(`OK: validated ${files.length} guide files + DocsGuideMarkdown`)
