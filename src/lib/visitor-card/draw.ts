import { ART_KINDS, drawArt, type ArtKind } from './art'
import { ART, FOOT, H, MARGIN, NAME_BAND, PILL, RADIUS, STRIP, W } from './layout'
import { css, makePalette, recordHue, type Palette } from './palette'
import { createRng, freshSeed } from './random'
import { drawStamp, placeStamps, type StampSpec } from './stamps'
import { captionFor } from './words'

export type CardSpec = {
  seed: number
  name: string
  caption: string
  /** "VISITOR No. 1,024" or "CARD ID 7F3A". */
  label: string
  /** "21 SEP 2026 · 14:32 IST". */
  when: string
  palette: Palette
  art: ArtKind
  holo: boolean
  stamps: StampSpec[]
}

export const HOLO_SHARE = 0.25

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

/** The current time in India Standard Time, formatted for the card. */
export function istStamp(now = new Date()): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  )
  return `${parts.day} ${MONTHS[Number(parts.month) - 1]} ${parts.year} · ${parts.hour}:${parts.minute} IST`
}

export function makeSpec(
  input: { name: string; label: string },
  options: { record?: boolean } = {},
): CardSpec {
  const seed = freshSeed()
  const rng = createRng(seed)
  const palette = makePalette(rng)
  if (options.record !== false) recordHue(palette.hue)
  return {
    seed,
    name: input.name,
    caption: captionFor(rng.next),
    label: input.label,
    when: istStamp(),
    palette,
    art: rng.pick(ART_KINDS),
    holo: rng.chance(HOLO_SHARE),
    stamps: placeStamps(rng),
  }
}

type Ctx = CanvasRenderingContext2D

const DISPLAY = '"Bricolage Grotesque", "Hanken Grotesk", sans-serif'
const MONO = '"JetBrains Mono", ui-monospace, monospace'

function spaced(
  ctx: Ctx,
  text: string,
  x: number,
  y: number,
  tracking: number,
  align: 'left' | 'right' = 'left',
) {
  ctx.letterSpacing = `${tracking}px`
  ctx.textAlign = align
  ctx.fillText(text, x, y)
  ctx.letterSpacing = '0px'
}

/** Largest display size at which `text` fits `width`, between `max` and `min`. */
function fit(ctx: Ctx, text: string, width: number, max: number, min: number) {
  for (let size = max; size >= min; size -= 2) {
    ctx.font = `800 ${size}px ${DISPLAY}`
    if (ctx.measureText(text).width <= width) return size
  }
  return min
}

function drawName(ctx: Ctx, name: string, palette: Palette) {
  const width = W - MARGIN * 2
  ctx.fillStyle = css(palette.ink)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'

  const single = fit(ctx, name, width, 180, 96)
  ctx.font = `800 ${single}px ${DISPLAY}`
  const fits = ctx.measureText(name).width <= width
  const words = name.split(' ')
  if (fits || words.length < 2) {
    const size = fits ? single : fit(ctx, name, width, 96, 40)
    ctx.font = `800 ${size}px ${DISPLAY}`
    ctx.fillText(name, MARGIN, NAME_BAND.top + 40 + size * 0.86)
    return
  }

  // Two balanced lines, split at the space nearest the middle.
  let best = 1
  let bestDiff = Infinity
  for (let i = 1; i < words.length; i++) {
    const diff = Math.abs(
      words.slice(0, i).join(' ').length - words.slice(i).join(' ').length,
    )
    if (diff < bestDiff) [best, bestDiff] = [i, diff]
  }
  const lines = [words.slice(0, best).join(' '), words.slice(best).join(' ')]
  const size = Math.min(...lines.map((l) => fit(ctx, l, width, 132, 44)))
  ctx.font = `800 ${size}px ${DISPLAY}`
  lines.forEach((line, i) => {
    ctx.fillText(line, MARGIN, NAME_BAND.top + 8 + size * (0.86 + i * 0.94))
  })
}

function drawPill(ctx: Ctx, label: string, palette: Palette) {
  ctx.font = `700 30px ${MONO}`
  ctx.letterSpacing = '2px'
  const w = ctx.measureText(label).width + 64
  ctx.letterSpacing = '0px'
  ctx.beginPath()
  ctx.roundRect(PILL.x, PILL.y, w, PILL.h, PILL.h / 2)
  ctx.fillStyle = css(palette.ground)
  ctx.fill()
  ctx.fillStyle = css(palette.ink)
  ctx.textBaseline = 'middle'
  spaced(ctx, label, PILL.x + 32, PILL.y + PILL.h / 2 + 2, 2)
}

function drawStrip(ctx: Ctx, spec: CardSpec) {
  const { palette } = spec
  const { x, y, w, h } = STRIP
  const cellA = 300
  const cellB = 250
  ctx.lineWidth = 3
  ctx.strokeStyle = css(palette.ink)
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, 14)
  ctx.stroke()

  // Hatched middle cell.
  ctx.save()
  ctx.beginPath()
  ctx.rect(x + cellA, y + 1.5, cellB, h - 3)
  ctx.clip()
  ctx.strokeStyle = css(palette.ink, 0.35)
  ctx.lineWidth = 2
  for (let d = -h; d < cellB + h; d += 16) {
    ctx.beginPath()
    ctx.moveTo(x + cellA + d, y + h)
    ctx.lineTo(x + cellA + d + h, y)
    ctx.stroke()
  }
  ctx.restore()

  ctx.strokeStyle = css(palette.ink)
  ctx.lineWidth = 3
  for (const dx of [cellA, cellA + cellB]) {
    ctx.beginPath()
    ctx.moveTo(x + dx, y)
    ctx.lineTo(x + dx, y + h)
    ctx.stroke()
  }

  ctx.fillStyle = css(palette.ink)
  ctx.textBaseline = 'middle'
  ctx.font = `700 32px ${MONO}`
  ctx.beginPath()
  ctx.arc(x + 40, y + h / 2, 9, 0, Math.PI * 2)
  ctx.fill()
  spaced(ctx, 'EARTH', x + 68, y + h / 2 + 2, 3)
  ctx.font = `600 29px ${MONO}`
  spaced(ctx, spec.when, x + cellA + cellB + 32, y + h / 2 + 2, 1)
}

function drawFoot(ctx: Ctx, palette: Palette) {
  const base = FOOT.top + FOOT.tile
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = css(palette.inkSoft)
  ctx.font = `600 24px ${MONO}`
  spaced(ctx, 'DOWNLOADED FROM', MARGIN, base - 50, 3)
  ctx.fillStyle = css(palette.ink)
  ctx.font = `700 40px ${MONO}`
  spaced(ctx, 'rohandev.online', MARGIN, base - 2, 0)

  const x = W - MARGIN - FOOT.tile
  ctx.beginPath()
  ctx.roundRect(x, FOOT.top, FOOT.tile, FOOT.tile, 22)
  ctx.fillStyle = css(palette.ink)
  ctx.fill()
  ctx.fillStyle = css(palette.ground)
  ctx.font = `800 70px ${DISPLAY}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText('R', x + FOOT.tile / 2, FOOT.top + 72)
}

/** Rainbow foil, micro-lines and glints, baked in so the downloaded PNG keeps the effect. */
function drawFoil(ctx: Ctx, spec: CardSpec) {
  const rng = createRng(spec.seed ^ 0x9e3779b9)
  const angle = rng.range(0.4, 1.2)
  const foil = ctx.createLinearGradient(
    W / 2 - Math.cos(angle) * W,
    H * 0.3 - Math.sin(angle) * W,
    W / 2 + Math.cos(angle) * W,
    H * 0.3 + Math.sin(angle) * W,
  )
  const start = rng.range(0, 360)
  for (let i = 0; i <= 8; i++) {
    foil.addColorStop(i / 8, `hsl(${(start + i * 55) % 360} 100% 62%)`)
  }

  // Foil covers the art block and the outer frame; the text zone stays plain.
  const regions = (paint: () => void) => {
    ctx.save()
    ctx.beginPath()
    ctx.roundRect(ART.x, ART.y, ART.w, ART.h, ART.r)
    ctx.clip()
    paint()
    ctx.restore()
    ctx.save()
    ctx.beginPath()
    ctx.roundRect(0, 0, W, H, RADIUS)
    ctx.roundRect(MARGIN, MARGIN, W - MARGIN * 2, H - MARGIN * 2, 20)
    ctx.clip('evenodd')
    paint()
    ctx.restore()
  }

  ctx.fillStyle = foil
  ctx.globalCompositeOperation = 'soft-light'
  ctx.globalAlpha = 0.85
  regions(() => ctx.fillRect(0, 0, W, H))
  ctx.globalCompositeOperation = 'overlay'
  ctx.globalAlpha = 0.28
  regions(() => ctx.fillRect(0, 0, W, H))

  ctx.globalAlpha = 0.16
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 1.5
  regions(() => {
    for (let d = -H; d < W + H; d += 9) {
      ctx.beginPath()
      ctx.moveTo(d, 0)
      ctx.lineTo(d + H * 0.6, H)
      ctx.stroke()
    }
  })

  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = '#fff'
  for (let i = 0; i < 26; i++) {
    const x = rng.range(ART.x + 30, ART.x + ART.w - 30)
    const y = rng.range(ART.y + 30, ART.y + ART.h - 30)
    const r = rng.range(6, 20)
    ctx.globalAlpha = rng.range(0.4, 0.95)
    ctx.beginPath()
    ctx.moveTo(x, y - r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.quadraticCurveTo(x, y, x, y + r)
    ctx.quadraticCurveTo(x, y, x - r, y)
    ctx.quadraticCurveTo(x, y, x, y - r)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

export async function loadFonts() {
  await Promise.all([
    document.fonts.load('800 100px "Bricolage Grotesque"'),
    document.fonts.load('600 30px "JetBrains Mono"'),
    document.fonts.load('700 30px "JetBrains Mono"'),
  ])
}

/** Draws the whole card. The same spec always produces the same card. */
export function drawCard(canvas: HTMLCanvasElement, spec: CardSpec) {
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, W, H)
  const { palette } = spec
  const rng = createRng(spec.seed ^ 0x5bd1e995)

  ctx.save()
  ctx.beginPath()
  ctx.roundRect(0, 0, W, H, RADIUS)
  ctx.clip()

  ctx.fillStyle = css(palette.ground)
  ctx.fillRect(0, 0, W, H)

  drawArt(ctx, spec.art, palette, rng)
  spec.stamps.forEach((stamp) => drawStamp(ctx, stamp, palette, createRng(stamp.seed)))
  ctx.globalCompositeOperation = 'source-over'

  drawPill(ctx, spec.label, palette)
  drawName(ctx, spec.name, palette)

  ctx.fillStyle = css(palette.inkSoft)
  ctx.textBaseline = 'alphabetic'
  ctx.font = `600 30px ${MONO}`
  spaced(ctx, spec.caption, MARGIN, NAME_BAND.bottom, 5)

  drawStrip(ctx, spec)
  drawFoot(ctx, palette)
  if (spec.holo) drawFoil(ctx, spec)
  ctx.restore()
}
