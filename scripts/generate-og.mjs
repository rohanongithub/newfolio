// Generates one 1200x630 share card per project into public/static/og/<id>.png.
// Reads frontmatter from src/content/projects/*, fills scripts/og-template.html and renders it
// with a local Chrome/Chromium (no npm dependencies). Run `npm run og` after adding or
// editing a project, then commit the PNGs. Set CHROME_PATH if Chrome is not auto-detected.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, extname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const projectsDir = join(root, 'src/content/projects')
const outDir = join(root, 'public/static/og')

const chrome = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find((p) => p && existsSync(p))
if (!chrome) {
  console.error('No Chrome or Chromium found. Set CHROME_PATH and run again.')
  process.exit(1)
}

// Minimal frontmatter reader for the simple `key: value` lines these files use.
function readFrontmatter(file) {
  const text = readFileSync(file, 'utf8')
  const match = text.match(/^---\n([\s\S]*?)\n---/)
  const data = {}
  for (const line of (match?.[1] ?? '').split('\n')) {
    const m = line.match(/^([A-Za-z]+):\s*(.+)$/)
    if (!m || line.trimStart().startsWith('#')) continue
    const raw = m[2].trim()
    try {
      data[m[1]] = JSON.parse(raw)
    } catch {
      data[m[1]] = raw.replace(/^['"]|['"]$/g, '')
    }
  }
  return data
}

const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

mkdirSync(outDir, { recursive: true })
const template = readFileSync(join(root, 'scripts/og-template.html'), 'utf8')
const fonts = pathToFileURL(join(root, 'public/fonts')).href

for (const file of readdirSync(projectsDir).filter((f) => /\.mdx?$/.test(f))) {
  const id = basename(file, extname(file))
  const p = readFrontmatter(join(projectsDir, file))
  if (!p.name) continue

  const facts = [p.role, p.year].filter(Boolean).join(' · ')
  const status = p.status ? `<span class="status">${escapeHtml(p.status)}</span>` : ''
  const tags = (p.tags ?? [])
    .slice(0, 5)
    .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
    .join('')
  const len = String(p.name).length
  const nameSize = len > 20 ? 84 : len > 14 ? 104 : 136

  const html = template
    .replaceAll('{{fonts}}', fonts)
    .replaceAll('{{nameSize}}', String(nameSize))
    .replaceAll('{{name}}', escapeHtml(p.name))
    .replaceAll('{{facts}}', escapeHtml(facts))
    .replaceAll('{{status}}', status)
    .replaceAll('{{tags}}', tags)

  const tmp = join(tmpdir(), `og-${id}.html`)
  writeFileSync(tmp, html)
  const out = join(outDir, `${id}.png`)
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--virtual-time-budget=4000',
    '--window-size=1200,630',
    `--screenshot=${out}`,
    pathToFileURL(tmp).href,
  ], { stdio: 'ignore' })
  console.log(`wrote public/static/og/${id}.png`)
}
