import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { getVenues } from '../lib/events';
import { useEvents } from '../lib/useEvents';
import { PageHeader } from '../components/Primitives';

export default function Cities() {
  const { upcoming } = useEvents();
  const venues = getVenues();

  // Roll venues and their upcoming games up by city.
  const cities = venues.reduce((acc, venue) => {
    const key = `${venue.city}, ${venue.region}`;
    acc[key] ||= { name: venue.city, region: venue.region, venues: [], events: 0 };
    acc[key].venues.push(venue);
    acc[key].events += upcoming.filter((e) => e.venue === venue.slug).length;
    return acc;
  }, {});

  const ordered = Object.values(cities).sort((a, b) => b.events - a.events);

  return (
    <>
      <PageHeader
        eyebrow="Where We Are"
        title="Cities we host in"
        lead="Front Row runs across Greater Rivermouth. Pick your neighbourhood and find the room closest to you."
      />

      <section className="bg-ink py-16 lg:py-24">
        <div className="shell">
          <div className="grid gap-6 md:grid-cols-2">
            {ordered.map((city) => (
              <div
                key={city.name}
                className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-white">
                      <MapPin size={18} className="text-accent" />
                      {city.name}
                    </h2>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/35">
                      {city.venues.length} venue{city.venues.length === 1 ? '' : 's'} ·{' '}
                      {city.events} upcoming night{city.events === 1 ? '' : 's'}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-2.5 border-t border-white/5 pt-5">
                  {city.venues.map((venue) => (
                    <li key={venue.slug}>
                      <Link
                        to={`/venues/${venue.slug}`}
                        className="group flex items-center justify-between gap-3 text-sm text-white/55 transition-colors hover:text-white"
                      >
                        <span>
                          {venue.name}
                          <span className="ml-2 text-xs text-white/25">{venue.neighbourhood}</span>
                        </span>
                        <ArrowRight
                          size={14}
                          className="flex-shrink-0 text-white/20 transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-white/10 px-8 py-12 text-center">
            <h2 className="font-display text-2xl font-semibold text-white">
              Not in your city yet?
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-white/45">
              We expand where the venues are worth it. Tell us where you'd like a game night — or
              put your own room forward.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/partners" className="btn-accent">
                List your venue
              </Link>
              <Link to="/contact" className="btn-ghost">
                Suggest a city
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
