import { css, type Hsl, type Palette } from './palette'
import { type Rng } from './random'
import { H, MARGIN, PILL, W } from './layout'

export type Emblem = 'globe' | 'star' | 'check' | 'tower' | 'ist'

export type StampSpec = {
  x: number
  y: number
  r: number
  rotation: number
  emblem: Emblem
  ring: string
  tone: 0 | 1
  seed: number
}

const RINGS = [
  'ROHANDEV VISITOR',
  'CLAIMED ON EARTH',
  'GOOD NAME VERIFIED',
  'PORTFOLIO VISITOR',
  'GENUINELY HERE',
  'ISSUED IN INDIA',
  'WELCOME ABOARD',
  'SEEN AND STAMPED',
]

const EMBLEMS: Emblem[] = ['globe', 'star', 'check', 'tower', 'ist']

/** Stamps land on the art or in the margin above the name; the name band stays clear. */
export function placeStamps(rng: Rng): StampSpec[] {
  const count = rng.int(2, 3)
  const stamps: StampSpec[] = []
  const rings = [...RINGS].sort(() => rng.next() - 0.5)
  for (let i = 0; i < count; i++) {
    for (let attempt = 0; attempt < 40; attempt++) {
      const r = rng.range(84, 150)
      const x = rng.range(MARGIN + r * 0.6, W - MARGIN - r * 0.6)
      const y = rng.range(MARGIN + r * 0.6, 1090 - r)
      const nearPill =
        x - r < PILL.x + 430 && x + r > PILL.x - 10 && y - r < PILL.y + PILL.h + 10
      const crowded = stamps.some((s) => Math.hypot(s.x - x, s.y - y) < (s.r + r) * 0.55)
      if (nearPill || crowded || y + r > H) continue
      stamps.push({
        x,
        y,
        r,
        rotation: rng.range(-25, 25),
        emblem: rng.pick(EMBLEMS),
        ring: rings[i],
        tone: rng.chance(0.5) ? 0 : 1,
        seed: rng.int(1, 2 ** 31),
      })
      break
    }
  }
  return stamps
}

function ringText(
  ctx: CanvasRenderingContext2D,
  text: string,
  radius: number,
  size: number,
) {
  ctx.font = `600 ${size}px "JetBrains Mono", monospace`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const spacing = 0.16 * size
  const glyphs = [...text]
  const widths = glyphs.map((g) => ctx.measureText(g).width + spacing)
  const total = widths.reduce((a, b) => a + b, 0)
  let angle = -total / (2 * radius)
  glyphs.forEach((g, i) => {
    const step = widths[i] / radius
    ctx.save()
    ctx.rotate(angle + step / 2)
    ctx.translate(0, -radius)
    ctx.fillText(g, 0, 0)
    ctx.restore()
    angle += step
  })
}

function emblem(ctx: CanvasRenderingContext2D, kind: Emblem, r: number) {
  ctx.lineWidth = Math.max(3, r * 0.05)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  switch (kind) {
    case 'globe':
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.moveTo(-r, 0)
      ctx.lineTo(r, 0)
      ctx.moveTo(0, -r)
      ctx.lineTo(0, r)
      ctx.stroke()
      ctx.beginPath()
      ctx.ellipse(0, 0, r * 0.45, r, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.ellipse(0, 0, r, r * 0.42, 0, 0, Math.PI * 2)
      ctx.stroke()
      break
    case 'star': {
      ctx.beginPath()
      for (let i = 0; i < 10; i++) {
        const rad = i % 2 ? r * 0.42 : r
        const a = (Math.PI / 5) * i - Math.PI / 2
        ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad)
      }
      ctx.closePath()
      ctx.fill()
      break
    }
    case 'check':
      ctx.lineWidth = r * 0.24
      ctx.beginPath()
      ctx.moveTo(-r * 0.7, 0)
      ctx.lineTo(-r * 0.2, r * 0.5)
      ctx.lineTo(r * 0.75, -r * 0.55)
      ctx.stroke()
      break
    case 'tower':
      ctx.beginPath()
      ctx.moveTo(-r * 0.7, r)
      ctx.lineTo(-r * 0.22, -r * 0.3)
      ctx.lineTo(0, -r)
      ctx.lineTo(r * 0.22, -r * 0.3)
      ctx.lineTo(r * 0.7, r)
      ctx.moveTo(-r * 0.4, r * 0.35)
      ctx.lineTo(r * 0.4, r * 0.35)
      ctx.moveTo(-r * 0.25, -r * 0.3)
      ctx.lineTo(r * 0.25, -r * 0.3)
      ctx.stroke()
      break
    case 'ist':
      ctx.font = `800 ${r * 1.15}px "Bricolage Grotesque", sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('IST', 0, r * 0.06)
      break
  }
}

/**
 * Each stamp is rendered on its own layer so the worn-ink speckle can be erased from it
 * without punching holes in the card, then multiplied onto the card.
 */
export function drawStamp(
  ctx: CanvasRenderingContext2D,
  spec: StampSpec,
  palette: Palette,
  rng: Rng,
) {
  const size = Math.ceil(spec.r * 2 + 12)
  const layer = document.createElement('canvas')
  layer.width = layer.height = size
  const c = layer.getContext('2d')!
  const ink: Hsl = palette.stamp[spec.tone]
  const solid = css(ink)

  c.translate(size / 2, size / 2)
  c.strokeStyle = solid
  c.fillStyle = solid

  c.globalAlpha = 0.14
  c.beginPath()
  c.arc(0, 0, spec.r, 0, Math.PI * 2)
  c.fill()
  c.globalAlpha = 0.92

  c.lineWidth = spec.r * 0.045
  c.beginPath()
  c.arc(0, 0, spec.r - 4, 0, Math.PI * 2)
  c.stroke()
  c.lineWidth = spec.r * 0.02
  c.beginPath()
  c.arc(0, 0, spec.r * 0.66, 0, Math.PI * 2)
  c.stroke()

  ringText(c, spec.ring, spec.r * 0.81, spec.r * 0.135)
  emblem(c, spec.emblem, spec.r * 0.3)

  c.globalCompositeOperation = 'destination-out'
  for (let i = 0; i < spec.r * 5; i++) {
    c.globalAlpha = rng.range(0.25, 0.85)
    c.beginPath()
    c.arc(
      rng.range(-spec.r, spec.r),
      rng.range(-spec.r, spec.r),
      rng.range(0.8, spec.r * 0.028),
      0,
      Math.PI * 2,
    )
    c.fill()
  }

  ctx.save()
  ctx.translate(spec.x, spec.y)
  ctx.rotate((spec.rotation * Math.PI) / 180)
  ctx.globalCompositeOperation = palette.deep ? 'screen' : 'multiply'
  ctx.drawImage(layer, -size / 2, -size / 2)
  ctx.restore()
}
