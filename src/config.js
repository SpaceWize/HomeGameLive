/**
 * Everything identifying about this build lives here.
 *
 * This is a portfolio demo of a booking product. The brand, venues, clubs and
 * locations below are all invented — renaming the product is editing `brand`
 * and nothing else.
 */
export const brand = {
  // Rendered as two words so the second can take the accent colour. Use a
  // single-element array for a one-word name.
  nameParts: ['Front', 'Row'],
  monogram: 'FR',
  get name() {
    return this.nameParts.join(' ');
  },
};

export const contact = {
  email: 'hello@example.com',
  phone: '(555) 010-0142',
  serviceArea: 'Greater Rivermouth',
};

/**
 * Where the schedule is read from.
 *
 * Empty means the bundled schedule in src/data/events.json is used, which
 * needs no network call and cannot fail.
 *
 * To drive it from a spreadsheet instead:
 *   1. File > Share > Publish to web > pick the tab > Comma-separated values
 *   2. Paste the URL here — it must end in /pub?output=csv, NOT /pubhtml
 *
 * A local .env with VITE_EVENTS_SHEET_CSV still overrides this, which is
 * useful for trying a draft sheet without committing anything.
 */
export const EVENTS_SHEET_CSV = '';
