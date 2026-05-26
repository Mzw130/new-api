import fs from 'node:fs'

const file = process.argv[2] || 'tmp-codex.html'
const html = fs.readFileSync(file, 'utf8')
const decoded = html.replace(/&quot;/g, '"').replace(/&amp;/g, '&')

const media = new Map()
for (const m of decoded.matchAll(/\/_next\/static\/media\/([a-z0-9-]+\.[a-f0-9]+\.(?:webp|png))/g)) {
  const fileName = m[1]
  const base = fileName.replace(/\.[a-f0-9]+\.(webp|png)$/, '.$1')
  if (!media.has(base)) media.set(base, fileName)
}

console.log(JSON.stringify([...media.entries()], null, 2))
console.log('count', media.size)
