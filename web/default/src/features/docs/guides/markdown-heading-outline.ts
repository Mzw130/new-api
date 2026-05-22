/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/

export type DocsHeading = {
  id: string
  text: string
  level: 2 | 3
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fff]+/gu, '-')
    .replace(/^-+|-+$/g, '')
}

/** Extract `##` / `###` headings for in-page TOC (skips document title `#`). */
export function extractMarkdownHeadings(markdown: string): DocsHeading[] {
  const headings: DocsHeading[] = []
  for (const line of markdown.split('\n')) {
    const m = /^(#{2,3})\s+(.+)$/.exec(line.trim())
    if (!m) continue
    const level = m[1].length as 2 | 3
    const raw = m[2].replace(/\*\*/g, '').replace(/`/g, '').trim()
    const id = slugify(raw) || `section-${headings.length}`
    headings.push({ id, text: raw, level })
  }
  return headings
}
