/**
 * Visual fill of a night's capacity.
 *
 * "18 seats left" alone gives no sense of scale — 18 out of 20 and 18 out of
 * 120 read very differently. The bar makes scarcity legible at a glance, which
 * is the entire persuasive job of this number.
 */
export default function SeatMeter({ capacity, seatsLeft, tone = 'dark', showLabel = true }) {
  const taken = Math.max(0, capacity - seatsLeft);
  const pct = capacity > 0 ? Math.min(100, Math.round((taken / capacity) * 100)) : 0;

  const urgent = seatsLeft <= 10 && seatsLeft > 0;
  const soldOut = seatsLeft <= 0;

  const track = tone === 'dark' ? 'bg-white/10' : 'bg-ink/10';
  const muted = tone === 'dark' ? 'text-white/40' : 'text-ink/40';
  const fill = soldOut ? 'bg-white/25' : urgent ? 'bg-flames' : 'bg-gold';

  return (
    <div className="w-full">
      <div
        className={`h-1.5 w-full overflow-hidden rounded-full ${track}`}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${taken} of ${capacity} seats taken`}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-700 ease-out ${fill}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {showLabel && (
        <p className={`mt-2 font-mono text-[10px] uppercase tracking-[0.14em] ${muted}`}>
          {soldOut ? (
            'Fully booked'
          ) : (
            <>
              <span className={urgent ? 'text-flames' : tone === 'dark' ? 'text-white/70' : 'text-ink/70'}>
                {taken}
              </span>{' '}
              of {capacity} seats taken
            </>
          )}
        </p>
      )}
    </div>
  );
}
