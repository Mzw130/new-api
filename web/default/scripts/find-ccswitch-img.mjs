import fs from 'node:fs'

const h = fs.readFileSync('.tmp-ccswitch-page.html', 'utf8').replace(/&quot;/g, '"').replace(/&amp;/g, '&')
for (const label of ['填入 CC Switch', '确认导入', '令牌管理', 'cc-switch', 'ccswitch']) {
  const i = h.indexOf(label)
  if (i < 0) continue
  const chunk = h.slice(i, i + 4000)
  const media = [...chunk.matchAll(/\/_next\/static\/media\/([^"'\s]+)/g)].map((m) => m[1])
  if (media.length) console.log(label, media)
}

const all = [...h.matchAll(/\/_next\/static\/media\/([^"'\s]+\.(?:png|webp))/g)].map((m) => m[1])
console.log('all unique:', [...new Set(all)])
