import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Check, Clock, MapPin, Users } from 'lucide-react';
import { useEvents } from '../lib/useEvents';
import { formatLongDate, formatTime } from '../lib/events';
import { Badge, SeatsLeft, TeamCrest } from '../components/Primitives';
import ReserveButton from '../components/ReserveButton';
import NotFound from './NotFound';

export default function EventDetail() {
  const { slug } = useParams();
  const { all, upcoming, loading } = useEvents();

  if (loading) {
    return <div className="min-h-screen bg-ink pt-32" aria-busy="true" />;
  }

  const event = all.find((e) => e.slug === slug);
  if (!event) return <NotFound />;

  const alsoAtVenue = upcoming.filter((e) => e.venue === event.venue && e.id !== event.id).slice(0, 3);

  return (
    <>
      <header className="border-b border-white/5 bg-ink pb-16 pt-32 lg:pt-40">
        <div className="shell">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-white/40 transition-colors hover:text-gold"
          >
            <ArrowLeft size={14} /> All events
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <Badge label={event.badge} />
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/40">
                  {event.league} Watch Party
                </span>
              </div>

              <h1 className="font-display text-4xl font-semibold tracking-tight text-white lg:text-6xl">
                {event.title}
              </h1>

              {event.blurb && (
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/50">{event.blurb}</p>
              )}

              <div className="mt-10 flex items-center gap-8">
                <div className="flex flex-col items-center gap-3">
                  <TeamCrest team={event.home} size="lg" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                    {event.home.name}
                  </span>
                </div>
                <span className="pb-8 font-serif text-2xl italic text-white/30">vs</span>
                <div className="flex flex-col items-center gap-3">
                  <TeamCrest team={event.away} size="lg" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                    {event.away.name}
                  </span>
                </div>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/[0.07] bg-ink-card p-7">
              <dl className="space-y-5">
                <div className="flex items-start gap-3">
                  <Calendar size={17} className="mt-0.5 flex-shrink-0 text-gold" />
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                      Date
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-white">
                      {formatLongDate(event.startsAt)}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={17} className="mt-0.5 flex-shrink-0 text-gold" />
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                      Start time
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-white">
                      {formatTime(event.startsAt)}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 flex-shrink-0 text-gold" />
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                      Venue
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-white">
                      <Link to={`/venues/${event.venue}`} className="hover:text-gold">
                        {event.venueName}
                      </Link>
                      <span className="mt-0.5 block text-xs font-normal text-white/40">
                        {event.city}
                      </span>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users size={17} className="mt-0.5 flex-shrink-0 text-gold" />
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                      Availability
                    </dt>
                    <dd className="mt-1.5">
                      <SeatsLeft count={event.seatsLeft} />
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-7 border-t border-white/5 pt-6">
                <ReserveButton event={event} variant="gold" className="w-full !py-4" />
                <p className="mt-3 text-center text-[11px] text-white/30">
                  Free to reserve · Cancel anytime from your account
                </p>
              </div>
            </aside>
          </div>
        </div>
      </header>

      {alsoAtVenue.length > 0 && (
        <section className="bg-ink py-16 lg:py-24">
          <div className="shell">
            <h2 className="mb-8 font-display text-2xl font-semibold tracking-tight text-white">
              Also at {event.venueName}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {alsoAtVenue.map((other) => (
                <Link
                  key={other.id}
                  to={`/events/${other.slug}`}
                  className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:border-gold/25 hover:bg-white/[0.04]"
                >
                  <Badge label={other.badge} />
                  <h3 className="mt-3 font-display text-lg font-semibold text-white">
                    {other.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-white/40">
                    {formatLongDate(other.startsAt)} · {formatTime(other.startsAt)}
                  </p>
                  <div className="mt-4">
                    <SeatsLeft count={other.seatsLeft} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
