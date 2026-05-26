import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const defaultLocales = path.resolve(__dirname, '../../default/src/i18n/locales')
const classicLocales = path.resolve(__dirname, '../src/i18n/locales')

const PREFIXES = [
  'docs.integration.',
  'docs.opencode.',
  'docs.codex.',
  'docs.openclaw.',
  'docs.lobechat.',
  'docs.ccSwitch.',
  'docs.claudeCode.',
  'docs.cursor.',
  'docs.guide.',
]

const localeMap = {
  en: 'en.json',
  zh: 'zh-CN.json',
  fr: 'fr.json',
  ja: 'ja.json',
  ru: 'ru.json',
  vi: 'vi.json',
}

const extraClassicLocales = ['zh.json', 'zh-TW.json']

function pickDocsKeys(obj) {
  const out = {}
  for (const [k, v] of Object.entries(obj)) {
    if (PREFIXES.some((p) => k.startsWith(p))) out[k] = v
  }
  return out
}

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''))

for (const [defLang, classicFile] of Object.entries(localeMap)) {
  const defPath = path.join(defaultLocales, `${defLang}.json`)
  const classicPath = path.join(classicLocales, classicFile)
  if (!fs.existsSync(defPath) || !fs.existsSync(classicPath)) {
    console.warn('skip', defLang, classicFile)
    continue
  }
  const def = readJson(defPath)
  const classic = readJson(classicPath)
  const docsKeys = pickDocsKeys(def.translation ?? def)
  const tr = classic.translation ?? classic
  let n = 0
  for (const [k, v] of Object.entries(docsKeys)) {
    if (k.includes('.continue.')) continue
    if (tr[k] !== v) {
      tr[k] = v
      n++
    }
  }
  fs.writeFileSync(classicPath, `${JSON.stringify(classic, null, 2)}\n`, 'utf8')
  console.log(classicFile, 'updated', n, 'keys')
}

const zhDocs = pickDocsKeys(readJson(path.join(defaultLocales, 'zh.json')))
for (const classicFile of extraClassicLocales) {
  const classicPath = path.join(classicLocales, classicFile)
  if (!fs.existsSync(classicPath)) continue
  const classic = readJson(classicPath)
  const tr = classic.translation ?? classic
  let n = 0
  for (const [k, v] of Object.entries(zhDocs)) {
    if (k.includes('.continue.')) continue
    if (tr[k] !== v) {
      tr[k] = v
      n++
    }
  }
  fs.writeFileSync(classicPath, `${JSON.stringify(classic, null, 2)}\n`, 'utf8')
  console.log(classicFile, 'updated', n, 'keys (from zh)')
}
