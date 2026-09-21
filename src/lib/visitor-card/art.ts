import { ART } from './layout'
import { css, lerp, type Hsl, type Palette } from './palette'
import { type Rng } from './random'

export type ArtKind =
  | 'horizon'
  | 'orbit'
  | 'ridges'
  | 'dome'
  | 'bauhaus'
  | 'blobs'
  | 'stripes'
  | 'halftone'
  | 'bloom'
  | 'arches'

export const ART_KINDS: ArtKind[] = [
  'horizon',
  'orbit',
  'ridges',
  'dome',
  'bauhaus',
  'blobs',
  'stripes',
  'halftone',
  'bloom',
  'arches',
]

type Ctx = CanvasRenderingContext2D

type Box = { x: number; y: number; w: number; h: number }

function linear(ctx: Ctx, angle: number, a: Hsl, b: Hsl, box: Box = ART) {
  const cx = box.x + box.w / 2
  const cy = box.y + box.h / 2
  const len = (Math.abs(Math.cos(angle)) * box.w + Math.abs(Math.sin(angle)) * box.h) / 2
  const g = ctx.createLinearGradient(
    cx - Math.cos(angle) * len,
    cy - Math.sin(angle) * len,
    cx + Math.cos(angle) * len,
    cy + Math.sin(angle) * len,
  )
  g.addColorStop(0, css(a))
  g.addColorStop(1, css(b))
  return g
}

function glow(ctx: Ctx, x: number, y: number, r: number, alpha: number) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, `rgb(255 255 255 / ${alpha})`)
  g.addColorStop(1, 'rgb(255 255 255 / 0)')
  ctx.fillStyle = g
  ctx.fillRect(ART.x, ART.y, ART.w, ART.h)
}

/** Two big shapes split by a curved gap of paper, like a horizon line. */
function horizon(ctx: Ctx, p: Palette, rng: Rng) {
  const { x, y, w, h } = ART
  const [c0, c1, c2, c3] = p.art
  const gap = rng.range(26, 60)
  const yl = y + h * rng.range(0.38, 0.62)
  const yr = y + h * rng.range(0.38, 0.62)
  const k1 = rng.range(-0.5, 0.5) * h
  const k2 = rng.range(-0.5, 0.5) * h
  const curve = (dy: number) => {
    ctx.moveTo(x, yl + dy)
    ctx.bezierCurveTo(x + w * 0.33, yl + dy + k1, x + w * 0.66, yr + dy + k2, x + w, yr + dy)
  }

  ctx.fillStyle = css(p.ground)
  ctx.fillRect(x, y, w, h)

  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + w, y)
  ctx.lineTo(x + w, yr)
  ctx.bezierCurveTo(x + w * 0.66, yr + k2, x + w * 0.33, yl + k1, x, yl)
  ctx.closePath()
  ctx.fillStyle = linear(ctx, rng.range(0, Math.PI), c0, c2)
  ctx.fill()

  ctx.beginPath()
  curve(gap)
  ctx.lineTo(x + w, y + h)
  ctx.lineTo(x, y + h)
  ctx.closePath()
  ctx.fillStyle = linear(ctx, rng.range(0, Math.PI), c1, c3)
  ctx.fill()

  glow(ctx, x + w * rng.range(0.2, 0.8), y + h * rng.range(0.1, 0.35), 560, 0.3)
}

/** A sphere and concentric rings around an off-canvas centre. */
function orbit(ctx: Ctx, p: Palette, rng: Rng) {
  const { x, y, w, h } = ART
  const [c0, c1, c2, c3] = p.art
  ctx.fillStyle = linear(ctx, rng.range(0, Math.PI * 2), c0, c1)
  ctx.fillRect(x, y, w, h)

  const cx = x + w * rng.range(0.15, 0.85)
  const cy = y + h * rng.range(0.35, 0.95)
  const rings = rng.int(6, 10)
  const step = rng.range(70, 110)
  for (let i = rings; i >= 1; i--) {
    ctx.beginPath()
    ctx.arc(cx, cy, 120 + i * step, 0, Math.PI * 2)
    ctx.fillStyle = css(lerp(c1, c2, i / rings), i % 2 ? 0.34 : 0.18)
    ctx.fill()
    ctx.lineWidth = rng.range(2, 7)
    ctx.strokeStyle = css(p.ground, 0.55)
    ctx.stroke()
  }
  ctx.beginPath()
  ctx.arc(cx, cy, 190, 0, Math.PI * 2)
  ctx.fillStyle = linear(ctx, rng.range(0, Math.PI * 2), c2, c3, {
    x: cx - 190,
    y: cy - 190,
    w: 380,
    h: 380,
  })
  ctx.fill()
  ctx.beginPath()
  ctx.arc(cx - 50, cy - 60, 160, 0, Math.PI * 2)
  ctx.fillStyle = 'rgb(255 255 255 / 0.12)'
  ctx.fill()

  glow(ctx, x + w * rng.range(0.1, 0.9), y + h * 0.15, 520, 0.28)
}

/** Layered wavy ridges from the sky colour to the strongest colour. */
function ridges(ctx: Ctx, p: Palette, rng: Rng) {
  const { x, y, w, h } = ART
  const [c0, , , c3] = p.art
  ctx.fillStyle = linear(ctx, Math.PI / 2, lerp(c0, p.ground, 0.4), c0)
  ctx.fillRect(x, y, w, h)

  const layers = rng.int(6, 10)
  for (let i = 0; i < layers; i++) {
    const t = i / (layers - 1)
    const base = y + h * (0.22 + t * 0.7)
    const a1 = rng.range(20, 70)
    const a2 = rng.range(10, 30)
    const f1 = rng.range(0.004, 0.009)
    const f2 = rng.range(0.011, 0.02)
    const p1 = rng.range(0, 6.3)
    const p2 = rng.range(0, 6.3)
    ctx.beginPath()
    ctx.moveTo(x, y + h)
    for (let px = 0; px <= w; px += 8) {
      ctx.lineTo(x + px, base + Math.sin(px * f1 + p1) * a1 + Math.sin(px * f2 + p2) * a2)
    }
    ctx.lineTo(x + w, y + h)
    ctx.closePath()
    const mix = i % 2 ? t : t * 0.85
    ctx.fillStyle = css(lerp(p.art[1 + (i % 2)], c3, mix))
    ctx.fill()
    ctx.lineWidth = 5
    ctx.strokeStyle = css(p.ground, 0.7)
    ctx.stroke()
  }
  glow(ctx, x + w * rng.range(0.2, 0.8), y + h * 0.12, 500, 0.35)
}

/** A dome rising from a baseline, with rays and inner arcs. */
function dome(ctx: Ctx, p: Palette, rng: Rng) {
  const { x, y, w, h } = ART
  const [c0, c1, c2, c3] = p.art
  ctx.fillStyle = linear(ctx, Math.PI / 2, c0, lerp(c0, c1, 0.6))
  ctx.fillRect(x, y, w, h)

  const cx = x + w * rng.range(0.3, 0.7)
  const base = y + h * rng.range(0.62, 0.8)
  const radius = rng.range(300, 440)

  ctx.save()
  ctx.beginPath()
  ctx.rect(x, y, w, h)
  ctx.clip()
  const rays = rng.int(14, 26)
  ctx.strokeStyle = 'rgb(255 255 255 / 0.22)'
  ctx.lineWidth = 3
  for (let i = 0; i < rays; i++) {
    const a = Math.PI + (Math.PI * (i + 0.5)) / rays
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(a) * (radius + 30), base + Math.sin(a) * (radius + 30))
    ctx.lineTo(cx + Math.cos(a) * 1600, base + Math.sin(a) * 1600)
    ctx.stroke()
  }
  ctx.restore()

  ctx.beginPath()
  ctx.arc(cx, base, radius, Math.PI, 0)
  ctx.closePath()
  ctx.fillStyle = linear(ctx, Math.PI / 2, c2, c3, {
    x: cx - radius,
    y: base - radius,
    w: radius * 2,
    h: radius,
  })
  ctx.fill()
  for (let i = 1; i <= 4; i++) {
    ctx.beginPath()
    ctx.arc(cx, base, radius * (1 - i * 0.2), Math.PI, 0)
    ctx.lineWidth = 4
    ctx.strokeStyle = css(p.ground, 0.4)
    ctx.stroke()
  }
  ctx.fillStyle = css(lerp(c1, c3, 0.45))
  ctx.fillRect(x, base, w, y + h - base)
  ctx.fillStyle = css(p.ground)
  ctx.fillRect(x, base, w, rng.range(14, 28))

  glow(ctx, cx, base - radius * 0.7, 480, 0.3)
}

/** A grid of quarter circles, half discs and squares in palette colours. */
function bauhaus(ctx: Ctx, p: Palette, rng: Rng) {
  const { x, y, w, h } = ART
  const cols = rng.int(3, 5)
  const s = w / cols
  const rows = Math.ceil(h / s)
  ctx.fillStyle = css(rng.chance(0.5) ? p.ground : p.art[0])
  ctx.fillRect(x, y, w, h)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = x + c * s
      const cy = y + r * s
      const kind = rng.int(0, 5)
      if (kind === 5) continue
      ctx.fillStyle = css(rng.pick(p.art))
      ctx.save()
      ctx.beginPath()
      ctx.rect(cx, cy, s, s)
      ctx.clip()
      ctx.beginPath()
      if (kind === 0) {
        const k = rng.int(0, 3)
        ctx.arc(cx + (k & 1) * s, cy + (k >> 1) * s, s, 0, Math.PI * 2)
      } else if (kind === 1) {
        ctx.arc(cx + s / 2, cy + s / 2, s * 0.42, 0, Math.PI * 2)
      } else if (kind === 2) {
        ctx.arc(cx + s / 2, cy + (rng.chance(0.5) ? 0 : s), s / 2, 0, Math.PI * 2)
      } else if (kind === 3) {
        ctx.rect(cx, cy, s, s / 2)
      } else {
        ctx.moveTo(cx, cy + s)
        ctx.lineTo(cx + s, cy + s)
        ctx.lineTo(rng.chance(0.5) ? cx : cx + s, cy)
        ctx.closePath()
      }
      ctx.fill()
      ctx.restore()
    }
  }
  glow(ctx, x + w * 0.5, y + h * 0.2, 500, 0.15)
}

function blobPath(ctx: Ctx, cx: number, cy: number, r: number, rng: Rng) {
  const n = 7
  const pts: [number, number][] = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    const rr = r * rng.range(0.7, 1.2)
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr])
  }
  const mid = (a: [number, number], b: [number, number]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  const start = mid(pts[n - 1], pts[0])
  ctx.beginPath()
  ctx.moveTo(start[0], start[1])
  for (let i = 0; i < n; i++) {
    const m = mid(pts[i], pts[(i + 1) % n])
    ctx.quadraticCurveTo(pts[i][0], pts[i][1], m[0], m[1])
  }
  ctx.closePath()
}

/** Soft organic shapes that overlap like cut paper. */
function blobs(ctx: Ctx, p: Palette, rng: Rng) {
  const { x, y, w, h } = ART
  ctx.fillStyle = linear(ctx, rng.range(0, Math.PI * 2), p.art[0], p.art[1])
  ctx.fillRect(x, y, w, h)
  const n = rng.int(5, 8)
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1)
    blobPath(ctx, x + rng.range(0.1, 0.9) * w, y + rng.range(0.1, 0.9) * h, rng.range(160, 380), rng)
    ctx.fillStyle = css(lerp(p.art[1], p.art[3], t), 0.82)
    ctx.fill()
  }
  glow(ctx, x + w * rng.range(0.2, 0.8), y + h * 0.15, 520, 0.3)
}

/** Rounded diagonal bands of varying width. */
function stripes(ctx: Ctx, p: Palette, rng: Rng) {
  const { x, y, w, h } = ART
  ctx.fillStyle = css(p.ground)
  ctx.fillRect(x, y, w, h)
  ctx.save()
  ctx.translate(x + w / 2, y + h / 2)
  ctx.rotate(rng.range(-0.9, 0.9))
  let off = -1000
  let i = 0
  while (off < 1000) {
    const width = rng.range(36, 150)
    if (!rng.chance(0.18)) {
      ctx.fillStyle = css(lerp(p.art[0], p.art[3], (i % 7) / 6), 1)
      ctx.beginPath()
      ctx.roundRect(off, -1000, width, 2000, width / 2)
      ctx.fill()
    }
    off += width + rng.range(8, 30)
    i++
  }
  ctx.restore()
  glow(ctx, x + w * 0.3, y + h * 0.2, 500, 0.25)
}

/** A dot screen that swells toward a focus point. */
function halftone(ctx: Ctx, p: Palette, rng: Rng) {
  const { x, y, w, h } = ART
  ctx.fillStyle = linear(ctx, rng.range(0, Math.PI * 2), p.art[0], p.art[1])
  ctx.fillRect(x, y, w, h)
  const fx = x + w * rng.range(0.15, 0.85)
  const fy = y + h * rng.range(0.15, 0.85)
  const reach = rng.range(600, 900)
  const step = rng.range(30, 40)
  ctx.fillStyle = css(rng.chance(0.5) ? p.art[3] : p.ground)
  for (let py = y + step / 2; py < y + h; py += step) {
    for (let px = x + step / 2; px < x + w; px += step) {
      const t = Math.max(0, 1 - Math.hypot(px - fx, py - fy) / reach)
      if (t < 0.04) continue
      ctx.beginPath()
      ctx.arc(px, py, (step / 2) * t * 1.15, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

/** Overlapping petals around a centre disc. */
function bloom(ctx: Ctx, p: Palette, rng: Rng) {
  const { x, y, w, h } = ART
  ctx.fillStyle = linear(ctx, Math.PI / 2, p.art[0], lerp(p.art[0], p.art[1], 0.5))
  ctx.fillRect(x, y, w, h)
  const cx = x + w * rng.range(0.3, 0.7)
  const cy = y + h * rng.range(0.4, 0.65)
  const n = rng.int(8, 16)
  const len = rng.range(300, 420)
  const start = rng.range(0, Math.PI)
  for (let i = 0; i < n; i++) {
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(start + (i / n) * Math.PI * 2)
    ctx.beginPath()
    ctx.ellipse(len * 0.55, 0, len * 0.55, len * rng.range(0.13, 0.22), 0, 0, Math.PI * 2)
    ctx.fillStyle = css(lerp(p.art[1], p.art[3], i / n), 0.6)
    ctx.fill()
    ctx.restore()
  }
  ctx.beginPath()
  ctx.arc(cx, cy, len * 0.16, 0, Math.PI * 2)
  ctx.fillStyle = css(p.ground)
  ctx.fill()
  glow(ctx, cx, cy - 100, 520, 0.25)
}

/** Concentric thick arches, like a rainbow drawn in the palette. */
function arches(ctx: Ctx, p: Palette, rng: Rng) {
  const { x, y, w, h } = ART
  ctx.fillStyle = css(p.ground)
  ctx.fillRect(x, y, w, h)
  const cx = x + w * rng.range(0.3, 0.7)
  const base = y + h * rng.range(0.7, 0.95)
  const n = rng.int(6, 9)
  const band = rng.range(50, 74)
  ctx.lineCap = 'butt'
  for (let i = 0; i < n; i++) {
    const r = 80 + (n - i) * band
    ctx.beginPath()
    ctx.arc(cx, base, r, Math.PI, 0)
    ctx.lineWidth = band - 8
    ctx.strokeStyle = css(lerp(p.art[0], p.art[3], i / (n - 1)))
    ctx.stroke()
  }
  ctx.fillStyle = css(p.ground)
  ctx.fillRect(x, base, w, y + h - base)
  glow(ctx, cx, base - 300, 500, 0.2)
}

const PAINTERS: Record<ArtKind, (ctx: Ctx, p: Palette, rng: Rng) => void> = {
  horizon,
  orbit,
  ridges,
  dome,
  bauhaus,
  blobs,
  stripes,
  halftone,
  bloom,
  arches,
}

/** Paints one art variant, then a light film grain, clipped to the art block. */
export function drawArt(ctx: Ctx, kind: ArtKind, palette: Palette, rng: Rng) {
  ctx.save()
  ctx.beginPath()
  ctx.roundRect(ART.x, ART.y, ART.w, ART.h, ART.r)
  ctx.clip()
  PAINTERS[kind](ctx, palette, rng)
  for (let i = 0; i < 2600; i++) {
    ctx.fillStyle = rng.chance(0.5) ? 'rgb(255 255 255 / 0.05)' : 'rgb(0 0 0 / 0.05)'
    ctx.fillRect(
      ART.x + rng.range(0, ART.w),
      ART.y + rng.range(0, ART.h),
      rng.range(1, 3),
      rng.range(1, 3),
    )
  }
  ctx.restore()
}
