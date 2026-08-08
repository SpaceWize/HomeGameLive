import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/Primitives';
import { site } from '../data/site';

/* ------------------------------------------------------------- careers -- */

const ROLES = [
  {
    title: 'Venue Partnerships Lead',
    type: 'Full time · Metro Vancouver',
    body: 'Find and sign the rooms worth listing. You know the hospitality scene and can tell a great game-day venue from a merely busy one.',
  },
  {
    title: 'Community Host',
    type: 'Part time · Evenings & weekends',
    body: 'Be on the ground at game nights. Greet members, work with venue staff, and make sure the room actually feels like an event.',
  },
];

export function Careers() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Work on nights worth showing up to"
        lead="We're a small team building something local. If you know Metro Vancouver hospitality and care about doing it properly, we'd like to hear from you."
      />

      <section className="bg-ink py-16 lg:py-24">
        <div className="shell max-w-3xl">
          <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.18em] text-gold">Open roles</h2>

          <ul className="space-y-4">
            {ROLES.map((role) => (
              <li
                key={role.title}
                className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7"
              >
                <h3 className="font-display text-xl font-semibold text-white">{role.title}</h3>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
                  {role.type}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/45">{role.body}</p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline"
                >
                  Apply for this role <ArrowRight size={14} />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-3xl border border-white/10 px-8 py-10 text-center">
            <h2 className="font-display text-xl font-semibold text-white">
              Nothing that fits, but you love this?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/45">
              Send us a note anyway. We keep good people in mind for when the next role opens.
            </p>
            <Link to="/contact" className="btn-gold mt-7">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* --------------------------------------------------------------- press --- */

export function Press() {
  return (
    <>
      <PageHeader
        eyebrow="Press"
        title="Press & media"
        lead="Writing about Home Game Live, Metro Vancouver hospitality, or how independent venues are filling their slow nights? We're happy to talk."
      />

      <section className="bg-ink py-16 lg:py-24">
        <div className="shell max-w-3xl space-y-6">
          <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8">
            <h2 className="font-display text-xl font-semibold text-white">Media enquiries</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/45">
              For interviews, venue visits, or comment on the local hospitality scene, email{' '}
              <a href={`mailto:${site.email}`} className="text-gold hover:underline">
                {site.email}
              </a>{' '}
              and we'll come back to you within two business days.
            </p>
          </div>

          <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8">
            <h2 className="font-display text-xl font-semibold text-white">The short version</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/45">
              Home Game Live partners with exceptional venues across Metro Vancouver to host curated
              sports watch parties. Members reserve a seat for free; venues fill their room on nights
              that would otherwise be quiet. Over 500 people have joined a game night so far.
            </p>
          </div>

          <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8">
            <h2 className="font-display text-xl font-semibold text-white">Brand assets</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/45">
              Logos, wordmarks, and venue photography are available on request — just say what you
              need and the format you'd like it in.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold hover:underline"
            >
              Request assets <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------- help --- */

const HELP = [
  {
    heading: 'Reservations',
    items: [
      [
        'How do I reserve a seat?',
        'Open any game night, sign in, and press Reserve. Your seat is held immediately and appears on your account page.',
      ],
      [
        'How do I cancel?',
        'Go to your account page and press Cancel next to the reservation. The seat goes straight back into the pool.',
      ],
      [
        'Is there a charge?',
        'No. Reserving is free — you only pay the venue for what you order on the night.',
      ],
    ],
  },
  {
    heading: 'Accounts',
    items: [
      [
        'Where is my account stored?',
        'In this browser only. This build keeps accounts, reservations, and form submissions in local storage — nothing is sent to a server.',
      ],
      [
        'I lost my reservations',
        'Clearing browser data removes them, and they do not sync between devices or browsers. Sign in on the same browser you booked with.',
      ],
      [
        'I forgot my password',
        'Because accounts are local to your browser there is no reset email. Create a new account with the same email after clearing site data.',
      ],
    ],
  },
  {
    heading: 'Venues',
    items: [
      [
        'How do I list my venue?',
        'Fill in the partner application and we will get in touch about the nights that suit your room.',
      ],
      [
        'How are venues chosen?',
        'We visit every room before listing it and check screens, sound, sightlines, kitchen hours, and atmosphere.',
      ],
    ],
  },
];

export function Help() {
  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Help centre"
        lead="Short answers to the things people ask most. If yours isn't here, the contact form reaches a real person."
      />

      <section className="bg-ink py-16 lg:py-24">
        <div className="shell max-w-3xl space-y-14">
          {HELP.map((group) => (
            <div key={group.heading}>
              <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-gold">
                {group.heading}
              </h2>
              <dl className="divide-y divide-white/5 border-y border-white/5">
                {group.items.map(([question, answer]) => (
                  <div key={question} className="py-6">
                    <dt className="font-display text-base font-semibold text-white">{question}</dt>
                    <dd className="mt-2.5 text-sm leading-relaxed text-white/45">{answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <div className="rounded-3xl border border-white/10 px-8 py-10 text-center">
            <h2 className="font-display text-xl font-semibold text-white">Still stuck?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/45">
              Send us the details and we'll sort it out.
            </p>
            <Link to="/contact" className="btn-gold mt-7">
              Contact support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
