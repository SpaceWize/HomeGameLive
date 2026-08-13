import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useAuth } from '../lib/auth.jsx';

/**
 * The original site's Reserve buttons had no click handler at all — they were
 * decorative. This one actually books a seat, and sends signed-out visitors to
 * sign in first while remembering where they were headed.
 */
export default function ReserveButton({ event, variant = 'dark', className = '', onReserved }) {
  const { user, reserve, hasReserved } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const reserved = hasReserved(event.id);
  const soldOut = event.seatsLeft <= 0 && !reserved;

  const handle = async () => {
    setError('');

    if (!user) {
      const redirect = encodeURIComponent(`${location.pathname}${location.search}`);
      navigate(`/signin?redirect=${redirect}&intent=reserve`);
      return;
    }

    setBusy(true);
    const result = reserve({
      eventId: event.id,
      eventSlug: event.slug,
      eventTitle: event.title,
      startsAt: event.startsAt,
      venueName: event.venueName,
    });
    setBusy(false);

    if (result.error) setError(result.error);
    else onReserved?.(result.reservation);
  };

  if (reserved) {
    return (
      <span
        className={`btn cursor-default border border-accent/40 bg-accent/10 px-5 py-2.5 text-accent ${className}`}
      >
        <Check size={15} /> Seat reserved
      </span>
    );
  }

  if (soldOut) {
    return (
      <span
        className={`btn cursor-not-allowed border border-white/10 bg-white/5 px-5 py-2.5 text-white/40 ${className}`}
        aria-disabled="true"
      >
        Sold out
      </span>
    );
  }

  const tone =
    variant === 'accent'
      ? 'bg-accent text-ink hover:bg-accent-light shadow-[0_8px_24px_rgba(138,163,255,0.3)]'
      : 'bg-ink text-white group-hover:bg-accent group-hover:text-ink';

  return (
    <>
      <button
        type="button"
        onClick={handle}
        disabled={busy}
        className={`btn px-5 py-2.5 disabled:opacity-60 ${tone} ${className}`}
      >
        {busy ? <Loader2 size={15} className="animate-spin" /> : null}
        {user ? 'Reserve' : 'Sign in to reserve'}
        {!busy && <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-xs text-alert">
          {error}
        </p>
      )}
    </>
  );
}
