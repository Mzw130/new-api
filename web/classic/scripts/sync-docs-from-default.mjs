/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later

Sync docs guides + images from web/default to web/classic (UTF-8 safe).
Run: node scripts/sync-docs-from-default.mjs
Then: node scripts/validate-docs-classic.mjs
*/
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const webRoot = path.resolve(__dirname, '..')
const defaultRoot = path.resolve(webRoot, '../default')
const defaultGuides = path.join(defaultRoot, 'src/features/docs/guides')
const classicGuides = path.join(webRoot, 'src/features/docs/guides')
const defaultPublicDocs = path.join(defaultRoot, 'public/docs')
const classicPublicDocs = path.join(webRoot, 'public/docs')

/** Strip TypeScript syntax when copying .ts → .js */
function tsToJs(content) {
  return content
    .replace(/import type \{ IntegrationSlug \} from '\.\/integration-types'\r?\n/g, '')
    .replace(/import type[^;]+;\r?\n/g, '')
    .replace(/export type GuideLang[^\n]+\r?\n/g, '')
    .replace(/export type GuideCopy[^\n]+\r?\n/g, '')
    .replace(/export type IntegrationGuideContent = \{[\s\S]*?\}\r?\n\r?\n/g, '')
    .replace(/type Lang = 'zh' \| 'en'\r?\n/g, '')
    .replace(/export const INTEGRATION_MARKDOWN: Record<[\s\S]*?> =/g, 'export const INTEGRATION_MARKDOWN =')
    .replace(/export const INTEGRATION_GUIDE_CONTENT: Record<[\s\S]*?> =/g, 'export const INTEGRATION_GUIDE_CONTENT =')
    .replace(/export const OPENAI_COMPATIBLE_MARKDOWN: Record<[^>]+> =/g, 'export const OPENAI_COMPATIBLE_MARKDOWN =')
    .replace(/function g\(zh: string, en: string\): GuideCopy/g, 'function g(zh, en)')
    .replace(/: IntegrationGuideContent/g, '')
    .replace(/from '@\/features\/docs\/guides\//g, "from './")
    .replace(/from '@\/features\/docs\/guides\/docs-brand'/g, "from './docs-brand'")
    .replace(/export function pickGuideLang\(language: string\): GuideLang/g, 'export function pickGuideLang(language)')
    .replace(/export function tGuide\(copy: GuideCopy, lang: GuideLang\): string/g, 'export function tGuide(copy, lang)')
    .replace(/export function pickLang\(language: string\): Lang/g, 'export function pickLang(language)')
    .replace(
      /export function getIntegrationMarkdown\(\s*slug: IntegrationSlug,\s*language: string\s*\): string/g,
      'export function getIntegrationMarkdown(slug, language)'
    )
    .replace(/export function getOpenAiCompatibleMarkdown\(language: string\): string/g, 'export function getOpenAiCompatibleMarkdown(language)')
    .replace(/export function get(\w+)\(lang: string\): string/g, 'export function get$1(lang)')
    .replace(/ as const/g, '')
}

function writeUtf8(dest, content) {
  fs.writeFileSync(dest, content, { encoding: 'utf8' })
}

const guideModules = [
  'claude-code-guide-markdown.ts',
  'codex-cli-guide-markdown.ts',
  'cursor-guide-markdown.ts',
  'cc-switch-guide-markdown.ts',
  'opencode-guide-markdown.ts',
  'openclaw-guide-markdown.ts',
  'lobechat-guide-markdown.ts',
]

fs.mkdirSync(classicPublicDocs, { recursive: true })
fs.cpSync(defaultPublicDocs, classicPublicDocs, { recursive: true })
console.log('Copied public/docs -> classic/public/docs')

for (const file of guideModules) {
  const src = path.join(defaultGuides, file)
  const dest = path.join(classicGuides, file.replace(/\.ts$/, '.js'))
  writeUtf8(dest, tsToJs(fs.readFileSync(src, 'utf8')))
  console.log('Wrote', path.basename(dest))
}

for (const file of ['integration-markdown.ts', 'integration-guide-content.ts']) {
  const src = path.join(defaultGuides, file)
  const dest = path.join(classicGuides, file.replace(/\.ts$/, '.js'))
  writeUtf8(dest, tsToJs(fs.readFileSync(src, 'utf8')))
  console.log('Wrote', path.basename(dest))
}

console.log('Done. Run: node scripts/validate-docs-classic.mjs')
