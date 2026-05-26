import fs from 'node:fs'
import path from 'node:path'

const htmlFile = process.argv[2]
const outDir = process.argv[3]
if (!htmlFile || !outDir) {
  console.error('Usage: node download-doc-images.mjs <page.html> <public/docs/subdir>')
  process.exit(1)
}

const html = fs.readFileSync(htmlFile, 'utf8')
const decoded = html.replace(/&quot;/g, '"').replace(/&amp;/g, '&')

const media = new Map()
for (const m of decoded.matchAll(/\/_next\/static\/media\/([a-z0-9-]+\.[a-f0-9]+\.(?:webp|png))/g)) {
  const fileName = m[1]
  const base = fileName.replace(/\.[a-f0-9]+\.(webp|png)$/, '.$1')
  if (!media.has(base)) media.set(base, fileName)
}

const dest = path.join('public', 'docs', outDir)
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

console.log('done', media.size, 'files ->', dest)
