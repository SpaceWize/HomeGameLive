import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/Primitives';
import { getVenues } from '../lib/events';
import { contact } from '../config';

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
        title="A short list, kept short on purpose."
        lead="Front Row exists because the hard part was never finding a bar showing the match. It was finding one where watching it was any good."
      />

      <section className="bg-ink py-16 lg:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6 text-lg leading-relaxed text-white/55">
            <p>
              Most rooms advertise the fixture and leave it there. You arrive to find the screen
              angled away from half the seats, the commentary muted under a playlist, and a kitchen
              that closed at the interval.
            </p>
            <p>
              So we go and sit in them first. We check the sightlines from the bad seats, not the
              good ones, and we ask the operator what they can actually commit to on a busy night.
              The ones that hold up get listed. Most do not.
            </p>
            <p>
              What is left is a deliberately small set of fixtures at rooms we would pick ourselves,
              with a seat held for you before you leave the house.
            </p>
          </div>

          <aside className="space-y-4">
            {[
              ['2,000+', 'seats reserved so far this season'],
              [`${venues.length}`, `partner venues across ${contact.serviceArea}`],
              ['1 in 5', 'rooms we visit make the list'],
            ].map(([stat, label]) => (
              <div key={label} className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7">
                <p className="font-display text-4xl font-semibold text-accent">{stat}</p>
                <p className="mt-2 text-sm text-white/45">{label}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-24">
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
            <Link to="/events" className="btn-accent">
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
