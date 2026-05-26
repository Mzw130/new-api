import fs from 'node:fs'

const html = fs.readFileSync('.tmp-cursor-page.html', 'utf8').replace(/&quot;/g, '"').replace(/&amp;/g, '&')
const patterns = [
  /\/_next\/static\/media\/[^\s"']+/g,
  /cursor[^"'\s]*\.(webp|png|jpe?g)/gi,
  /images\/[^\s"']+\.(webp|png)/gi,
]
for (const p of patterns) {
  const hits = [...new Set(html.match(p) ?? [])]
  if (hits.length) {
    console.log(p, hits.slice(0, 20).join('\n'))
  }
}
