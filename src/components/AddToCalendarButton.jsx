import { useState } from 'react';
import { CalendarPlus, Check } from 'lucide-react';
import { downloadIcs } from '../lib/calendar';

/**
 * Downloads an .ics for the event. Works with Google Calendar, Apple Calendar
 * and Outlook without an account, an API key, or a single network request.
 */
export default function AddToCalendarButton({ event, className = '', label = 'Add to calendar' }) {
  const [done, setDone] = useState(false);

  const handle = () => {
    downloadIcs(event);
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  return (
    <button
      type="button"
      onClick={handle}
      className={`btn border border-white/12 px-5 py-3 text-sm text-white/70 hover:border-accent/40 hover:text-accent ${className}`}
    >
      {done ? <Check size={15} /> : <CalendarPlus size={15} />}
      {done ? 'Downloaded' : label}
    </button>
  );
}
