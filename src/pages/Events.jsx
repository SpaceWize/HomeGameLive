import { useMemo, useState } from 'react';
import { useEvents } from '../lib/useEvents';
import { formatDayLabel } from '../lib/events';
import { PageHeader } from '../components/Primitives';
import EventRow from '../components/EventRow';

export default function Events() {
  const { upcoming, loading } = useEvents();
  const [league, setLeague] = useState('All');
  const [city, setCity] = useState('All');

  const leagues = useMemo(
    () => ['All', ...new Set(upcoming.map((e) => e.league))].sort((a, b) => (a === 'All' ? -1 : 0)),
    [upcoming]
  );
  const cities = useMemo(
    () => ['All', ...new Set(upcoming.map((e) => e.city))].sort((a, b) => (a === 'All' ? -1 : 0)),
    [upcoming]
  );

  const filtered = upcoming.filter(
    (e) => (league === 'All' || e.league === league) && (city === 'All' || e.city === city)
  );

  // Group by calendar day so the list reads like a schedule, not a dump.
  const grouped = filtered.reduce((acc, event) => {
    const key = formatDayLabel(event.startsAt);
    (acc[key] ||= []).push(event);
    return acc;
  }, {});

  const Filter = ({ label, options, value, onChange }) => (
    <div>
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={value === option}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              value === option
                ? 'bg-gold text-ink'
                : 'border border-white/12 text-white/55 hover:border-white/30 hover:text-white'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <PageHeader
        eyebrow="The Schedule"
        title="All upcoming game nights"
        lead="Every watch party we're hosting, soonest first. Pick a game, pick a seat, show up."
      >
        {!loading && upcoming.length > 0 && (
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
            <Filter label="League" options={leagues} value={league} onChange={setLeague} />
            <Filter label="City" options={cities} value={city} onChange={setCity} />
          </div>
        )}
      </PageHeader>

      <section className="bg-cream py-16 lg:py-24">
        <div className="shell">
          {loading ? (
            <div className="space-y-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-2xl bg-ink/5" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl border border-ink/10 px-8 py-20 text-center">
              <h2 className="font-display text-xl font-semibold text-ink">
                Nothing matches that combination
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-sm text-ink/50">
                Try a different league or city — or clear the filters to see everything on the
                calendar.
              </p>
              <button
                type="button"
                onClick={() => {
                  setLeague('All');
                  setCity('All');
                }}
                className="btn mt-7 bg-ink px-6 py-3 text-white hover:bg-ink/80"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(grouped).map(([day, dayEvents]) => (
                <div key={day}>
                  <h2 className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-ink/40">
                    {day}
                  </h2>
                  <div>
                    {dayEvents.map((event) => (
                      <EventRow key={event.id} event={event} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <p className="mt-12 text-center font-mono text-xs uppercase tracking-[0.14em] text-ink/35">
              Showing {filtered.length} of {upcoming.length} upcoming nights
            </p>
          )}
        </div>
      </section>
    </>
  );
}
