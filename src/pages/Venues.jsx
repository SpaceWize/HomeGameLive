import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { getVenues } from '../lib/events';
import { useEvents } from '../lib/useEvents';
import { PageHeader, VenueVisual } from '../components/Primitives';

export default function Venues() {
  const venues = getVenues();
  const { upcoming } = useEvents();

  const countFor = (slug) => upcoming.filter((e) => e.venue === slug).length;

  return (
    <>
      <PageHeader
        eyebrow="The Rooms"
        title="Venues worth being seen at"
        lead="We're selective. Every partner venue is chosen for its screens, its sound, its kitchen, and the way it feels when the game is close."
      />

      <section className="bg-ink py-16 lg:py-24">
        <div className="shell">
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {venues.map((venue) => {
              const count = countFor(venue.slug);
              return (
                <Link
                  key={venue.slug}
                  to={`/venues/${venue.slug}`}
                  className="group overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] transition-colors hover:border-accent/25"
                >
                  <VenueVisual venue={venue} className="flex h-44 items-end p-6">
                    {venue.featured && (
                      <span className="absolute right-5 top-5 rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">
                        Featured
                      </span>
                    )}
                    <p className="relative flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/70">
                      <MapPin size={12} /> {venue.city}, {venue.region}
                    </p>
                  </VenueVisual>

                  <div className="p-6">
                    <h2 className="font-display text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-accent">
                      {venue.name}
                    </h2>
                    <p className="mt-2 text-sm text-white/40">{venue.tagline}</p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/35">
                        {count > 0 ? `${count} upcoming` : 'No games listed'}
                      </span>
                      <ArrowRight
                        size={15}
                        className="text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-accent"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
