import fs from 'node:fs'

const html = fs.readFileSync('.tmp-ccswitch-page.html', 'utf8').replace(/&quot;/g, '"').replace(/&amp;/g, '&')
const seen = new Set()
for (const m of html.matchAll(/srcSet="([^"]+)"/g)) {
  for (const part of m[1].split(',')) {
    const url = part.trim().split(/\s+/)[0]
    if (url.includes('/_next/static/media/')) seen.add(url)
  }
}
for (const u of [...seen].sort()) console.log(u)
