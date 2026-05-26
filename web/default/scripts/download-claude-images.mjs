import fs from 'node:fs'
import path from 'node:path'

const html = fs.readFileSync('.tmp-claude-page.html', 'utf8')
const decoded = html.replace(/&quot;/g, '"').replace(/&amp;/g, '&')

const media = new Map()
for (const m of decoded.matchAll(/\/_next\/static\/media\/([a-z0-9-]+\.[a-f0-9]+\.webp)/g)) {
  const file = m[1]
  const base = file.replace(/\.[a-f0-9]+\.webp$/, '.webp')
  if (!media.has(base)) media.set(base, file)
}

const dest = path.join('public', 'docs', 'claude-code')
fs.mkdirSync(dest, { recursive: true })

const origin = 'https://docs.easyrouter.io'

for (const [outName, hashed] of media) {
  const url = `${origin}/_next/static/media/${hashed}`
  const out = path.join(dest, outName)
  const res = await fetch(url)
  if (!res.ok) {
    console.error('FAIL', outName, res.status)
    continue
  }
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(out, buf)
  console.log(outName, buf.length)
}

console.log('done', media.size, 'files')
