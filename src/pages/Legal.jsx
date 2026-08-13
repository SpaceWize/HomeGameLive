import { Link } from 'react-router-dom';
import { PageHeader } from '../components/Primitives';
import { site } from '../data/site';

const UPDATED = 'August 2026';

function Prose({ children }) {
  return (
    <section className="bg-ink py-16 lg:py-24">
      <div className="shell max-w-3xl">
        <div className="space-y-10 text-white/55 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:leading-relaxed [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
        <p className="mt-14 border-t border-white/5 pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-white/30">
          Last updated {UPDATED}
        </p>
      </div>
    </section>
  );
}

export function Privacy() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy"
        lead="The short version: this site does not collect your data. Everything you enter stays in your own browser."
      />

      <Prose>
        <div>
          <h2>What we store</h2>
          <p className="mt-3">
            When you create an account, reserve a seat, join the mailing list, or send us a message,
            that information is written to your browser's local storage on your own device. It is
            not transmitted to us, and we have no server that receives it.
          </p>
        </div>

        <div>
          <h2>What that means in practice</h2>
          <ul className="mt-3">
            <li>We cannot see your email address, your name, or which games you reserved.</li>
            <li>
              Your data does not sync between devices or browsers — a reservation made on your phone
              will not appear on your laptop.
            </li>
            <li>
              Clearing your browser data, or using private browsing, permanently removes your
              account and reservations.
            </li>
            <li>
              Your password is combined with a random salt and hashed with SHA-256 before being
              stored, so the plain password is never written to disk.
            </li>
          </ul>
        </div>

        <div>
          <h2>Cookies and tracking</h2>
          <p className="mt-3">
            This site sets no cookies, runs no analytics, embeds no advertising or social tracking
            pixels, and makes no requests to third-party services. Fonts are served from this site
            rather than a font CDN, so no external party sees your visit.
          </p>
        </div>

        <div>
          <h2>If that changes</h2>
          <p className="mt-3">
            Should Front Row later add real accounts, payments, or an email service, this page
            will be updated before that happens and will name each processor involved and what it
            receives.
          </p>
        </div>

        <div>
          <h2>Questions</h2>
          <p className="mt-3">
            Email{' '}
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">
              {site.email}
            </a>{' '}
            or use the{' '}
            <Link to="/contact" className="text-accent hover:underline">
              contact form
            </Link>
            .
          </p>
        </div>
      </Prose>
    </>
  );
}

export function Terms() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of service"
        lead="The rules for using Front Row and reserving seats at partner venues."
      />

      <Prose>
        <div>
          <h2>Using this site</h2>
          <p className="mt-3">
            Front Row lists sports watch parties hosted at independent partner venues and lets
            you reserve a seat at them. Using the site means you agree to these terms.
          </p>
        </div>

        <div>
          <h2>Reservations</h2>
          <ul className="mt-3">
            <li>Reserving a seat is free and does not include food, drink, or a cover charge.</li>
            <li>
              A reservation holds a seat at the venue for the listed event. Please cancel from your
              account if your plans change, so the seat can go to someone else.
            </li>
            <li>
              Repeatedly reserving seats and not attending may result in your account losing booking
              access.
            </li>
            <li>
              Seat counts reflect the allocation a venue has given us and can change if a venue
              adjusts its capacity.
            </li>
          </ul>
        </div>

        <div>
          <h2>Venues</h2>
          <p className="mt-3">
            Partner venues are independent businesses. They set their own menus, pricing, house
            rules, and minimum age requirements, and they are responsible for service on the night.
            Events may be rescheduled or cancelled if a broadcast changes or a venue cannot host.
          </p>
        </div>

        <div>
          <h2>Accounts</h2>
          <p className="mt-3">
            You are responsible for the accuracy of the details on your account. Because accounts on
            this build are stored locally in your browser, we cannot recover an account or reset a
            password on your behalf — see the{' '}
            <Link to="/privacy" className="text-accent hover:underline">
              privacy page
            </Link>{' '}
            for detail.
          </p>
        </div>

        <div>
          <h2>Liability</h2>
          <p className="mt-3">
            Front Row provides listings and reservations. We are not liable for the food,
            drink, service, or conduct at a partner venue, or for a broadcast being changed,
            delayed, or unavailable.
          </p>
        </div>

        <div>
          <h2>Contact</h2>
          <p className="mt-3">
            Questions about these terms:{' '}
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </Prose>
    </>
  );
}
