import rawEvents from '../data/events.json';
import venues from '../data/venues.json';

/**
 * Where the schedule comes from.
 *
 * By default the site renders the bundled `events.json`, so it always works
 * with no network call and nothing external to break.
 *
 * To let a non-technical maintainer edit the schedule without touching code:
 *   1. Put the events in a Google Sheet with these column headers —
 *      slug, title, home, homeColor, away, awayColor, league, startsAt,
 *      venue, capacity, seatsTaken, blurb
 *   2. File > Share > Publish to web > select the sheet > Comma-separated values
 *   3. Paste the published URL into a `.env` file as:
 *      VITE_EVENTS_SHEET_CSV="https://docs.google.com/.../pub?output=csv"
 *
 * No API key is needed and edits go live within a few minutes without a
 * redeploy. If the sheet is ever unreachable the bundled JSON is used instead,
 * so the site cannot render an empty schedule.
 */
const SHEET_CSV_URL = import.meta.env.VITE_EVENTS_SHEET_CSV || '';

/**
 * The bundled schedule is demo data. Rather than letting it silently go stale
 * the way the original site's hardcoded "THU JUL 24" strings did, we shift it
 * forward by whole weeks so the demo always has a live-looking week.
 * This never applies to data coming from a real sheet.
 */
const ROLL_FORWARD_DEMO_DATA = true;

const MS_DAY = 24 * 60 * 60 * 1000;

/* ---------------------------------------------------------------- dates -- */

export function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Monday-based start of week. */
export function startOfWeek(date) {
  const d = startOfDay(date);
  const day = (d.getDay() + 6) % 7; // Mon = 0 ... Sun = 6
  d.setDate(d.getDate() - day);
  return d;
}

export function daysUntil(date, now = new Date()) {
  return Math.round((startOfDay(date) - startOfDay(now)) / MS_DAY);
}

/** "THU AUG 7" — derived from a real date, so it can never drift. */
export function formatDayLabel(date) {
  return new Date(date)
    .toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' })
    .replace(',', '')
    .toUpperCase();
}

/** "7:00 PM" — en-US rather than en-CA, which renders "7:00 p.m." */
export function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/** "Fri, Aug 7" */
export function formatShortDate(date) {
  return new Date(date).toLocaleDateString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/** "Friday, August 7" */
export function formatLongDate(date) {
  return new Date(date).toLocaleDateString('en-CA', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

/** "Aug 3 — Aug 9, 2026" */
export function formatWeekRange(date = new Date()) {
  const start = startOfWeek(date);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const fmt = (d) => d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' });
  return `${fmt(start)} — ${fmt(end)}, ${end.getFullYear()}`;
}

/* ----------------------------------------------------------- enrichment -- */

export function seatsLeft(event) {
  return Math.max(0, event.capacity - event.seatsTaken);
}

/**
 * Badges are computed from the event's real date and seat count instead of
 * being typed in by hand, which is why the original could show "TONIGHT" on a
 * game that had already passed.
 */
export function deriveBadge(event, now = new Date()) {
  const left = seatsLeft(event);
  if (left <= 0) return 'SOLD OUT';
  if (left <= 10) return 'FILLING FAST';

  const days = daysUntil(event.startsAt, now);
  if (days === 0) return 'TONIGHT';
  if (days === 1) return 'TOMORROW';

  const sameWeek = startOfWeek(event.startsAt).getTime() === startOfWeek(now).getTime();
  const weekend = [0, 6].includes(new Date(event.startsAt).getDay());
  if (sameWeek && weekend) return 'THIS WEEKEND';

  return null;
}

const venueBySlug = new Map(venues.map((v) => [v.slug, v]));

/** "Par 4 Kitchen & Bar" -> "par-4-kitchen-bar" */
const slugify = (value) =>
  String(value)
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const venueByName = new Map(venues.map((v) => [slugify(v.name), v]));

/**
 * Accepts either a slug or the venue's display name.
 *
 * Someone maintaining the schedule in a spreadsheet will type "Par 4 Kitchen
 * & Bar", not "par-4-kitchen-bar". Matching on both means a human-entered
 * value resolves instead of silently rendering "Venue TBA".
 */
export function getVenue(reference) {
  if (!reference) return null;
  const key = String(reference).trim();
  return venueBySlug.get(key) || venueByName.get(slugify(key)) || null;
}

export function getVenues() {
  return venues;
}

function enrich(event, now) {
  const venue = getVenue(event.venue);
  return {
    ...event,
    // Normalise to the slug so /venues/:slug links work even when the source
    // data referenced the venue by its display name.
    venue: venue?.slug ?? event.venue,
    venueName: venue?.name ?? 'Venue TBA',
    city: venue ? `${venue.city}, ${venue.region}` : '',
    venueData: venue,
    seatsLeft: seatsLeft(event),
    badge: deriveBadge(event, now),
    isPast: new Date(event.startsAt) < now,
  };
}

/* ------------------------------------------------------------- loading --- */

function rollForwardToCurrentWeek(events) {
  if (!events.length) return events;

  const earliest = events.reduce(
    (min, e) => Math.min(min, new Date(e.startsAt).getTime()),
    Infinity
  );
  const anchorMonday = startOfWeek(new Date(earliest));
  const currentMonday = startOfWeek(new Date());
  const weeks = Math.round((currentMonday - anchorMonday) / (7 * MS_DAY));
  if (weeks === 0) return events;

  return events.map((e) => {
    // setDate() rather than adding milliseconds so the wall-clock start time
    // survives a daylight-saving boundary.
    const d = new Date(e.startsAt);
    d.setDate(d.getDate() + weeks * 7);
    return { ...e, startsAt: d.toISOString() };
  });
}

/** Minimal RFC-4180 parser — handles quoted fields containing commas. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          quoted = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') quoted = true;
    else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (char !== '\r') {
      field += char;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function csvToEvents(text) {
  const rows = parseCsv(text).filter((r) => r.some((c) => c.trim()));
  if (rows.length < 2) throw new Error('Sheet has no data rows');

  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((cells, i) => {
    const get = (key) => (cells[headers.indexOf(key)] ?? '').trim();
    const slug = get('slug') || `sheet-event-${i}`;
    return {
      id: `sheet-${slug}`,
      slug,
      title: get('title'),
      home: { name: get('home'), color: get('homeColor') || '#E8B04A' },
      away: { name: get('away'), color: get('awayColor') || '#5C5C5C' },
      league: get('league'),
      startsAt: get('startsAt'),
      venue: get('venue'),
      capacity: Number(get('capacity')) || 0,
      seatsTaken: Number(get('seatsTaken')) || 0,
      blurb: get('blurb'),
    };
  });
}

let cache = null;

/**
 * Returns every event, soonest first, enriched with venue, seats and badge.
 * Falls back to bundled data if the sheet is configured but unreachable.
 */
export async function loadEvents({ force = false } = {}) {
  if (cache && !force) return cache;

  const now = new Date();
  let source = ROLL_FORWARD_DEMO_DATA ? rollForwardToCurrentWeek(rawEvents) : rawEvents;

  if (SHEET_CSV_URL) {
    try {
      const res = await fetch(SHEET_CSV_URL);
      if (!res.ok) throw new Error(`Sheet responded ${res.status}`);
      const parsed = csvToEvents(await res.text());
      if (parsed.length) source = parsed;
    } catch (err) {
      console.warn('[events] Falling back to bundled schedule:', err.message);
    }
  }

  cache = source
    .map((e) => enrich(e, now))
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));

  return cache;
}

export function selectUpcoming(events, now = new Date()) {
  return events.filter((e) => new Date(e.startsAt) >= startOfDay(now));
}

export function selectThisWeek(events, now = new Date()) {
  const weekStart = startOfWeek(now);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);
  return selectUpcoming(events, now).filter((e) => {
    const d = new Date(e.startsAt);
    return d >= weekStart && d < weekEnd;
  });
}
