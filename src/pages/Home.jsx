import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  Gift,
  MapPin,
  Play,
  Tv,
  Users,
  UtensilsCrossed,
} from 'lucide-react';
import { useEvents } from '../lib/useEvents';
import { formatLongDate, formatShortDate, formatTime, formatWeekRange, getVenues } from '../lib/events';
import { Badge, SeatsLeft, TeamCrest } from '../components/Primitives';
import EventRow from '../components/EventRow';
import ReserveButton from '../components/ReserveButton';
import Newsletter from '../components/Newsletter';

const WHY = [
  {
    icon: Tv,
    title: 'Great Venues',
    body: 'We carefully select venues with the right atmosphere, screens, and energy for every game night.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Special Food & Drinks',
    body: 'Exclusive menus and game-day specials crafted for the occasion by each venue.',
  },
  {
    icon: Gift,
    title: 'Win Prizes',
    body: 'Gift cards, giveaways, and weekly rewards add excitement to every event.',
  },
  {
    icon: Users,
    title: 'Great People',
    body: 'Meet new people or enjoy the night with friends — community is the whole point.',
  },
];

/** The "Next Up" card. Reads the soonest real event rather than hardcoded text. */
function NextUpCard({ event, following }) {
  if (!event) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-ink-card p-8 text-center">
        <p className="text-sm text-white/50">No games scheduled right now.</p>
        <Link to="/events" className="btn-ghost mt-5 !py-3 !text-xs">
          See the full calendar
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/[0.06] bg-ink-card/95 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 pt-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Next Up
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-bright" />
          {event.badge ?? 'Upcoming'}
        </span>
      </div>

      <div className="m-3 rounded-[1.5rem] border border-white/[0.04] bg-ink p-5">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex flex-col items-center gap-2">
            <TeamCrest team={event.home} />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
              {event.home.name}
            </span>
          </div>
          <span className="pb-6 font-serif text-base italic text-white/40">vs</span>
          <div className="flex flex-col items-center gap-2">
            <TeamCrest team={event.away} />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
              {event.away.name}
            </span>
          </div>
        </div>

        <div className="space-y-2 border-t border-white/5 pt-4 text-center">
          <p className="text-sm font-medium text-white">{formatLongDate(event.startsAt)}</p>
          <p className="font-display text-2xl font-semibold text-gold">
            {formatTime(event.startsAt)}
          </p>
          <p className="text-xs text-white/40">
            {event.venueName} · {event.city}
          </p>
          <div className="flex justify-center pt-1">
            <SeatsLeft count={event.seatsLeft} />
          </div>
        </div>

        <div className="mt-5">
          <ReserveButton event={event} variant="gold" className="w-full !py-3.5" />
        </div>
      </div>

      {following && (
        <Link
          to={`/events/${following.slug}`}
          className="flex items-center gap-3 border-t border-white/5 px-6 py-4 transition-colors hover:bg-white/[0.03]"
        >
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
              Coming Soon
            </p>
            <p className="mt-1 truncate text-sm font-medium text-white">{following.title}</p>
            <p className="mt-0.5 text-xs text-white/40">
              {formatShortDate(following.startsAt)} · {formatTime(following.startsAt)}
            </p>
          </div>
          <ArrowUpRight size={16} className="flex-shrink-0 text-white/30" />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const { thisWeek, upcoming, next, loading } = useEvents();
  const featuredVenue = getVenues().find((v) => v.featured) ?? getVenues()[0];
  const schedule = thisWeek.length ? thisWeek : upcoming.slice(0, 7);

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden bg-ink pb-20 pt-32 lg:pb-28 lg:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-gold/[0.07] blur-[160px]"
        />

        <div className="shell relative z-10 flex flex-col items-center gap-16 lg:flex-row lg:items-center">
          <div className="w-full lg:w-[58%]">
            <span className="eyebrow mb-6">Reserve · Watch · Cheer · Repeat</span>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white lg:text-7xl">
              Great nights start around the same table.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/50">
              Home Game Live partners with exceptional venues to host unforgettable sports watch
              parties — the games, the atmosphere, and the seats you'll actually want.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/events" className="btn-gold">
                Reserve Your Seat <ArrowRight size={17} />
              </Link>
              <Link to="/how-it-works" className="btn-ghost">
                <Play size={15} /> How It Works
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-ink bg-gold/20"
                  />
                ))}
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-gold text-xs font-bold text-ink">
                  500+
                </span>
              </div>
              <p className="text-sm text-white/40">
                <span className="font-medium text-white/70">500+ players</span> have joined game
                nights.
              </p>
            </div>
          </div>

          <div className="flex w-full justify-center lg:w-[42%]">
            <div className="relative w-full max-w-sm">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-gold/15 via-transparent to-transparent blur-2xl"
              />
              <div className="relative">
                {loading ? (
                  <div className="h-[520px] w-full max-w-sm animate-pulse rounded-[2rem] border border-white/[0.06] bg-ink-card" />
                ) : (
                  <NextUpCard event={next} following={upcoming[1]} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- schedule */}
      <section id="games" className="bg-cream py-20 lg:py-28">
        <div className="shell">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-4 block font-mono text-xs uppercase tracking-[0.2em] text-gold">
                The Schedule
              </span>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
                This Week's Games
              </h2>
            </div>
            <p className="font-mono text-sm uppercase tracking-[0.14em] text-ink/40">
              {formatWeekRange()}
            </p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-2xl bg-ink/5" />
              ))}
            </div>
          ) : schedule.length ? (
            <div>
              {schedule.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-ink/10 px-8 py-16 text-center">
              <p className="text-ink/60">
                No games on the calendar this week. New nights are added every Monday.
              </p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.14em] text-ink transition-colors hover:text-gold"
            >
              View all upcoming events <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- why */}
      <section id="why" className="bg-ink py-20 lg:py-28">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow mb-4">The Difference</span>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white lg:text-5xl">
              Why Home Game Live
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/50">
              We don't list events. We curate nights worth showing up for — at venues worth being
              seen at.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-7 transition-colors duration-300 hover:border-gold/25 hover:bg-white/[0.04]"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                  <Icon size={22} />
                </span>
                <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- venue */}
      <section id="venue" className="bg-ink-card py-20 lg:py-28">
        <div className="shell">
          <div className="mb-12 text-center">
            <span className="eyebrow mb-4">The Venue</span>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white lg:text-5xl">
              Highlighted Venue
            </h2>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div
              className={`relative flex min-h-[380px] items-end overflow-hidden rounded-[2rem] bg-gradient-to-br ${featuredVenue.gradient} p-8`}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(232,176,74,0.18),transparent_60%)]"
              />
              <div className="relative">
                <span className="inline-flex items-center rounded-full bg-gold px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                  Featured Partner
                </span>
                <p className="mt-4 flex items-center gap-1.5 text-sm text-white/60">
                  <MapPin size={13} /> {featuredVenue.city}, {featuredVenue.region}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-display text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                {featuredVenue.name}
              </h3>
              <p className="mt-5 leading-relaxed text-white/50">{featuredVenue.blurb}</p>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {Object.entries(featuredVenue.ratings).map(([label, score]) => (
                  <div key={label} className="rounded-2xl border border-white/[0.06] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
                      {label}
                    </p>
                    <p className="mt-2 font-display text-lg font-semibold text-gold">{score}/5</p>
                  </div>
                ))}
              </div>

              <ul className="mt-8 space-y-3">
                {featuredVenue.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-white/60">
                    <Check size={16} className="mt-0.5 flex-shrink-0 text-gold" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to={`/venues/${featuredVenue.slug}`} className="btn-gold">
                  Learn About {featuredVenue.shortName} <ArrowRight size={16} />
                </Link>
                <Link to="/venues" className="btn-ghost">
                  See All Venues
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- partner */}
      <section id="partner" className="bg-ink py-20 lg:py-28">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.06] px-8 py-16 text-center lg:px-16 lg:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(232,176,74,0.12),transparent_65%)]"
            />
            <div className="relative mx-auto max-w-2xl">
              <span className="eyebrow mb-4">For Venues</span>
              <h2 className="font-display text-4xl font-semibold tracking-tight text-white lg:text-5xl">
                Own a great venue?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/50">
                Partner with Home Game Live to fill seats during sports watch parties, attract new
                customers, and create game-day experiences that keep them coming back.
              </p>
              <Link to="/partners" className="btn-gold mt-9">
                Become a Venue Partner <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
