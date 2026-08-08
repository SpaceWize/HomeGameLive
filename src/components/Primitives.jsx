import { Link } from 'react-router-dom';

/** Team crest: the club's colour with its initials. */
export function TeamCrest({ team, size = 'md' }) {
  const dimensions = {
    sm: 'w-10 h-10 text-[10px]',
    md: 'w-14 h-14 text-xs',
    lg: 'w-20 h-20 text-base',
  }[size];

  const initials = team.name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      className={`${dimensions} flex flex-shrink-0 items-center justify-center rounded-full font-display font-bold tracking-wide text-white`}
      style={{
        backgroundColor: team.color,
        boxShadow: `0 4px 16px ${team.color}66`,
      }}
    >
      {initials}
    </div>
  );
}

const BADGE_TONE = {
  'SOLD OUT': 'bg-white/10 text-white/60',
  'FILLING FAST': 'bg-flames/20 text-[#ff8b9b]',
  TONIGHT: 'bg-gold/20 text-gold',
  TOMORROW: 'bg-gold/15 text-gold/90',
  'THIS WEEKEND': 'bg-white/10 text-white/70',
};

export function Badge({ label, className = '' }) {
  if (!label) return null;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${
        BADGE_TONE[label] ?? 'bg-gold/20 text-gold'
      } ${className}`}
    >
      {label}
    </span>
  );
}

/** Seat counter that turns urgent below ten. */
export function SeatsLeft({ count, tone = 'dark' }) {
  const urgent = count <= 10;
  const soldOut = count <= 0;
  const base = tone === 'dark' ? 'text-white/50' : 'text-ink/50';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider ${
        soldOut ? 'text-white/40' : urgent ? 'text-flames' : base
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${
          soldOut ? 'bg-white/30' : urgent ? 'animate-pulse bg-flames' : 'bg-gold'
        }`}
      />
      {soldOut ? 'Sold out' : `${count} seats left`}
    </span>
  );
}

export function Eyebrow({ children }) {
  return <span className="eyebrow mb-4">{children}</span>;
}

/** Standard page header for every interior route. */
export function PageHeader({ eyebrow, title, lead, children }) {
  return (
    <header className="border-b border-white/5 bg-ink pb-14 pt-32 lg:pb-20 lg:pt-40">
      <div className="shell">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="max-w-4xl font-display text-4xl font-semibold tracking-tight text-white lg:text-6xl">
          {title}
        </h1>
        {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/50">{lead}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}

export function Section({ id, tone = 'dark', className = '', children }) {
  const tones = {
    dark: 'bg-ink text-white',
    card: 'bg-ink-card text-white',
    cream: 'bg-cream text-ink',
  };
  return (
    <section id={id} className={`py-20 lg:py-28 ${tones[tone]} ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

/** Inline status message used by every form on the site. */
export function FormMessage({ tone = 'error', children }) {
  if (!children) return null;
  const tones = {
    error: 'border-flames/40 bg-flames/10 text-[#ff9aa8]',
    success: 'border-gold/40 bg-gold/10 text-gold',
    info: 'border-white/15 bg-white/5 text-white/70',
  };
  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className={`rounded-2xl border px-4 py-3 text-sm ${tones[tone]}`}
    >
      {children}
    </p>
  );
}

/**
 * Honest empty state. Used instead of routing a visitor to a dead "#" link the
 * way the original site did for a third of its navigation.
 */
export function ComingSoon({ title, body, cta = true }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] px-8 py-16 text-center">
      <h2 className="font-display text-2xl font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-4 max-w-md leading-relaxed text-white/50">{body}</p>
      {cta && (
        <Link to="/contact" className="btn-gold mt-8">
          Get in touch
        </Link>
      )}
    </div>
  );
}
