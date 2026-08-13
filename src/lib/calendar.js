/**
 * Generates an .ics file for a game night, entirely in the browser.
 *
 * This is the one place a calendar genuinely belongs in this product: pushing
 * a confirmed booking into the visitor's own calendar. It needs no API key, no
 * account, and no backend, and the file imports into Google Calendar, Apple
 * Calendar and Outlook alike.
 */

/** Watch parties are listed by kickoff; three hours covers pre-game and full time. */
const DEFAULT_DURATION_HOURS = 3;

/** ICS wants UTC as YYYYMMDDTHHMMSSZ with no punctuation. */
function toIcsDate(date) {
  return new Date(date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/** Commas, semicolons, backslashes and newlines are all special in ICS text. */
function escapeText(value = '') {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/** RFC 5545 caps content lines at 75 octets; continuations start with a space. */
function foldLine(line) {
  if (line.length <= 75) return line;
  const chunks = [line.slice(0, 75)];
  let rest = line.slice(75);
  while (rest.length > 74) {
    chunks.push(` ${rest.slice(0, 74)}`);
    rest = rest.slice(74);
  }
  if (rest) chunks.push(` ${rest}`);
  return chunks.join('\r\n');
}

export function buildIcs(event) {
  const start = new Date(event.startsAt);
  const end = new Date(start.getTime() + DEFAULT_DURATION_HOURS * 60 * 60 * 1000);

  // A saved reservation carries fewer fields than a full event record, so
  // every optional part is guarded rather than interpolated blindly.
  const description = [
    event.league
      ? `${event.league} watch party hosted by Front Row.`
      : 'Watch party hosted by Front Row.',
    event.blurb,
    '',
    'Seat reserved via Front Row.',
  ]
    .filter(Boolean)
    .join('\n');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Front Row//Watch Party//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.id ?? event.slug ?? Date.now()}@frontrow`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escapeText(event.title)}`,
    `LOCATION:${escapeText([event.venueName, event.city].filter(Boolean).join(', '))}`,
    `DESCRIPTION:${escapeText(description)}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeText(`${event.title} starts in 2 hours`)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  // ICS requires CRLF line endings.
  return lines.map(foldLine).join('\r\n');
}

export function downloadIcs(event) {
  const blob = new Blob([buildIcs(event)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.slug || 'game-night'}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  // Give the browser a moment to start the download before revoking.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
