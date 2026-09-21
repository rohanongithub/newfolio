import { type Rng } from './random'

export type Hsl = { h: number; s: number; l: number }

export type Scheme = 'analogous' | 'split' | 'triad' | 'tonal' | 'complement'

export type Palette = {
  scheme: Scheme
  hue: number
  deep: boolean
  ground: Hsl
  ink: Hsl
  /** Secondary text (captions, labels); at least 4.5:1 on the ground. */
  inkSoft: Hsl
  /** Four art colours, light to strong. */
  art: [Hsl, Hsl, Hsl, Hsl]
  /** Stamp ink colours. */
  stamp: [Hsl, Hsl]
}

const HUES_KEY = 'visitor-card:hues'
const HUES_KEPT = 6
/** Minimum distance, in degrees, between a new base hue and any of the recent ones. */
export const HUE_GAP = 24

export const wrap = (h: number) => ((h % 360) + 360) % 360
export const hueDistance = (a: number, b: number) => {
  const d = Math.abs(wrap(a) - wrap(b))
  return Math.min(d, 360 - d)
}

export const css = ({ h, s, l }: Hsl, alpha = 1) =>
  alpha >= 1
    ? `hsl(${wrap(h).toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}%)`
    : `hsl(${wrap(h).toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}% / ${alpha})`

export function lerp(a: Hsl, b: Hsl, t: number): Hsl {
  let dh = wrap(b.h) - wrap(a.h)
  if (dh > 180) dh -= 360
  if (dh < -180) dh += 360
  return { h: wrap(a.h + dh * t), s: a.s + (b.s - a.s) * t, l: a.l + (b.l - a.l) * t }
}

function toRgb({ h, s, l }: Hsl): [number, number, number] {
  const S = s / 100
  const L = l / 100
  const k = (n: number) => (n + wrap(h) / 30) % 12
  const a = S * Math.min(L, 1 - L)
  const f = (n: number) => L - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [f(0), f(8), f(4)]
}

export function luminance(color: Hsl): number {
  const [r, g, b] = toRgb(color).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  )
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: Hsl, b: Hsl): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/** Moves the lightness of `fg` away from `bg` until the pair reaches `min`. */
function withContrast(fg: Hsl, bg: Hsl, min: number): Hsl {
  const dir = luminance(bg) > 0.4 ? -1 : 1
  const out = { ...fg }
  while (contrast(out, bg) < min && out.l > 0 && out.l < 100) out.l += dir
  return out
}

function readHues(): number[] {
  try {
    const raw = JSON.parse(localStorage.getItem(HUES_KEY) ?? '[]')
    return Array.isArray(raw) ? raw.filter((n) => typeof n === 'number') : []
  } catch {
    return []
  }
}

function rememberHue(hue: number) {
  try {
    localStorage.setItem(
      HUES_KEY,
      JSON.stringify([hue, ...readHues()].slice(0, HUES_KEPT)),
    )
  } catch {
    // Storage can be blocked; the cards then just lose the repeat guard.
  }
}

/**
 * A base hue at least HUE_GAP away from the recent ones. The hue is continuous, so an exact
 * repeat is practically impossible; the gap makes near repeats rare too.
 */
export function pickHue(rng: Rng, recent: readonly number[]): number {
  let best = rng.range(0, 360)
  let bestGap = -1
  for (let i = 0; i < 48; i++) {
    const hue = rng.range(0, 360)
    const gap = recent.length ? Math.min(...recent.map((r) => hueDistance(hue, r))) : 360
    if (gap >= HUE_GAP) return hue
    if (gap > bestGap) [best, bestGap] = [hue, gap]
  }
  return best
}

const SCHEMES: Scheme[] = ['analogous', 'split', 'triad', 'tonal', 'complement']

export function makePalette(rng: Rng, recent: readonly number[] = readHues()): Palette {
  const hue = pickHue(rng, recent)
  const scheme = rng.pick(SCHEMES)
  const deep = rng.chance(0.14)

  const offsets: Record<Scheme, number[]> = {
    analogous: [0, rng.range(24, 42), rng.range(48, 80), rng.range(-40, -20)],
    split: [0, 150, 210, rng.range(-20, 20)],
    triad: [0, 120, 240, rng.range(-15, 15)],
    tonal: [0, rng.range(8, 16), rng.range(-16, -8), rng.range(20, 30)],
    complement: [0, 180, rng.range(160, 200), rng.range(-24, 24)],
  }
  const [o0, o1, o2, o3] = offsets[scheme]
  const sat = () => rng.range(62, 92)

  const art: Palette['art'] = [
    { h: hue + o0, s: sat(), l: rng.range(70, 82) },
    { h: hue + o1, s: sat(), l: rng.range(56, 68) },
    { h: hue + o2, s: sat(), l: rng.range(42, 56) },
    { h: hue + o3, s: sat(), l: rng.range(28, 42) },
  ]
  if (scheme === 'tonal') art.forEach((c) => (c.s = rng.range(55, 80)))

  const groundHue = hue + rng.range(-12, 12)
  const ground: Hsl = deep
    ? { h: groundHue, s: rng.range(32, 52), l: rng.range(9, 14) }
    : { h: groundHue, s: rng.range(28, 55), l: rng.range(92, 96.5) }
  const ink: Hsl = deep
    ? { h: groundHue, s: 30, l: 94 }
    : { h: groundHue, s: rng.range(40, 55), l: 11 }
  const inkSoft = withContrast(
    { h: groundHue, s: deep ? 22 : 30, l: deep ? 72 : 32 },
    ground,
    4.5,
  )
  const stampBase = deep ? 68 : 36
  const stamp: Palette['stamp'] = [
    { h: hue + o1, s: rng.range(70, 90), l: stampBase },
    { h: hue + o2 + 180, s: rng.range(65, 85), l: stampBase },
  ]
  return { scheme, hue, deep, ground, ink, inkSoft, art, stamp }
}

/** Call once a card is actually shown, so hidden re-rolls do not crowd the history. */
export function recordHue(hue: number) {
  rememberHue(hue)
}
