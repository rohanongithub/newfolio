import { createLightbox } from './lightbox'

const pad = (n: number) => String(n + 1).padStart(2, '0')

let teardown: (() => void) | null = null
let run = 0

async function init() {
  const root = document.querySelector<HTMLElement>('[data-easel]')
  if (!root) return
  const token = ++run
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ])
  if (token !== run || !root.isConnected) return
  gsap.registerPlugin(ScrollTrigger)
  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh, { once: true })
  document.fonts?.ready.then(refresh)

  const pin = root.querySelector<HTMLElement>('[data-room-pin]')!
  const wall = root.querySelector<HTMLElement>('[data-wall]')!
  const track = root.querySelector<HTMLElement>('[data-track]')!
  const bar = root.querySelector<HTMLElement>('[data-progress]')!
  const dim = root.querySelector<HTMLElement>('[data-dim]')!
  const top = root.querySelector<HTMLElement>('.room-top')!
  const intro = root.querySelector<HTMLElement>('[data-intro]')
  const outro = root.querySelector<HTMLElement>('[data-outro]')
  const introParts = Array.from(root.querySelectorAll<HTMLElement>('[data-intro-part]'))
  const counter = root.querySelector<HTMLElement>('[data-room-current]')!
  const pieces = Array.from(root.querySelectorAll<HTMLElement>('[data-piece]'))
  const frames = pieces.map((p) => p.querySelector<HTMLElement>('[data-open]')!)

  let current = -1
  const isCalm = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let goTo: (i: number, smooth?: boolean) => void = (i, smooth = false) =>
    pieces[i].scrollIntoView({
      block: 'center',
      inline: 'center',
      behavior: smooth && isCalm() ? 'smooth' : 'auto',
    })
  const step = (dir: number) => {
    const n = Math.max(0, Math.min(pieces.length - 1, (current < 0 ? 0 : current) + dir))
    if (n === current && !(n === 0 && dir < 0)) return
    goTo(n, true)
  }

  const setCurrent = (i: number) => {
    if (i === current) return
    current = i
    counter.textContent = pad(i)
    pieces.forEach((p, k) => p.classList.toggle('is-lit', k === i))
  }

  // How far the first painting has slid over the title (0 to 1), measured from its real
  // position: it starts when the painting's edge meets the text and is complete (title fully
  // gone, so nothing shows through a dimmed painting) once the edge is halfway across.
  const setCover = () => {
    if (outro && window.innerWidth >= 768) {
      // Mirror image at the far end: the closing title is hidden while the last painting is
      // still over it, and appears as the painting's right edge pulls away from the text.
      const o = outro.getBoundingClientRect()
      const lastR = frames[frames.length - 1].getBoundingClientRect().right
      const oc = (lastR - o.left) / Math.max(1, o.width * 0.5)
      outro.style.setProperty('--cover', String(Math.max(0, Math.min(1, oc))))
    }
    if (!intro) return
    const t = intro.getBoundingClientRect()
    const first = frames[0].getBoundingClientRect()
    const vertical = window.innerWidth < 768
    const c = vertical
      ? (t.bottom - first.top) / Math.max(1, t.height * 0.5)
      : (t.right - first.left) / Math.max(1, t.width * 0.5)
    intro.style.setProperty('--cover', String(Math.max(0, Math.min(1, c))))
  }

  const nearest = (axis: 'x' | 'y') => {
    if (axis === 'y') {
      // The ends of the page cannot scroll a piece to the middle, so they pick the end piece.
      const max = document.documentElement.scrollHeight - innerHeight
      if (scrollY <= 2) return 0
      if (scrollY >= max - 2) return pieces.length - 1
    }
    const mid = axis === 'x' ? innerWidth / 2 : (56 + innerHeight) / 2
    let best = 0
    let bestD = Infinity
    pieces.forEach((p, i) => {
      const r = p.getBoundingClientRect()
      const c = axis === 'x' ? r.left + r.width / 2 : r.top + r.height / 2
      const d = Math.abs(c - mid)
      if (d < bestD) {
        bestD = d
        best = i
      }
    })
    return best
  }

  const lightbox = createLightbox({
    gsap,
    buttons: frames,
    onClose: (i, changed) => {
      if (changed) goTo(i)
    },
  })
  const openers = frames.map((f, i) => {
    const h = () => lightbox.open(i)
    f.addEventListener('click', h)
    return () => f.removeEventListener('click', h)
  })

  const onNativeScroll = () => {
    setCover()
    setCurrent(nearest(window.innerWidth >= 768 ? 'x' : 'y'))
  }
  const mm = gsap.matchMedia()

  mm.add(
    {
      desk: '(min-width: 768px)',
      calm: '(prefers-reduced-motion: no-preference)',
    },
    (ctx) => {
      const { desk, calm } = ctx.conditions as { desk: boolean; calm: boolean }

      const cleanups: Array<() => void> = []
      const onStep = (e: Event) => step(Number((e.currentTarget as HTMLElement).dataset.step))
      const stepBtns = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'))
      stepBtns.forEach((b) => b.addEventListener('click', onStep))
      cleanups.push(() => stepBtns.forEach((b) => b.removeEventListener('click', onStep)))

      if (desk) {
        // A title opens the wall on the left and another closes it on the right.
        const setPads = () => {
          const cw = wall.clientWidth
          if (intro) root.style.setProperty('--intro-w', `${intro.offsetWidth + cw * 0.06}px`)
          if (outro) root.style.setProperty('--outro-w', `${outro.offsetWidth + cw * 0.06}px`)
          track.style.paddingLeft = `${Math.max(32, cw * 0.07)}px`
          track.style.paddingRight = `${Math.max(32, cw * 0.07)}px`
        }
        setPads()
        window.addEventListener('resize', setPads)
        ScrollTrigger.addEventListener('refreshInit', setPads)
        cleanups.push(() => {
          window.removeEventListener('resize', setPads)
          ScrollTrigger.removeEventListener('refreshInit', setPads)
          track.style.paddingLeft = ''
          track.style.paddingRight = ''
        })

        const onKey = (e: KeyboardEvent) => {
          const lb = document.querySelector<HTMLElement>('[data-lightbox]')
          if (lb && !lb.hidden) return
          if ((e.target as HTMLElement).closest('input, textarea, select')) return
          if (e.key === 'ArrowRight') {
            e.preventDefault()
            step(1)
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault()
            step(-1)
          }
        }
        document.addEventListener('keydown', onKey)
        cleanups.push(() => document.removeEventListener('keydown', onKey))
      }

      if (desk && calm) {
        root.setAttribute('data-pinned', '')

        // Sideways input drives the pan too: trackpad swipes, shift-wheel, and drag.
        const onWheel = (e: WheelEvent) => {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault()
            window.scrollBy(0, e.deltaX)
          }
        }
        pin.addEventListener('wheel', onWheel, { passive: false })
        let drag: { x: number; moved: boolean } | null = null
        let wasDrag = false
        const onDown = (e: PointerEvent) => {
          if ((e.target as HTMLElement).closest('.room-top')) return
          drag = { x: e.clientX, moved: false }
        }
        const onMove = (e: PointerEvent) => {
          if (!drag) return
          const dx = e.clientX - drag.x
          if (!drag.moved && Math.abs(dx) < 8) return
          drag.moved = true
          wasDrag = true
          wall.style.cursor = 'grabbing'
          drag.x = e.clientX
          window.scrollBy(0, -dx * 1.1)
        }
        const onUp = () => {
          drag = null
          wall.style.cursor = ''
          setTimeout(() => (wasDrag = false), 0)
        }
        const onClickCapture = (e: MouseEvent) => {
          if (wasDrag) {
            e.stopPropagation()
            e.preventDefault()
          }
        }
        wall.addEventListener('pointerdown', onDown)
        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp)
        wall.addEventListener('click', onClickCapture, true)
        cleanups.push(() => {
          pin.removeEventListener('wheel', onWheel)
          wall.removeEventListener('pointerdown', onDown)
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('pointerup', onUp)
          wall.removeEventListener('click', onClickCapture, true)
        })
        const dist = () => Math.max(0, track.scrollWidth - wall.clientWidth)
        const pan = gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          onUpdate() {
            gsap.set(bar, { scaleX: Math.max(0.02, this.progress()) })
            setCover()
            setCurrent(nearest('x'))
          },
          scrollTrigger: {
            trigger: pin,
            start: 'top 56px',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        frames.forEach((frame) => {
          const art = frame.querySelector<HTMLElement>('[data-parallax]')
          if (!art) return
          gsap.fromTo(
            art,
            { xPercent: -5, scale: 1.14 },
            {
              xPercent: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: frame,
                containerAnimation: pan,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })
        goTo = (i, smooth = false) => {
          const st = pan.scrollTrigger!
          const r = pieces[i].getBoundingClientRect()
          const wallX = gsap.getProperty(track, 'x') as number
          const target = r.left - wallX + r.width / 2 - innerWidth / 2
          const p = !dist() || i === 0 ? 0 : i === pieces.length - 1 ? 1 : Math.max(0, Math.min(1, target / dist()))
          window.scrollTo({ top: st.start + p * (st.end - st.start), behavior: smooth ? 'smooth' : 'auto' })
        }
        setCurrent(0)
      } else {
        root.removeAttribute('data-pinned')
        if (!desk) root.setAttribute('data-snap', '')
        wall.addEventListener('scroll', onNativeScroll, { passive: true })
        window.addEventListener('scroll', onNativeScroll, { passive: true })
        setCurrent(nearest(desk ? 'x' : 'y'))
      }

      if (calm) {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        tl.fromTo(dim, { opacity: 1 }, { opacity: 0, duration: 1.1, ease: 'power2.out' }, 0)
          .from(top, { autoAlpha: 0, y: -8, duration: 0.8 }, 0.2)
        if (desk) {
          tl.from(frames, { autoAlpha: 0, y: 28, duration: 0.9, stagger: 0.08 }, 0.15)
          if (introParts.length) tl.from(introParts, { autoAlpha: 0, x: -40, duration: 1, stagger: 0.1 }, 0.1)
        }
      }

      return () => {
        cleanups.forEach((fn) => fn())
        root.removeAttribute('data-pinned')
        root.removeAttribute('data-snap')
        wall.removeEventListener('scroll', onNativeScroll)
        window.removeEventListener('scroll', onNativeScroll)
      }
    },
  )

  teardown = () => {
    mm.revert()
    openers.forEach((off) => off())
    lightbox.destroy()
    ScrollTrigger.getAll().forEach((t) => t.kill())
    gsap.set([...frames, ...introParts, top, dim, bar], { clearProps: 'all' })
    intro?.style.removeProperty('--cover')
    outro?.style.removeProperty('--cover')
    root.style.removeProperty('--intro-w')
    root.style.removeProperty('--outro-w')
    teardown = null
  }
}

export function initEasel() {
  document.addEventListener('astro:page-load', () => {
    init()
  })
  document.addEventListener('astro:before-swap', () => {
    run++
    teardown?.()
  })
}
