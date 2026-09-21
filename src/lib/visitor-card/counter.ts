import { CARD } from '@/consts'

const NUMBER_KEY = 'visitor-card:number'
const ID_KEY = 'visitor-card:id'

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Storage can be blocked; the number then just is not remembered.
  }
}

export function storedNumber(): number | null {
  const n = Number(read(NUMBER_KEY))
  return Number.isInteger(n) && n > 0 ? n : null
}

/** A short id shown when the counter cannot be reached; stable per browser. */
export function cardId(): string {
  let id = read(ID_KEY)
  if (!id || !/^[0-9A-F]{4}$/.test(id)) {
    id = Array.from(crypto.getRandomValues(new Uint8Array(2)), (b) =>
      b.toString(16).padStart(2, '0'),
    )
      .join('')
      .toUpperCase()
    write(ID_KEY, id)
  }
  return id
}

/**
 * The visitor number of this browser. The counter is hit once per browser: the answer is
 * remembered, so more cards and shuffles never inflate it. Returns null when the counter is
 * unreachable. Only the counter's own key is sent, never the name.
 */
export async function claimNumber(): Promise<number | null> {
  const known = storedNumber()
  if (known) return known
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), CARD.counterTimeoutMs)
  try {
    const res = await fetch(
      `${CARD.counterUrl}/hit/${CARD.counterNamespace}/${CARD.counterKey}`,
      { signal: controller.signal, cache: 'no-store' },
    )
    if (!res.ok) return null
    const { value } = await res.json()
    if (!Number.isInteger(value) || value < 1) return null
    write(NUMBER_KEY, String(value))
    return value
  } catch {
    return null
  } finally {
    window.clearTimeout(timer)
  }
}

export function visitorLabel(n: number | null): string {
  return n ? `VISITOR No. ${n.toLocaleString('en-IN')}` : `CARD ID ${cardId()}`
}
