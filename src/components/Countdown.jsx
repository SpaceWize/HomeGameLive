import { useEffect, useState } from 'react';

function parts(msRemaining) {
  const total = Math.max(0, Math.floor(msRemaining / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

/** Matches the .ics duration, so "live" lasts as long as the booking does. */
const RUNTIME_MS = 3 * 60 * 60 * 1000;

/**
 * Counts down to kickoff, then reports the fixture as live and finally as
 * finished. A ticking clock communicates immediacy in a way a static start
 * time does not.
 */

export default function Countdown({ startsAt, className = '' }) {
  const [now, setNow] = useState(() => Date.now());

  const target = new Date(startsAt).getTime();
  const remaining = target - now;
  const started = remaining <= 0;
  // Without this a game that kicked off on Monday would still read "Live now"
  // on Friday.
  const finished = remaining <= -RUNTIME_MS;

  useEffect(() => {
    if (started) return undefined;

    // Tick every second inside the final hour, otherwise every minute — no
    // point re-rendering 60x a minute to change a number that reads "3d 4h".
    const interval = remaining < 3600_000 ? 1000 : 30_000;
    const id = setInterval(() => setNow(Date.now()), interval);
    return () => clearInterval(id);
  }, [started, remaining]);

  if (finished) {
    return (
      <span
        className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-white/30 ${className}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        Full time
      </span>
    );
  }

  if (started) {
    return (
      <span
        className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-alert ${className}`}
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-alert" />
        Live now
      </span>
    );
  }

  const { days, hours, minutes, seconds } = parts(remaining);

  const segments = days > 0
    ? [
        [days, 'd'],
        [hours, 'h'],
        [minutes, 'm'],
      ]
    : hours > 0
      ? [
          [hours, 'h'],
          [minutes, 'm'],
          [seconds, 's'],
        ]
      : [
          [minutes, 'm'],
          [seconds, 's'],
        ];

  return (
    <span
      className={`inline-flex items-baseline gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-white/50 ${className}`}
    >
      <span className="text-white/30">Starts in</span>
      {segments.map(([value, unit]) => (
        <span key={unit} className="tabular-nums text-accent">
          {String(value).padStart(2, '0')}
          <span className="text-accent/50">{unit}</span>
        </span>
      ))}
    </span>
  );
}
