/** Ledges the crab can stand on: the top edges of elements marked `data-crab-perch`. Browser only. */

export type Perch = {
  el: Element
  /** Leftmost and rightmost position of the crab's left edge, in document coordinates. */
  x0: number
  x1: number
  /** Document y of the ledge (where the crab's feet go). */
  y: number
  /** False for ledges that sit over text (`data-crab-perch="hop"`): no rope hangs across them. */
  ropeable: boolean
}

/**
 * The painted extent of a heading's text: the width of the glyphs themselves and the top of its
 * tallest letter, so the crab stands on the letters instead of on the empty line box around them.
 */
function textBounds(el: Element): { left: number; right: number; top: number } | null {
  const node = el.firstChild?.nodeType === Node.TEXT_NODE ? el.firstChild : el.querySelector('*')?.firstChild
  const text = node?.textContent?.trim()
  if (!node || !text) return null
  const range = document.createRange()
  range.selectNodeContents(node)
  const rect = range.getBoundingClientRect()
  if (rect.width < 4) return null
  const cs = getComputedStyle(el)
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return null
  ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
  const m = ctx.measureText(text)
  if (!m.fontBoundingBoxAscent) return null
  // The content area starts at the top of the font ascent; the baseline sits that far below it.
  const baseline = rect.top + m.fontBoundingBoxAscent
  return { left: rect.left, right: rect.right, top: baseline - m.actualBoundingBoxAscent }
}

export function scanPerches(crabWidth: number): Perch[] {
  const sx = window.scrollX
  const sy = window.scrollY
  const viewWidth = document.documentElement.clientWidth
  const out: Perch[] = []
  document.querySelectorAll('[data-crab-perch]').forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.height < 4) return
    const text = el.hasAttribute('data-crab-text') ? textBounds(el) : null
    const left = Math.max(0, (text?.left ?? r.left) + sx)
    const right = Math.min(viewWidth, (text?.right ?? r.right) + sx)
    if (right - left < crabWidth + 12) return
    out.push({
      el,
      x0: left + 2,
      x1: right - crabWidth - 2,
      // A pixel into the letters, so the feet read as standing on them.
      y: Math.round((text ? text.top + 1 : r.top) + sy),
      ropeable: el.getAttribute('data-crab-perch') !== 'hop',
    })
  })
  return out
}

/** True when two scans describe the same ledges (within a pixel), so nothing needs to react. */
export function samePerches(a: Perch[], b: Perch[]): boolean {
  if (a.length !== b.length) return false
  return a.every((p, i) => {
    const q = b[i]
    return (
      p.el === q.el &&
      Math.abs(p.x0 - q.x0) < 1 &&
      Math.abs(p.x1 - q.x1) < 1 &&
      Math.abs(p.y - q.y) < 1
    )
  })
}
