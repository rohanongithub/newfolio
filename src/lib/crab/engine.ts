/**
 * The crab's brain and body. One rAF loop drives a small state machine (idle, wander, hop, rope,
 * nap) and the touch reactions. Positions are document coordinates, so the crab scrolls with the
 * page. Browser only, no dependencies.
 */
import { scanPerches, samePerches, type Perch } from './perches'
import { COLS, FRAMES, ROWS, T, type FrameName } from './sprite'

type Action = {
  /** Returns true when finished. */
  update: (now: number, dt: number) => boolean
  /** Grounded actions can be cut short by a poke; hops and ropes cannot. */
  interruptible: boolean
}

export type Elements = {
  crab: HTMLElement
  body: HTMLElement
  rope: HTMLElement
  knot: HTMLElement
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const rand = (a: number, b: number) => a + Math.random() * (b - a)
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2

export class CrabEngine {
  private px = 4
  private W = COLS * 4
  private H = ROWS * 4

  private x = 0
  private y = 0
  private face: 1 | -1 = 1
  private sx = 1
  private sy = 1
  private frame: FrameName = 'idle'
  private overlay: { frame: FrameName; until: number } | null = null
  private squash: { t0: number; dur: number } | null = null

  private perches: Perch[] = []
  private perch: Perch | null = null
  private recent: Element[] = []
  private visits = new Map<Element, number>()
  private action: Action | null = null

  private ropeAx = 0
  private ropeAy = 0
  private ropeLen = 0
  private ropeAnim: { t0: number; dur: number; from: number } | null = null

  private pointer = { x: -1, y: -1 }
  private pokes: number[] = []

  private raf = 0
  private last = 0
  private running = false
  private started = false
  private resizeTimer = 0
  private observer: ResizeObserver | null = null

  private applied = { frame: '' as string, crab: '', body: '', rope: '', knot: '' }

  constructor(private els: Elements) {}

  // ---------------------------------------------------------------- lifecycle

  start() {
    if (this.running) return
    this.running = true
    this.measure()
    this.perches = scanPerches(this.W)
    if (this.perches.length === 0) {
      this.running = false
      return
    }

    window.addEventListener('pointermove', this.onPointerMove, { passive: true })
    window.addEventListener('resize', this.scheduleRebuild)
    document.addEventListener('visibilitychange', this.onVisibility)
    this.els.crab.addEventListener('pointerdown', this.onPoke)
    this.els.crab.addEventListener('pointerenter', this.onEnter)
    this.observer = new ResizeObserver(this.scheduleRebuild)
    this.observer.observe(document.body)
    void document.fonts?.ready.then(this.scheduleRebuild)

    // Arrive on a rope from above, onto the name (or whatever is nearest the top of the screen).
    const start = this.startPerch()
    this.perch = start
    this.visits.set(start.el, 1)
    this.x = clamp((start.x0 + start.x1) / 2, start.x0, start.x1)
    this.y = start.y - this.H
    this.action = this.dropIn(start)
    this.els.crab.style.visibility = 'hidden'

    this.last = performance.now()
    this.raf = requestAnimationFrame(this.tick)
  }

  stop() {
    this.running = false
    this.started = false
    cancelAnimationFrame(this.raf)
    window.clearTimeout(this.resizeTimer)
    window.removeEventListener('pointermove', this.onPointerMove)
    window.removeEventListener('resize', this.scheduleRebuild)
    document.removeEventListener('visibilitychange', this.onVisibility)
    this.els.crab.removeEventListener('pointerdown', this.onPoke)
    this.els.crab.removeEventListener('pointerenter', this.onEnter)
    this.observer?.disconnect()
    this.observer = null
    this.action = null
    this.perch = null
    this.ropeLen = 0
    this.ropeAnim = null
    this.overlay = null
    this.squash = null
    this.applied = { frame: '', crab: '', body: '', rope: '', knot: '' }
  }

  // ---------------------------------------------------------------- measuring

  private measure() {
    this.px = window.innerWidth < 640 ? 3 : 4
    this.W = COLS * this.px
    this.H = ROWS * this.px
    const { crab } = this.els
    crab.style.width = `${this.W}px`
    crab.style.height = `${this.H}px`
    const svg = `<svg viewBox="0 0 ${COLS} ${ROWS}" width="${this.W}" height="${this.H}" shape-rendering="crispEdges" aria-hidden="true" focusable="false"><g data-crab-frame></g></svg>`
    if (!this.els.body.firstElementChild) this.els.body.innerHTML = svg
    else {
      const el = this.els.body.firstElementChild
      el.setAttribute('width', String(this.W))
      el.setAttribute('height', String(this.H))
    }
    this.applied.frame = ''
  }

  private startPerch(): Perch {
    const top = window.scrollY
    if (top < 120) {
      const name = this.perches.find((p) => p.el.id === 'candidate-name')
      if (name) return name
    }
    const target = top + window.innerHeight * 0.35
    return [...this.perches].sort((a, b) => Math.abs(a.y - target) - Math.abs(b.y - target))[0]
  }

  private scheduleRebuild = () => {
    window.clearTimeout(this.resizeTimer)
    this.resizeTimer = window.setTimeout(() => this.rebuild(), 160)
  }

  private rebuild() {
    if (!this.running) return
    const oldPx = this.px
    this.measure()
    const next = scanPerches(this.W)
    if (oldPx === this.px && samePerches(this.perches, next)) return

    this.perches = next
    if (!this.started) return // still on the way in: land on the fresh numbers
    const current = this.perch && next.find((p) => p.el === this.perch!.el)
    if (current) {
      this.perch = current
      if (this.action?.interruptible) {
        this.x = clamp(this.x, current.x0, current.x1)
        this.y = current.y - this.H
      }
      return
    }
    // The ledge is gone: settle on the nearest one.
    if (next.length === 0) {
      this.stop()
      this.els.crab.style.visibility = 'hidden'
      return
    }
    const feet = this.y + this.H
    const near = [...next].sort((a, b) => Math.abs(a.y - feet) - Math.abs(b.y - feet))[0]
    this.perch = near
    this.x = clamp(this.x, near.x0, near.x1)
    this.y = near.y - this.H
    this.ropeLen = 0
    this.ropeAnim = null
    this.action = this.idle(rand(600, 1400))
  }

  // ---------------------------------------------------------------- events

  private onPointerMove = (e: PointerEvent) => {
    this.pointer.x = e.pageX
    this.pointer.y = e.pageY
  }

  private onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(this.raf)
    } else if (this.running) {
      this.last = performance.now()
      this.raf = requestAnimationFrame(this.tick)
    }
  }

  private onEnter = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || !this.action?.interruptible) return
    this.pointer.x = e.pageX
    this.face = e.pageX < this.x + this.W / 2 ? -1 : 1
  }

  private onPoke = (e: PointerEvent) => {
    e.preventDefault()
    this.pointer.x = e.pageX
    this.pointer.y = e.pageY
    const now = performance.now()
    this.pokes = this.pokes.filter((t) => now - t < 3500)
    this.pokes.push(now)

    if (!this.action || !this.action.interruptible) {
      // Mid-air or on a rope: it can only gasp.
      this.overlay = { frame: 'shock', until: now + 650 }
      return
    }
    const annoyed = this.pokes.length >= 3
    const roll = Math.random()
    if (annoyed || roll < 0.5) this.action = this.startle(annoyed)
    else if (roll < 0.75) this.action = this.wave()
    else this.action = this.spin()
  }

  // ---------------------------------------------------------------- the loop

  private tick = (now: number) => {
    this.raf = requestAnimationFrame(this.tick)
    const dt = Math.min(50, now - this.last)
    this.last = now

    this.sx = 1
    this.sy = 1
    if (!this.action) this.action = this.next(now)
    if (this.action.update(now, dt)) this.action = this.next(now)

    if (this.squash) {
      const p = (now - this.squash.t0) / this.squash.dur
      if (p >= 1) this.squash = null
      else {
        const k = 1 - easeOutExpo(p)
        this.sx *= 1 + 0.16 * k
        this.sy *= 1 - 0.2 * k
      }
    }
    if (this.ropeAnim) {
      const p = (now - this.ropeAnim.t0) / this.ropeAnim.dur
      if (p >= 1) {
        this.ropeLen = 0
        this.ropeAnim = null
      } else this.ropeLen = this.ropeAnim.from * (1 - easeOutExpo(p))
    }
    this.render(now)
  }

  private render(now: number) {
    const { crab, body, rope, knot } = this.els
    const name = this.overlay && now < this.overlay.until ? this.overlay.frame : this.frame
    if (name !== this.applied.frame) {
      const g = body.querySelector('[data-crab-frame]')
      if (g) g.innerHTML = FRAMES[name]
      this.applied.frame = name
    }

    const tr = `translate3d(${Math.round(this.x)}px,${Math.round(this.y)}px,0)`
    if (tr !== this.applied.crab) {
      crab.style.transform = tr
      this.applied.crab = tr
    }
    if (crab.style.visibility === 'hidden' && this.started) crab.style.visibility = 'visible'

    const bt = `scale(${this.face * this.sx},${this.sy})`
    if (bt !== this.applied.body) {
      body.style.transform = bt
      this.applied.body = bt
    }

    const showRope = this.ropeLen > 0.5
    const rt = showRope
      ? `translate3d(${Math.round(this.ropeAx) - 1}px,${Math.round(this.ropeAy)}px,0) scale(1,${this.ropeLen.toFixed(1)})`
      : ''
    if (rt !== this.applied.rope) {
      rope.style.visibility = showRope ? 'visible' : 'hidden'
      if (showRope) rope.style.transform = rt
      this.applied.rope = rt
    }
    const kt = showRope
      ? `translate3d(${Math.round(this.ropeAx) - 4}px,${Math.round(this.ropeAy) - 3}px,0)`
      : ''
    if (kt !== this.applied.knot) {
      knot.style.visibility = showRope ? 'visible' : 'hidden'
      if (showRope) knot.style.transform = kt
      this.applied.knot = kt
    }
  }

  // ---------------------------------------------------------------- planning

  private next(now: number): Action {
    void now
    const perch = this.perch
    if (!perch) return this.idle(1000)
    const roll = Math.random() * 10

    if (roll < 2.8) return this.seq(() => this.wander(perch), () => this.idle(rand(900, 2600)))
    if (roll < 9.4) {
      const trip = this.travel(perch)
      if (trip) return this.seq(() => trip, () => this.idle(rand(1600, 4200)))
      return this.seq(() => this.wander(perch), () => this.idle(rand(900, 2200)))
    }
    return this.seq(() => this.nap(rand(4500, 7500)), () => this.idle(rand(800, 1600)))
  }

  private seq(...makers: (() => Action)[]): Action {
    let i = -1
    let cur: Action | null = null
    const self: Action = {
      interruptible: true,
      update: (now, dt) => {
        for (;;) {
          if (!cur) {
            i++
            if (i >= makers.length) return true
            cur = makers[i]()
          }
          self.interruptible = cur.interruptible
          if (cur.update(now, dt)) {
            cur = null
            continue
          }
          return false
        }
      },
    }
    return self
  }

  /** Picks a hop or a rope trip to another ledge, favouring ones near what the visitor can see. */
  private travel(from: Perch): Action | null {
    type Option = { weight: number; make: () => Action }
    const options: Option[] = []
    const viewMid = window.scrollY + window.innerHeight / 2

    for (const to of this.perches) {
      if (to.el === from.el) continue
      const up = from.y - to.y // positive: the target is higher
      const landX = clamp(this.x + rand(-90, 90), to.x0, to.x1)
      const gap = Math.abs(landX - this.x)
      // Roam: ledges it has seen less often are far more tempting, so it spreads across the page
      // instead of shuttling around the name. Being near the visitor's view only nudges the odds.
      let weight = 1 / (1 + Math.abs(to.y - viewMid) / 1400)
      weight *= 1 / (1 + (this.visits.get(to.el) ?? 0) * 1.6)
      if (this.recent.includes(to.el)) weight *= 0.2

      if (gap <= 300 && up <= 150 && up >= -320) {
        options.push({ weight: weight * 1.2, make: () => this.hop(to, landX) })
        continue
      }
      const lo = Math.max(from.x0, to.x0)
      const hi = Math.min(from.x1, to.x1)
      if (hi >= lo && Math.abs(up) > 90 && from.ropeable && to.ropeable) {
        const u = Math.random()
        const edge = u < 0.5 ? u * 0.3 : 1 - (1 - u) * 0.3
        const ropeX = lerp(lo, hi, edge)
        options.push({
          weight: weight * 0.8,
          make: () =>
            this.seq(
              () => this.walkTo(ropeX, 120),
              () => this.rope(up > 0 ? 'up' : 'down', from, to, ropeX),
            ),
        })
      }
    }
    if (options.length === 0) return null
    let pick = Math.random() * options.reduce((s, o) => s + o.weight, 0)
    for (const o of options) {
      pick -= o.weight
      if (pick <= 0) return o.make()
    }
    return options[options.length - 1].make()
  }

  private land(to: Perch, now: number) {
    const live = this.perches.find((p) => p.el === to.el) ?? to
    this.perch = live
    this.x = clamp(this.x, live.x0, live.x1)
    this.y = live.y - this.H
    this.squash = { t0: now, dur: 220 }
    this.recent = [live.el, ...this.recent].slice(0, 5)
    this.visits.set(live.el, (this.visits.get(live.el) ?? 0) + 1)
  }

  // ---------------------------------------------------------------- actions

  private idle(ms: number): Action {
    let t0 = -1
    let nextBlink = 0
    let blinkUntil = 0
    return {
      interruptible: true,
      update: (now) => {
        if (t0 < 0) {
          t0 = now
          nextBlink = now + rand(900, 2600)
        }
        if (now >= nextBlink) {
          blinkUntil = now + 130
          nextBlink = now + rand(2200, 4200)
        }
        this.frame = now < blinkUntil ? 'blink' : 'idle'
        return now - t0 >= ms
      },
    }
  }

  private nap(ms: number): Action {
    let t0 = -1
    return {
      interruptible: true,
      update: (now) => {
        if (t0 < 0) t0 = now
        this.frame = 'sleep'
        return now - t0 >= ms
      },
    }
  }

  private wander(perch: Perch): Action {
    let dx = rand(-240, 240)
    if (Math.abs(dx) < 70) dx = dx < 0 ? -90 : 90
    let target = clamp(this.x + dx, perch.x0, perch.x1)
    if (Math.abs(target - this.x) < 40) target = clamp(this.x - dx, perch.x0, perch.x1)
    return this.walkTo(target, rand(80, 130))
  }

  private walkTo(targetX: number, speed: number, run = false): Action {
    return {
      interruptible: true,
      update: (now, dt) => {
        const dx = targetX - this.x
        const step = (speed * dt) / 1000
        if (Math.abs(dx) <= step) {
          this.x = targetX
          return true
        }
        this.x += Math.sign(dx) * step
        this.face = dx < 0 ? -1 : 1
        const flip = Math.floor(now / (run ? 90 : 120)) % 2 === 0
        this.frame = run ? (flip ? 'runA' : 'runB') : flip ? 'walkA' : 'walkB'
        return false
      },
    }
  }

  private hop(to: Perch, landX: number): Action {
    let t0 = -1
    let x0 = 0
    let y0 = 0
    let y1 = 0
    let dur = 0
    let lift = 0
    return {
      interruptible: false,
      update: (now) => {
        if (t0 < 0) {
          t0 = now
          x0 = this.x
          y0 = this.y
          y1 = to.y - this.H
          const dist = Math.hypot(landX - x0, y1 - y0)
          dur = clamp(380 + dist * 1.1, 440, 1100)
          lift = 34 + Math.max(0, y0 - y1) * 0.9
          if (Math.abs(landX - x0) > 4) this.face = landX < x0 ? -1 : 1
        }
        const e = now - t0
        if (e < 120) {
          this.frame = 'idle'
          this.sx = 1.12
          this.sy = 0.8
          return false
        }
        const p = Math.min(1, (e - 120) / dur)
        this.x = lerp(x0, landX, p)
        this.y = lerp(y0, y1, p) - 4 * lift * p * (1 - p)
        this.frame = 'jump'
        this.sx = 0.94
        this.sy = 1.08
        if (p >= 1) {
          this.land(to, now)
          return true
        }
        return false
      },
    }
  }

  /** 'down' pays rope out as it descends, 'up' lowers a rope from the ledge above and climbs it. */
  private rope(dir: 'down' | 'up', from: Perch, to: Perch, ropeX: number): Action {
    const anchorY = dir === 'down' ? from.y : to.y
    const y0 = from.y - this.H
    const y1 = to.y - this.H
    return this.ropeTravel(dir, ropeX, anchorY, y0, y1, to)
  }

  private dropIn(to: Perch): Action {
    const anchorY = Math.min(to.y - 140, window.scrollY + 20)
    const attachOffset = (T + 2) * this.px
    const y0 = anchorY - attachOffset
    return this.ropeTravel('in', this.x, anchorY, y0, to.y - this.H, to, 1100)
  }

  private ropeTravel(
    dir: 'down' | 'up' | 'in',
    ropeX: number,
    anchorY: number,
    y0: number,
    y1: number,
    to: Perch,
    delay = 0,
  ): Action {
    const attach = (cy: number) => cy + (T + 2) * this.px
    const travelDur = clamp(Math.abs(y1 - y0) / 0.17, 1000, 3600)
    const fullLen = Math.max(0, attach(Math.max(y0, y1)) - anchorY)
    let t0 = -1
    let phase = dir === 'in' ? 3 : 0
    let tp = 0
    return {
      interruptible: false,
      update: (now) => {
        if (t0 < 0) {
          t0 = now
          tp = now
          this.ropeAnim = null
          this.ropeAx = ropeX + this.W / 2
          this.ropeAy = anchorY
          this.x = ropeX
          if (dir === 'in') {
            this.y = y0
            this.frame = 'hang'
          }
        }
        switch (phase) {
          case 3: // waiting to arrive
            if (now - tp >= delay) {
              phase = 2
              tp = now
              this.started = true
            }
            return false
          case 0: // crouch and tie off
            this.frame = 'idle'
            this.sx = 1.1
            this.sy = 0.82
            if (now - tp >= 240) {
              phase = 1
              tp = now
            }
            return false
          case 1: // an upward trip lowers its rope first
            if (dir === 'up') {
              const p = Math.min(1, (now - tp) / 520)
              this.ropeLen = fullLen * easeOutExpo(p)
              this.frame = 'idle'
              if (p < 1) return false
            }
            phase = 2
            tp = now
            return false
          default: {
            const p = Math.min(1, (now - tp) / travelDur)
            this.y = lerp(y0, y1, easeInOutSine(p))
            this.frame = Math.floor((now - tp) / 170) % 2 === 0 ? 'hang' : 'hangB'
            if (dir !== 'up') this.ropeLen = Math.max(0, attach(this.y) - anchorY)
            if (p >= 1) {
              this.land(to, now)
              this.ropeAnim = { t0: now, dur: 520, from: this.ropeLen }
              return true
            }
            return false
          }
        }
      },
    }
  }

  // ---------------------------------------------------------------- reactions

  private startle(annoyed: boolean): Action {
    const perch = this.perch!
    const away = this.pointer.x < this.x + this.W / 2 ? 1 : -1
    const reach = annoyed ? rand(220, 320) : rand(100, 180)
    let dir = away
    let target = clamp(this.x + dir * reach, perch.x0, perch.x1)
    if (Math.abs(target - this.x) < 40) {
      dir = -dir
      target = clamp(this.x + dir * reach, perch.x0, perch.x1)
    }
    const jumpAction = (): Action => {
      let t0 = -1
      let y0 = 0
      return {
        interruptible: false,
        update: (now) => {
          if (t0 < 0) {
            t0 = now
            y0 = this.y
          }
          const p = Math.min(1, (now - t0) / 320)
          this.y = y0 - 4 * 38 * p * (1 - p)
          this.frame = 'shock'
          this.sx = 0.94
          this.sy = 1.1
          if (p >= 1) {
            this.y = y0
            this.squash = { t0: now, dur: 200 }
            return true
          }
          return false
        },
      }
    }
    return this.seq(
      jumpAction,
      () => this.walkTo(target, 340, true),
      () => this.pant(rand(500, 800)),
      () => this.idle(rand(700, 1500)),
    )
  }

  private pant(ms: number): Action {
    let t0 = -1
    return {
      interruptible: true,
      update: (now) => {
        if (t0 < 0) t0 = now
        this.frame = Math.floor(now / 220) % 2 === 0 ? 'shock' : 'runB'
        return now - t0 >= ms
      },
    }
  }

  private wave(): Action {
    let t0 = -1
    let y0 = 0
    return this.seq(
      () => ({
        interruptible: true,
        update: (now) => {
          if (t0 < 0) {
            t0 = now
            y0 = this.y
          }
          const p = Math.min(1, (now - t0) / 1200)
          this.frame = 'happy'
          this.y = y0 - Math.abs(Math.sin(p * Math.PI * 3)) * 7
          if (p >= 1) {
            this.y = y0
            return true
          }
          return false
        },
      }),
      () => this.idle(rand(800, 1600)),
    )
  }

  private spin(): Action {
    let t0 = -1
    let y0 = 0
    return this.seq(
      () => ({
        interruptible: false,
        update: (now) => {
          if (t0 < 0) {
            t0 = now
            y0 = this.y
          }
          const p = Math.min(1, (now - t0) / 620)
          this.y = y0 - 4 * 46 * p * (1 - p)
          this.face = Math.floor(p * 6) % 2 === 0 ? 1 : -1
          this.frame = 'happy'
          if (p >= 1) {
            this.y = y0
            this.squash = { t0: now, dur: 220 }
            return true
          }
          return false
        },
      }),
      () => this.idle(rand(800, 1600)),
    )
  }
}
