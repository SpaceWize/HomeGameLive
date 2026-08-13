import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, Gift, Tv, UserPlus, Users, UtensilsCrossed } from 'lucide-react';
import { PageHeader } from '../components/Primitives';

const STEPS = [
  {
    icon: CalendarCheck,
    title: 'Find a night',
    body: 'Browse the week ahead. Every listing shows the fixture, the venue, the start time, and exactly how many seats are still open.',
  },
  {
    icon: UserPlus,
    title: 'Reserve your seat',
    body: 'Create an account and hold your seat in one click. It costs nothing and you can cancel any time from your account.',
  },
  {
    icon: Users,
    title: 'Show up and settle in',
    body: "The venue knows you're coming and has the room set for the crowd. Find your seat, order, and watch the game.",
  },
];

const WHY = [
  {
    icon: Tv,
    title: 'Rooms that work',
    body: 'Screens where you can actually see them, sound you can hear over a full room, and sightlines that hold up once it fills.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Kitchens open late',
    body: 'Every venue commits to serving through to full time, with a short menu built for the fixture.',
  },
  {
    icon: Gift,
    title: 'Something to play for',
    body: 'Draws and small prizes that give the room a reason to look up between plays.',
  },
  {
    icon: Users,
    title: 'A seat, not a scrum',
    body: 'Reserving means you know there is somewhere to sit before you leave the house.',
  },
];

const FAQ = [
  [
    'Does it cost anything to reserve?',
    'No. Reserving a seat is free. You pay the venue for whatever you order on the night, the same as any other visit.',
  ],
  [
    'What if I can’t make it?',
    'Cancel from your account page any time and the seat goes back into the pool for someone else.',
  ],
  [
    'Can I bring friends?',
    'Yes — reserve a seat each so the venue has an accurate headcount. That headcount is what lets them staff the kitchen properly.',
  ],
  [
    'How do you pick the venues?',
    'We visit every room before listing it and check the things that actually matter on game day: screen placement, sound, sightlines, kitchen hours, and atmosphere.',
  ],
];

export default function HowItWorks() {
  return (
    <>
      <PageHeader
        eyebrow="How It Works"
        title="Three steps, then just turn up."
        lead="Reserving is free and takes one click. Here is what happens either side of it."
      />

      <section className="bg-ink py-16 lg:py-24">
        <div className="shell">
          <ol className="grid gap-6 lg:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7">
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon size={22} />
                  </span>
                  <span className="font-display text-3xl font-semibold text-white/10">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-24">
        <div className="shell">
          <h2 className="mb-12 font-display text-3xl font-semibold tracking-tight text-white lg:text-4xl">
            What makes a night worth it
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-3xl border border-white/[0.06] p-7">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Icon size={22} />
                </span>
                <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/45">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 lg:py-24">
        <div className="shell max-w-3xl">
          <h2 className="mb-10 font-display text-3xl font-semibold tracking-tight text-white lg:text-4xl">
            Common questions
          </h2>
          <dl className="divide-y divide-white/5 border-y border-white/5">
            {FAQ.map(([question, answer]) => (
              <div key={question} className="py-6">
                <dt className="font-display text-base font-semibold text-white">{question}</dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-white/45">{answer}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link to="/events" className="btn-accent">
              Find a game night <ArrowRight size={16} />
            </Link>
            <Link to="/help" className="btn-ghost">
              Visit the help centre
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
