const ADJECTIVES = [
  'Curious', 'Gentle', 'Bright', 'Bold', 'Calm', 'Clever', 'Daring', 'Eager',
  'Fearless', 'Gracious', 'Honest', 'Jolly', 'Keen', 'Lively', 'Merry', 'Noble',
  'Patient', 'Quiet', 'Radiant', 'Steady', 'Sunny', 'Tender', 'Witty', 'Zesty',
]

const NOUNS = [
  'Voyager', 'Wanderer', 'Explorer', 'Navigator', 'Pilot', 'Drifter', 'Traveller',
  'Dreamer', 'Builder', 'Maker', 'Tinkerer', 'Stargazer', 'Trailblazer', 'Cartographer',
  'Lantern', 'Comet', 'Compass', 'Harbour', 'Meridian', 'Horizon', 'Kite', 'Orbit',
]

export const captionFor = (a: () => number) =>
  `${ADJECTIVES[Math.floor(a() * ADJECTIVES.length)]} ${NOUNS[Math.floor(a() * NOUNS.length)]}`.toUpperCase()
