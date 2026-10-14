import type { gsap as GSAP } from 'gsap'

type GSAPTweenVars = gsap.TweenVars

type Gsap = typeof GSAP

type Options = {
  gsap: Gsap
  buttons: HTMLElement[]
  /** Called with the piece the viewer ended on, so the wall can scroll to it. */
  onClose: (index: number, changed: boolean) => void
}

const MAX_ZOOM = 4

/** Full-screen viewer: the thumbnail grows into place, then zoom, pan, swipe and keys. */
export function createLightbox({ gsap, buttons, onClose }: Options) {
  const root = document.querySelector<HTMLElement>('[data-lightbox]')!
  const scrim = root.querySelector<HTMLElement>('[data-lb-scrim]')!
  const stage = root.querySelector<HTMLElement>('[data-lb-stage]')!
  const img = root.querySelector<HTMLImageElement>('[data-lb-img]')!
  const title = root.querySelector<HTMLElement>('[data-lb-title]')!
  const meta = root.querySelector<HTMLElement>('[data-lb-meta]')!
  const prev = root.querySelector<HTMLElement>('[data-lb-prev]')!
  const next = root.querySelector<HTMLElement>('[data-lb-next]')!
  const close = root.querySelector<HTMLElement>('[data-lb-close]')!

  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const dur = (s: number) => (reduce() ? 0 : s)

  let isOpen = false
  let busy = false
  let going = false
  let index = 0
  let startIndex = 0
  let opener: HTMLElement | null = null
  let s = 1
  let x = 0
  let y = 0
  let usedFull = false

  const pointers = new Map<number, { x: number; y: number }>()
  let pinch = 0
  let down: { x: number; y: number; t: number; moved: boolean } | null = null
  let lastTap = 0

  // A GSAP tween is thenable, so awaiting one directly can hang; wrap it instead.
  const tween = (vars: GSAPTweenVars) =>
    new Promise<void>((resolve) => {
      gsap.to(img, { ...vars, onComplete: () => resolve() })
    })

  const apply = () => gsap.set(img, { scale: s, x, y })

  const clampPan = () => {
    const mx = (img.offsetWidth * (s - 1)) / 2
    const my = (img.offsetHeight * (s - 1)) / 2
    x = Math.max(-mx, Math.min(mx, x))
    y = Math.max(-my, Math.min(my, y))
  }

  const setZoom = (next: number, px = 0, py = 0, animate = false) => {
    const ns = Math.max(1, Math.min(MAX_ZOOM, next))
    const k = ns / s
    x = px - (px - x) * k
    y = py - (py - y) * k
    s = ns
    if (s === 1) {
      x = 0
      y = 0
    }
    clampPan()
    if (s > 1.2 && !usedFull) {
      usedFull = true
      const full = buttons[index].dataset.full
      if (full) img.src = full
    }
    img.style.cursor = s > 1 ? 'grab' : 'zoom-in'
    if (animate && !reduce()) {
      gsap.to(img, { scale: s, x, y, duration: 0.45, ease: 'expo.out', overwrite: true })
    } else {
      gsap.killTweensOf(img)
      apply()
    }
  }

  const fromCenter = (cx: number, cy: number) => {
    const r = stage.getBoundingClientRect()
    return { px: cx - (r.left + r.width / 2), py: cy - (r.top + r.height / 2) }
  }

  // Size the image to fill the viewer whatever its pixel size (small exports scale up).
  const fit = () => {
    if (!img.naturalWidth) return
    const cs = getComputedStyle(stage)
    const aw = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
    const ah = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
    const ar = img.naturalWidth / img.naturalHeight
    const w = Math.max(1, Math.min(aw, ah * ar))
    img.style.width = `${w}px`
    img.style.height = `${w / ar}px`
  }

  const load = async (i: number) => {
    const b = buttons[i]
    index = i
    usedFull = false
    s = 1
    x = 0
    y = 0
    img.alt = b.dataset.alt ?? ''
    title.textContent = b.dataset.title ?? ''
    meta.textContent = b.dataset.meta ?? ''
    img.src = b.dataset.large ?? ''
    try {
      await img.decode()
    } catch {
      /* the image still renders when decode is unsupported */
    }
    fit()
  }

  const open = async (i: number) => {
    if (isOpen || busy) return
    busy = true
    opener = buttons[i]
    startIndex = i
    root.hidden = false
    gsap.set(img, { clearProps: 'all', autoAlpha: 0 })
    gsap.to(scrim, { opacity: 1, duration: dur(0.4), ease: 'power2.out' })
    await load(i)
    const from = opener.getBoundingClientRect()
    const to = img.getBoundingClientRect()
    gsap.set(img, { autoAlpha: 1 })
    if (!reduce() && to.width > 0) {
      gsap.set(opener, { visibility: 'hidden' })
      gsap.fromTo(
        img,
        {
          x: from.left + from.width / 2 - (to.left + to.width / 2),
          y: from.top + from.height / 2 - (to.top + to.height / 2),
          scale: from.width / to.width,
        },
        { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'expo.out' },
      )
    }
    isOpen = true
    busy = false
    close.focus()
  }

  const finish = () => {
    root.hidden = true
    gsap.set(buttons, { clearProps: 'visibility' })
    const changed = index !== startIndex
    const back = buttons[index]
    isOpen = false
    busy = false
    going = false
    onClose(index, changed)
    ;(back ?? opener)?.focus({ preventScroll: true })
  }

  const shut = () => {
    if (!isOpen || busy) return
    busy = true
    gsap.killTweensOf(img)
    const target = buttons[index]
    const r = target.getBoundingClientRect()
    const to = img.getBoundingClientRect()
    const visible =
      r.width > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth
    gsap.to(scrim, { opacity: 0, duration: dur(0.35), ease: 'power2.out' })
    if (reduce() || !visible || index !== startIndex || s !== 1) {
      gsap.to(img, { autoAlpha: 0, duration: dur(0.25), onComplete: finish })
      return
    }
    gsap.to(img, {
      x: r.left + r.width / 2 - (to.left + to.width / 2),
      y: r.top + r.height / 2 - (to.top + to.height / 2),
      scale: r.width / to.width,
      duration: 0.55,
      ease: 'expo.inOut',
      onComplete: finish,
    })
  }

  const go = async (dir: 1 | -1) => {
    if (!isOpen || busy || going || buttons.length < 2) return
    going = true
    const n = (index + dir + buttons.length) % buttons.length
    await tween({ autoAlpha: 0, x: -dir * 48, duration: dur(0.2), ease: 'power2.in' })
    await load(n)
    if (!isOpen || busy) {
      going = false
      return
    }
    gsap.set(img, { scale: 1, x: dir * 48 })
    await tween({ autoAlpha: 1, x: 0, duration: dur(0.45), ease: 'expo.out' })
    img.style.cursor = 'zoom-in'
    going = false
  }

  const onDown = (e: PointerEvent) => {
    if ((e.target as HTMLElement).closest('.lb-bar')) return
    stage.setPointerCapture(e.pointerId)
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.size === 1) down = { x: e.clientX, y: e.clientY, t: performance.now(), moved: false }
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()]
      pinch = Math.hypot(a.x - b.x, a.y - b.y)
      if (down) down.moved = true
    }
  }

  const onMove = (e: PointerEvent) => {
    const p = pointers.get(e.pointerId)
    if (!p) return
    const dx = e.clientX - p.x
    const dy = e.clientY - p.y
    p.x = e.clientX
    p.y = e.clientY
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()]
      const d = Math.hypot(a.x - b.x, a.y - b.y)
      if (pinch > 0) {
        const c = fromCenter((a.x + b.x) / 2, (a.y + b.y) / 2)
        setZoom(s * (d / pinch), c.px, c.py)
      }
      pinch = d
      return
    }
    if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) down.moved = true
    if (s > 1) {
      x += dx
      y += dy
      clampPan()
      apply()
      img.style.cursor = 'grabbing'
    }
  }

  const onUp = (e: PointerEvent) => {
    pointers.delete(e.pointerId)
    pinch = 0
    if (pointers.size > 0 || !down) return
    const d = down
    down = null
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (s > 1) {
      img.style.cursor = 'grab'
      if (!d.moved && performance.now() - lastTap < 320) setZoom(1, 0, 0, true)
      lastTap = performance.now()
      return
    }
    if (d.moved) {
      if (Math.abs(dx) > 70 && Math.abs(dy) < 70) go(dx < 0 ? 1 : -1)
      else if (dy > 110 && Math.abs(dx) < 70) shut()
      return
    }
    const now = performance.now()
    // The stage holds pointer capture, so e.target is always the stage; hit-test the image instead.
    const box = img.getBoundingClientRect()
    const onImage =
      e.clientX >= box.left && e.clientX <= box.right && e.clientY >= box.top && e.clientY <= box.bottom
    if (onImage && now - lastTap < 320) {
      const c = fromCenter(e.clientX, e.clientY)
      setZoom(2.5, c.px, c.py, true)
      lastTap = 0
    } else if (!onImage) {
      shut()
    } else {
      lastTap = now
    }
  }

  const onWheel = (e: WheelEvent) => {
    if (!isOpen) return
    e.preventDefault()
    const c = fromCenter(e.clientX, e.clientY)
    setZoom(s * Math.exp(-e.deltaY * 0.002), c.px, c.py)
  }

  const onKey = (e: KeyboardEvent) => {
    if (!isOpen) return
    if (['ArrowLeft', 'ArrowRight', ' ', 'PageDown', 'PageUp'].includes(e.key)) e.preventDefault()
    if (e.key === 'Escape') shut()
    else if (e.key === 'ArrowRight') go(1)
    else if (e.key === 'ArrowLeft') go(-1)
    else if (e.key === '+' || e.key === '=') setZoom(s * 1.4, 0, 0, true)
    else if (e.key === '-') setZoom(s / 1.4, 0, 0, true)
    else if (e.key === 'Tab') {
      const focusables = [prev, next, close]
      const i = focusables.indexOf(document.activeElement as HTMLElement)
      e.preventDefault()
      focusables[(i + (e.shiftKey ? -1 : 1) + focusables.length) % focusables.length].focus()
    }
  }

  stage.addEventListener('pointerdown', onDown)
  stage.addEventListener('pointermove', onMove)
  stage.addEventListener('pointerup', onUp)
  stage.addEventListener('pointercancel', onUp)
  stage.addEventListener('wheel', onWheel, { passive: false })
  document.addEventListener('keydown', onKey)
  window.addEventListener('resize', fit)
  const onPrev = () => go(-1)
  const onNext = () => go(1)
  prev.addEventListener('click', onPrev)
  next.addEventListener('click', onNext)
  close.addEventListener('click', shut)

  return {
    open,
    destroy() {
      stage.removeEventListener('pointerdown', onDown)
      stage.removeEventListener('pointermove', onMove)
      stage.removeEventListener('pointerup', onUp)
      stage.removeEventListener('pointercancel', onUp)
      stage.removeEventListener('wheel', onWheel)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', fit)
      prev.removeEventListener('click', onPrev)
      next.removeEventListener('click', onNext)
      close.removeEventListener('click', shut)
      gsap.killTweensOf([img, scrim])
        root.hidden = true
    },
  }
}
