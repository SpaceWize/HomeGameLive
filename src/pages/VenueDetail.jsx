import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, MapPin } from 'lucide-react';
import { getVenue } from '../lib/events';
import { useEvents } from '../lib/useEvents';
import EventRow from '../components/EventRow';
import { VenueVisual } from '../components/Primitives';
import NotFound from './NotFound';

export default function VenueDetail() {
  const { slug } = useParams();
  const venue = getVenue(slug);
  const { upcoming } = useEvents();

  if (!venue) return <NotFound />;

  const events = upcoming.filter((e) => e.venue === slug);

  return (
    <>
      <header className="border-b border-white/5 bg-ink pb-16 pt-32 lg:pt-40">
        <div className="shell">
          <Link
            to="/venues"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-white/40 transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} /> All venues
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              {venue.featured && (
                <span className="mb-5 inline-flex rounded-full bg-accent px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink">
                  Featured Partner
                </span>
              )}
              <p className="mb-3 flex items-center gap-1.5 text-sm text-white/50">
                <MapPin size={14} className="text-accent" /> {venue.neighbourhood} · {venue.city},{' '}
                {venue.region}
              </p>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-white lg:text-6xl">
                {venue.name}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/50">{venue.blurb}</p>

              <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
                {Object.entries(venue.ratings).map(([label, score]) => (
                  <div key={label} className="rounded-2xl border border-white/[0.06] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
                      {label}
                    </p>
                    <p className="mt-2 font-display text-lg font-semibold text-accent">{score}/5</p>
                  </div>
                ))}
              </div>
            </div>

            <VenueVisual
              venue={venue}
              priority
              className="flex min-h-[340px] items-end rounded-[2rem] p-8"
            >
              <div className="relative">
                <p className="font-serif text-2xl italic leading-snug text-white/80">
                  “{venue.tagline}”
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
                  {venue.capacityNote}
                </p>
              </div>
            </VenueVisual>
          </div>

          <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {venue.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 text-sm text-white/60"
              >
                <Check size={16} className="mt-0.5 flex-shrink-0 text-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section className="bg-paper py-16 lg:py-24">
        <div className="shell">
          <h2 className="mb-10 font-display text-3xl font-semibold tracking-tight text-ink">
            Upcoming at {venue.name}
          </h2>

          {events.length ? (
            <div>
              {events.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-ink/10 px-8 py-16 text-center">
              <p className="text-ink/60">
                No watch parties scheduled here right now. New nights are added every Monday.
              </p>
              <Link to="/events" className="btn mt-7 bg-ink px-6 py-3 text-white hover:bg-ink/80">
                See what's on elsewhere
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
