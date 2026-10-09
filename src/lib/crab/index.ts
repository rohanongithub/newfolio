import { CrabEngine } from './engine'
import { crabIcon } from './sprite'

const KEY = 'crab'

function readOff(): boolean {
  try {
    return localStorage.getItem(KEY) === 'off'
  } catch {
    return false
  }
}

function writeOff(off: boolean) {
  try {
    if (off) localStorage.setItem(KEY, 'off')
    else localStorage.removeItem(KEY)
  } catch {
    // Private mode or blocked storage: the choice just lasts for this page.
  }
}

/** Wires the crab on the current page. Returns a cleanup for `astro:before-swap`. */
export function initCrab(): () => void {
  const layer = document.querySelector<HTMLElement>('[data-crab-layer]')
  const toggle = document.querySelector<HTMLButtonElement>('[data-crab-toggle]')
  const crab = layer?.querySelector<HTMLElement>('[data-crab]')
  const body = layer?.querySelector<HTMLElement>('[data-crab-body]')
  const rope = layer?.querySelector<HTMLElement>('[data-crab-rope]')
  const knot = layer?.querySelector<HTMLElement>('[data-crab-knot]')
  if (!layer || !toggle || !crab || !body || !rope || !knot) return () => {}

  // JS animation is not covered by the global reduced-motion clamp, so opt out here.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
  const engine = new CrabEngine({ crab, body, rope, knot })
  let startTimer = 0
  let on = false

  const icon = toggle.querySelector<HTMLElement>('[data-crab-icon]')
  if (icon && !icon.firstChild) icon.innerHTML = crabIcon(2)

  // Same rule as Back to top: step aside while the footer is on screen.
  const footer = document.querySelector('footer')
  const footerWatch = footer
    ? new IntersectionObserver(([entry]) => {
        toggle.toggleAttribute('data-over-footer', entry.isIntersecting)
      })
    : null
  if (footer) footerWatch?.observe(footer)

  const setOn = (next: boolean) => {
    on = next
    toggle.setAttribute('aria-pressed', String(on))
    toggle.title = on ? 'Crab companion: on' : 'Crab companion: off'
    window.clearTimeout(startTimer)
    if (on) {
      layer.hidden = false
      engine.start()
    } else {
      engine.stop()
      layer.hidden = true
    }
  }

  const apply = () => {
    if (reduce.matches) {
      engine.stop()
      layer.hidden = true
      toggle.hidden = true
      return
    }
    toggle.hidden = false
    if (!readOff()) {
      // Let the page settle (and the stage rail play) before the crab arrives.
      startTimer = window.setTimeout(() => setOn(true), 700)
    } else setOn(false)
  }

  const onToggle = () => {
    const next = !on
    writeOff(!next)
    setOn(next)
  }
  toggle.addEventListener('click', onToggle)
  reduce.addEventListener('change', apply)
  apply()

  return () => {
    window.clearTimeout(startTimer)
    toggle.removeEventListener('click', onToggle)
    reduce.removeEventListener('change', apply)
    footerWatch?.disconnect()
    engine.stop()
  }
}
