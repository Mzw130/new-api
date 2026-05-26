import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const defaultGuides = path.resolve(__dirname, '../../default/src/features/docs/guides')
const classicGuides = path.resolve(__dirname, '../src/features/docs/guides')

function convertTsToJs(content) {
  return content
    .replace(/import type \{ IntegrationSlug \} from '\.\/integration-types'\r?\n/, '')
    .replace(/export type GuideLang[^\n]+\r?\n/g, '')
    .replace(/export type GuideCopy[^\n]+\r?\n/g, '')
    .replace(/export type IntegrationGuideContent = \{[\s\S]*?\}\r?\n\r?\n/, '')
    .replace(/type Lang = 'zh' \| 'en'\r?\n/, '')
    .replace(/from '@\/features\/docs\/guides\/docs-brand'/g, "from './docs-brand'")
    .replace(/from '@\/features\/docs\/guides\//g, "from './")
    .replace(/function g\(zh: string, en: string\): GuideCopy/g, 'function g(zh, en)')
    .replace(/: IntegrationGuideContent/g, '')
    .replace(
      /export const INTEGRATION_GUIDE_CONTENT: Record<[\s\S]*?> =/,
      'export const INTEGRATION_GUIDE_CONTENT ='
    )
    .replace(
      /export const INTEGRATION_MARKDOWN: Record<[\s\S]*?> =/,
      'export const INTEGRATION_MARKDOWN ='
    )
    .replace(
      /export const OPENAI_COMPATIBLE_MARKDOWN: Record<[^>]+> =/,
      'export const OPENAI_COMPATIBLE_MARKDOWN ='
    )
    .replace(/export function pickGuideLang\(language: string\): GuideLang/g, 'export function pickGuideLang(language)')
    .replace(/export function tGuide\(copy: GuideCopy, lang: GuideLang\): string/g, 'export function tGuide(copy, lang)')
    .replace(/export function pickLang\(language: string\): Lang/g, 'export function pickLang(language)')
    .replace(
      /export function getIntegrationMarkdown\(\s*slug: IntegrationSlug,\s*language: string\s*\): string/g,
      'export function getIntegrationMarkdown(slug, language)'
    )
    .replace(/export function getOpenAiCompatibleMarkdown\(language: string\): string/g, 'export function getOpenAiCompatibleMarkdown(language)')
    .replace(/export function get(\w+)GuideMarkdown\(lang: string\): string/g, 'export function get$1GuideMarkdown(lang)')
}

for (const file of ['integration-guide-content.ts', 'integration-markdown.ts']) {
  const src = path.join(defaultGuides, file)
  const dest = path.join(classicGuides, file.replace(/\.ts$/, '.js'))
  fs.writeFileSync(dest, convertTsToJs(fs.readFileSync(src, 'utf8')), 'utf8')
  console.log('fixed', path.basename(dest))
}

const guideFiles = fs.readdirSync(classicGuides).filter((f) => f.endsWith('-guide-markdown.js'))
for (const file of guideFiles) {
  const p = path.join(classicGuides, file)
  let c = fs.readFileSync(p, 'utf8')
  c = c.replace(/export function get(\w+)GuideMarkdown\(lang: string\): string/g, 'export function get$1GuideMarkdown(lang)')
  fs.writeFileSync(p, c, 'utf8')
}
