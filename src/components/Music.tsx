import { Music as MusicIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { fetchLatestSong, type Track } from '../lib/music'

export default function Music() {
  const [track, setTrack] = useState<Track | null>(null)

  useEffect(() => {
    let active = true
    fetchLatestSong()
      .then((data) => active && setTrack(data))
      .catch(() => active && setTrack(null))
    return () => {
      active = false
    }
  }, [])

  // Third-party data: render nothing rather than an error a recruiter would see.
  if (!track) return null

  // last.fm serves a grey star as its "no artwork" placeholder; treat it as missing.
  const art = track.image
    ?.map((img) => img['#text'])
    .reverse()
    .find((src) => src && !src.includes('2a96cbd8b46e442fc41c2b86b821562f'))
  const nowPlaying = track['@attr']?.nowplaying === 'true'

  return (
    <section className="panel p-4 sm:p-5" aria-labelledby="listening-title">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="listening-title" className="panel-title">
          Listening
        </h2>
        <span className={nowPlaying ? 'chip chip-green' : 'chip'}>
          {nowPlaying ? 'Now playing' : 'Last played'}
        </span>
      </div>
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-4 flex items-center gap-3 no-underline"
      >
        {art ? (
          <img
            src={art}
            alt=""
            width={56}
            height={56}
            className="size-14 flex-shrink-0 rounded-md border object-cover"
          />
        ) : (
          <div
            className="grid size-14 flex-shrink-0 place-items-center rounded-md bg-secondary font-display text-xl font-bold text-primary"
            aria-hidden="true"
          >
            <MusicIcon className="size-6" />
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate font-display text-base font-semibold tracking-tight transition-colors group-hover:text-primary">
            {track.name}
          </p>
          <p className="truncate text-sm text-muted-foreground">
            {track.artist['#text']}
          </p>
          <p className="truncate text-sm text-muted-foreground">
            {track.album['#text']}
          </p>
        </div>
        <span className="sr-only">(opens on last.fm in a new tab)</span>
      </a>
    </section>
  )
}
