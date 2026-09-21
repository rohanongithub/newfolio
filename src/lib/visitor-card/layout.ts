/** Card geometry in canvas pixels (portrait 2:3). */
export const W = 1200
export const H = 1800
export const RADIUS = 36
export const MARGIN = 48

export const ART = { x: MARGIN, y: MARGIN, w: W - MARGIN * 2, h: 1000, r: 20 }

/** The visitor-number pill that sits on the art. Stamps keep clear of it. */
export const PILL = { x: 84, y: 84, h: 68 }

export const NAME_BAND = { top: 1090, bottom: 1400 }

export const STRIP = { x: MARGIN, y: 1448, w: W - MARGIN * 2, h: 88 }

export const FOOT = { tile: 96, top: H - MARGIN - 96 }
