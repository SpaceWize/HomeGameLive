import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/Primitives';
import { getVenues } from '../lib/events';

const VALUES = [
  {
    title: 'Curation over volume',
    body: "We turn down more venues than we take on. A night is only worth promoting if we'd want to be there ourselves.",
  },
  {
    title: 'The room matters',
    body: 'Screens, sound, sightlines, and whether the kitchen is still open at the final whistle. We check all of it before we list anything.',
  },
  {
    title: 'Show up for the venue',
    body: "Our partners are independent operators. Filling a Tuesday for them matters more than another logo on a directory.",
  },
];

export default function About() {
  const venues = getVenues();

  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="We don't list events. We curate nights."
        lead="Home Game Live started from a simple frustration: finding somewhere good to watch the game was harder than it should be, and the places worth going were the hardest to find."
      />

      <section className="bg-ink py-16 lg:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6 text-lg leading-relaxed text-white/55">
            <p>
              Every sports bar claims to be the place to watch the game. Most aren't. The screen is
              in the wrong corner, the sound is off, the kitchen closed an hour ago, and nobody
              around you actually cares who wins.
            </p>
            <p>
              We started Home Game Live to fix the matching problem. We find rooms across Metro
              Vancouver that genuinely deliver on game day, work with them on the fixtures that suit
              their crowd, and make sure there's a seat waiting when you arrive.
            </p>
            <p>
              The result is a small, deliberately short list of nights we'd personally show up to —
              and a growing group of people who keep coming back to them.
            </p>
          </div>

          <aside className="space-y-4">
            {[
              ['500+', 'players have joined game nights'],
              [`${venues.length}`, 'partner venues across Metro Vancouver'],
              ['1', 'night a week worth clearing your calendar for'],
            ].map(([stat, label]) => (
              <div key={label} className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7">
                <p className="font-display text-4xl font-semibold text-gold">{stat}</p>
                <p className="mt-2 text-sm text-white/45">{label}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="bg-ink-card py-16 lg:py-24">
        <div className="shell">
          <h2 className="mb-12 font-display text-3xl font-semibold tracking-tight text-white lg:text-4xl">
            What we care about
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-3xl border border-white/[0.06] p-7">
                <h3 className="font-display text-lg font-semibold text-white">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{value.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-3 sm:flex-row">
            <Link to="/events" className="btn-gold">
              See this week's nights <ArrowRight size={16} />
            </Link>
            <Link to="/partners" className="btn-ghost">
              Partner with us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
