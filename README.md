# Home Game Live

A rebuild of [game-night-social.base44.app](https://game-night-social.base44.app/#) — same brand and
aesthetic, but with the broken parts actually working.

## What was wrong with the original

Findings from auditing the deployed Base44 build:

| Area | Original behaviour |
| --- | --- |
| **Sign In** | The nav link was `href="#games"`. It scrolled to the schedule. No auth existed anywhere in the app. |
| **Reserve buttons** | Every one of them was a `<button>` with **no click handler at all** — purely decorative. Same for "Reserve on OpenTable". |
| **Newsletter** | Called `preventDefault()`, flipped the button to "You're In!", cleared the input, and **discarded the email**. No request, no storage. |
| **Schedule** | A hardcoded array compiled into the bundle, with dates as plain strings (`"THU JUL 24"`). Badges like "TONIGHT" were hand-typed and could never update. |
| **Date drift** | The hero read "Thursday, May 15" while the schedule read "Jul 24 — Jul 30" — two hardcoded strings that had drifted apart. |
| **Routing** | React Router was loaded but registered only `/` and `*`. One route. |
| **Footer** | Roughly 20 links, all `href="#"`. |
| **Fonts** | `--font-display` and `--font-body` were never overridden from the shadcn default, so every "display" heading rendered in the system UI font. |

## What this build does instead

- **Working local accounts.** Sign up / sign in, stored in `localStorage`. Passwords are salted and
  SHA-256 hashed — never stored in plain text. No server, no data collection.
- **Working reservations.** Reserve a seat, see it on your account page, cancel it. Signed-out
  visitors are sent to sign in and returned to where they were.
- **A newsletter form that does something** and says plainly that the address stayed in the browser.
- **One source of truth for events** with real ISO dates. Day labels, "TONIGHT" / "TOMORROW" /
  "FILLING FAST" badges, and the week range are all *derived*, so they cannot drift.
- **18 real routes.** Every link in the nav and footer goes somewhere real. There are no `#` links.
- **Real typography** — Manrope, Inter, Instrument Serif and JetBrains Mono, self-hosted so there is
  no font-CDN request.
- Skip-to-content link, visible focus rings, `aria-expanded` menus, and reduced-motion support.

## Running it

```bash
npm install
npm run dev
```

## Updating the schedule without touching code

By default the site renders `src/data/events.json`.

To hand schedule control to someone non-technical, publish a Google Sheet as CSV
(**File → Share → Publish to web → select the sheet → Comma-separated values**) and set:

```
VITE_EVENTS_SHEET_CSV="https://docs.google.com/.../pub?output=csv"
```

Columns: `slug, title, home, homeColor, away, awayColor, league, startsAt, venue, capacity, seatsTaken, blurb`

`events-template.csv` in this repo holds the current schedule in exactly that shape — import it
into a blank Sheet (**File → Import → Upload**) rather than building the columns by hand.

The `venue` column accepts either the slug (`par-4-kitchen-bar`) or the display name
(`Par 4 Kitchen & Bar`), so whoever maintains the sheet can type what they'd naturally type.

No API key is needed. Only the sheet *URL* is baked in at build time — the fetch happens on page
load, so **edits go live without a redeploy** (Google caches published CSV for a few minutes). If
the sheet is ever unreachable the bundled JSON is used instead, so the schedule can never render
empty.

### Adding one event without a sheet

Edit `src/data/events.json` — on github.com directly if you like. Pushing to `main` rebuilds and
redeploys automatically. `seatsLeft` is computed as `capacity - seatsTaken`, and the
`TONIGHT` / `TOMORROW` / `FILLING FAST` badges are derived from `startsAt` and the seat counts, so
there is nothing else to keep in sync.

> **Why a Sheet rather than Google Calendar:** seat availability changes daily, and Google Calendar
> has no field for it — you would end up parsing "18 seats left" out of the description. A Sheet
> gives `seatsTaken`, `capacity`, `venue` and `league` each a real column.

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to GitHub
Pages. Set repository **Settings → Pages → Source → GitHub Actions** once to enable it.

## Stack

React 18 · Vite 5 · Tailwind CSS 3 · React Router 6 · lucide-react · Fontsource
