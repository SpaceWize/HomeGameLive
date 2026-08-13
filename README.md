# Front Row

A demo booking product for sports watch parties: browse fixtures, reserve a seat, manage your
bookings. Built as a portfolio piece.

**Everything in it is fictional** — the brand, the venues, the clubs and the city are all invented,
and the data is bundled with the app.

## What it does

- **Local accounts.** Sign up and sign in, stored in `localStorage`. Passwords are salted and
  SHA-256 hashed rather than stored in plain text. No server, no data collection.
- **Reservations.** Hold a seat, see it on your account page, cancel it. Signed-out visitors are
  routed through sign-in and returned to where they were.
- **One source of truth for the schedule.** Events carry real ISO timestamps; day labels, the
  `TONIGHT` / `TOMORROW` / `FILLING FAST` badges, the week range and seat counts are all *derived*,
  so nothing can drift out of sync.
- **Live countdown** to kickoff that reports the fixture as upcoming, live, then finished.
- **Seat meters** showing capacity as a bar, because "18 seats left" reads differently at 18-of-20
  than at 18-of-120.
- **Add to calendar** generating a valid `.ics` entirely client-side — correct CRLF endings, RFC
  5545 line folding, escaped separators and a reminder alarm. No API key, no network request.
- **18 routes**, every nav and footer link resolving to a real page. No placeholder links.
- Skip-to-content link, visible focus rings, `aria-expanded` menus, `prefers-reduced-motion`
  support, and no horizontal overflow at mobile widths.

## Running it

```bash
npm install
npm run dev
```

## Renaming it

The brand lives in one place — `src/config.js`:

```js
export const brand = { nameParts: ['Front', 'Row'], monogram: 'FR' };
```

Change that and the header, footer, page titles and calendar exports all follow. The palette is in
`tailwind.config.js`, named by role (`ink`, `surface`, `accent`, `paper`, `alert`) rather than by
hue, so re-skinning is a handful of hex values.

## Driving the schedule from a spreadsheet

By default the app renders `src/data/events.json`, which needs no network call and cannot fail.

To let a non-technical maintainer edit the schedule instead, publish a Google Sheet as CSV
(**File → Share → Publish to web → pick the tab → Comma-separated values**) and paste the URL into
`EVENTS_SHEET_CSV` in `src/config.js`. It must end in `/pub?output=csv` — `/pubhtml` returns a web
page rather than data.

Columns: `slug, title, home, homeColor, away, awayColor, league, startsAt, venue, capacity, seatsTaken, blurb`

The `venue` column accepts either a slug or the display name. Rows missing a title or a readable
date are skipped and reported in the console rather than rendering broken output, and `seatsTaken`
is clamped to `capacity`. If the sheet is unreachable the bundled data is used, so the schedule can
never render empty.

Open the console and check `__hglEvents` to see which source is live — a working sheet and a
missing one otherwise look identical.

> **Why a sheet rather than a calendar API:** seat availability changes with every booking, and a
> calendar has nowhere to put it. A sheet gives `capacity` and `seatsTaken` real columns. The
> better long-term answer is a database that derives remaining seats from booking records instead
> of anyone typing a number.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages.
Enable it once under **Settings → Pages → Source → GitHub Actions**.

`REPO_BASE` in `vite.config.js` must match the repository name exactly, including capitalisation.

## Stack

React 18 · Vite 5 · Tailwind CSS 3 · React Router 6 · lucide-react · Fontsource
