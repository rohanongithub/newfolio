export { claimNumber, storedNumber, visitorLabel } from './counter'
export { drawCard, istStamp, loadFonts, makeSpec, type CardSpec } from './draw'

/** Keeps a typed name to something that fits and draws cleanly. */
export function cleanName(raw: string): string {
  return raw
    .replace(/\p{Cc}/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 24)
    .trim()
}

export function fileSlug(name: string): string {
  const slug = name
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug || 'visitor'
}
