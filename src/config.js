/**
 * Where the schedule is read from.
 *
 * This is a plain committed constant rather than a build secret on purpose.
 * A "publish to web" CSV link is already public — publishing is what makes it
 * readable without a Google account — so putting it in an Actions variable
 * bought no privacy and cost a whole class of silent misconfiguration
 * (variable vs secret, repo vs environment, and forgetting that a saved
 * variable only applies to the *next* build).
 *
 * Editing this line and pushing is the entire setup.
 *
 * To point at a different sheet:
 *   1. File > Share > Publish to web > pick the tab > Comma-separated values
 *   2. Paste the URL below — it must end in /pub?output=csv, NOT /pubhtml
 *
 * Set it to '' to fall back to the bundled schedule in src/data/events.json.
 *
 * VITE_EVENTS_SHEET_CSV in a local .env still overrides this, which is handy
 * for testing a draft sheet without committing anything.
 */
export const EVENTS_SHEET_CSV =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5LqSrn-eXR8uOeCds5K5dtJbXcwVuPe09ISphqT9dCwl-tSIC-y1cbjFC4TZFe57lepe522gUumo3/pub?output=csv';
