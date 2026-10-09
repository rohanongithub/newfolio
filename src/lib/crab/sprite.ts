/** The crab: a 15x12 pixel sprite composed from small layers, rendered as SVG rects. Browser only. */

export const COLS = 15
export const ROWS = 12
/** Row of the shell's top edge. Rows above it are for raised claws and the "!" and "z" marks. */
export const T = 5

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

const CLAWS: Record<Claws, [number, number][]> = {
  low: [[0, T], [2, T], [0, T + 1], [1, T + 1], [2, T + 1], [2, T + 2]],
  out: [
    [0, T - 1], [2, T - 1], [0, T], [1, T], [2, T], [2, T + 1],
  ],
  up: [
    [0, T - 4], [2, T - 4], [0, T - 3], [1, T - 3], [2, T - 3],
    [1, T - 2], [2, T - 1], [2, T], [2, T + 1],
  ],
}

const FEET: Record<Legs, number[][]> = {
  stand: [[4, 6, 8, 10], [4, 6, 8, 10]],
  spread: [[4, 6, 8, 10], [3, 5, 9, 11]],
  tuck: [[4, 6, 8, 10], []],
}

function compose(look: Look): Grid {
  const g: Grid = Array.from({ length: ROWS }, () => Array(COLS).fill('.'))

  // Shell
  for (let c = 4; c <= 10; c++) put(g, c, T, 'o')
  for (let r = T + 1; r <= T + 3; r++) for (let c = 3; c <= 11; c++) put(g, c, r, 'o')
  for (let c = 4; c <= 10; c++) put(g, c, T + 4, 's')
  putAll(g, [[3, T + 3], [11, T + 3]], 's')

  // Claws (left, then mirrored)
  const claw = CLAWS[look.claws]
  putAll(g, claw, 'o')
  putAll(g, mirror(claw), 'o')

  // Legs
  FEET[look.legs].forEach((cols, i) => cols.forEach((c) => put(g, c, T + 5 + i, 's')))

  // Eyes
  const eyes: Record<Eyes, { k: [number, number][]; w?: [number, number][] }> = {
    open: { k: [[5, T + 1], [5, T + 2], [9, T + 1], [9, T + 2]] },
    blink: { k: [[5, T + 2], [9, T + 2]] },
    wide: {
      k: [
        [5, T + 1], [6, T + 1], [5, T + 2], [6, T + 2], [5, T + 3], [6, T + 3],
        [8, T + 1], [9, T + 1], [8, T + 2], [9, T + 2], [8, T + 3], [9, T + 3],
      ],
      w: [[5, T + 1], [8, T + 1]],
    },
    happy: {
      k: [
        [4, T + 1], [5, T + 1], [6, T + 1], [4, T + 2], [6, T + 2],
        [8, T + 1], [9, T + 1], [10, T + 1], [8, T + 2], [10, T + 2],
      ],
    },
    sleep: {
      k: [[4, T + 2], [5, T + 2], [6, T + 2], [8, T + 2], [9, T + 2], [10, T + 2]],
    },
  }
  const e = eyes[look.eyes]
  putAll(g, e.k, 'k')
  if (e.w) putAll(g, e.w, 'w')

  // Marks
  if (look.mark === 'bang') putAll(g, [[7, 0], [7, 1], [7, 3]], 'w')
  if (look.mark === 'zzz')
    putAll(
      g,
      [[11, 0], [12, 0], [13, 0], [14, 0], [13, 1], [12, 2], [11, 3], [12, 3], [13, 3], [14, 3]],
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
