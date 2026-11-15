/** The crab: a 12x12 pixel sprite composed from small layers, rendered as SVG rects. Browser only.
 *  Shape: a wide block body with a square arm on each side, square eyes and four short legs. */

export const COLS = 12
export const ROWS = 12
/** Row of the shell's top edge. Rows above it are for raised arms and the "!" and "z" marks. */
export const T = 4

export type FrameName =
  | 'idle'
  | 'blink'
  | 'walkA'
  | 'walkB'
  | 'runA'
  | 'runB'
  | 'jump'
  | 'shock'
  | 'happy'
  | 'sleep'
  | 'hang'
  | 'hangB'

type Eyes = 'open' | 'blink' | 'wide' | 'happy' | 'sleep'
type Claws = 'low' | 'out' | 'up'
type Legs = 'stand' | 'spread' | 'tuck'
type Mark = 'bang' | 'zzz' | null

type Look = { eyes: Eyes; claws: Claws; legs: Legs; mark?: Mark }

const LOOKS: Record<FrameName, Look> = {
  idle: { eyes: 'open', claws: 'low', legs: 'stand' },
  blink: { eyes: 'blink', claws: 'low', legs: 'stand' },
  walkA: { eyes: 'open', claws: 'low', legs: 'spread' },
  walkB: { eyes: 'open', claws: 'low', legs: 'stand' },
  runA: { eyes: 'wide', claws: 'out', legs: 'spread' },
  runB: { eyes: 'wide', claws: 'out', legs: 'stand' },
  jump: { eyes: 'open', claws: 'out', legs: 'tuck' },
  shock: { eyes: 'wide', claws: 'up', legs: 'tuck', mark: 'bang' },
  happy: { eyes: 'happy', claws: 'up', legs: 'stand' },
  sleep: { eyes: 'sleep', claws: 'low', legs: 'tuck', mark: 'zzz' },
  hang: { eyes: 'open', claws: 'up', legs: 'spread' },
  hangB: { eyes: 'open', claws: 'up', legs: 'stand' },
}

// o body, s shade, k ink, w white
type Grid = string[][]

function put(g: Grid, c: number, r: number, ch: string) {
  if (c >= 0 && c < COLS && r >= 0 && r < ROWS) g[r][c] = ch
}

function putAll(g: Grid, pts: [number, number][], ch: string) {
  for (const [c, r] of pts) put(g, c, r, ch)
}

function mirror(pts: [number, number][]): [number, number][] {
  return pts.map(([c, r]) => [COLS - 1 - c, r])
}

/** One square arm per side (2 wide), written for the left side and mirrored. */
const CLAWS: Record<Claws, [number, number][]> = {
  low: block(0, T + 2, 2, 2),
  out: block(0, T + 1, 2, 2),
  // Raised: the arm stands up on the side of the body.
  up: block(0, T - 2, 2, 6),
}

function block(c: number, r: number, w: number, h: number): [number, number][] {
  const pts: [number, number][] = []
  for (let y = r; y < r + h; y++) for (let x = c; x < c + w; x++) pts.push([x, y])
  return pts
}

/** Legs sit under the body at columns 2, 4, 7 and 9, two rows tall. Spread splays them outward. */
const FEET: Record<Legs, number[][]> = {
  stand: [[2, 4, 7, 9], [2, 4, 7, 9]],
  spread: [[2, 4, 7, 9], [1, 5, 6, 10]],
  tuck: [[2, 4, 7, 9], []],
}

function compose(look: Look): Grid {
  const g: Grid = Array.from({ length: ROWS }, () => Array(COLS).fill('.'))

  // Body: one 8x6 block
  putAll(g, block(2, T, 8, 6), 'o')

  // Arms (left, then mirrored)
  const claw = CLAWS[look.claws]
  putAll(g, claw, 'o')
  putAll(g, mirror(claw), 'o')

  // Legs
  FEET[look.legs].forEach((cols, i) => cols.forEach((c) => put(g, c, T + 6 + i, 'o')))

  // Eyes: single squares, set in from each side
  const eyes: Record<Eyes, { k: [number, number][]; w?: [number, number][] }> = {
    open: { k: [[3, T + 1], [8, T + 1]] },
    blink: { k: [[3, T + 2], [8, T + 2]] },
    wide: {
      k: [
        [3, T + 1], [4, T + 1], [3, T + 2], [4, T + 2],
        [7, T + 1], [8, T + 1], [7, T + 2], [8, T + 2],
      ],
      w: [[3, T + 1], [7, T + 1]],
    },
    happy: {
      k: [[3, T + 1], [2, T + 2], [4, T + 2], [8, T + 1], [7, T + 2], [9, T + 2]],
    },
    sleep: {
      k: [[2, T + 2], [3, T + 2], [4, T + 2], [7, T + 2], [8, T + 2], [9, T + 2]],
    },
  }
  const e = eyes[look.eyes]
  putAll(g, e.k, 'k')
  if (e.w) putAll(g, e.w, 'w')

  // Marks
  if (look.mark === 'bang') putAll(g, [[5, 0], [6, 0], [5, 1], [6, 1], [5, 3], [6, 3]], 'w')
  if (look.mark === 'zzz')
    putAll(
      g,
      [[8, 0], [9, 0], [10, 0], [11, 0], [10, 1], [9, 2], [8, 3], [9, 3], [10, 3], [11, 3]],
      'w',
    )

  return g
}

function toRects(g: Grid): string {
  let out = ''
  for (let r = 0; r < ROWS; r++) {
    let c = 0
    while (c < COLS) {
      const ch = g[r][c]
      if (ch === '.') {
        c++
        continue
      }
      let end = c
      while (end + 1 < COLS && g[r][end + 1] === ch) end++
      out += `<rect class="cb-${ch}" x="${c}" y="${r}" width="${end - c + 1}" height="1"/>`
      c = end + 1
    }
  }
  return out
}

export const FRAMES = Object.fromEntries(
  (Object.keys(LOOKS) as FrameName[]).map((name) => [name, toRects(compose(LOOKS[name]))]),
) as Record<FrameName, string>

/** A one-colour crab icon (follows `currentColor`, like the site's other icons) at the given pixel size. */
export function crabIcon(px: number): string {
  const rects = FRAMES.idle.replace(/class="cb-[a-z]"/g, '')
  return `<svg viewBox="0 0 ${COLS} ${ROWS}" width="${COLS * px}" height="${ROWS * px}" fill="currentColor" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${rects}</svg>`
}
