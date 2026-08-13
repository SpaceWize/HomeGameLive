import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, TrendingUp, Users, Wallet } from 'lucide-react';
import { saveInquiry } from '../lib/forms';
import { validateEmail } from '../lib/auth.jsx';
import { FormMessage, PageHeader } from '../components/Primitives';

const BENEFITS = [
  {
    icon: Users,
    title: 'Fill your slow nights',
    body: 'We book watch parties on the nights your room has capacity, and bring a crowd that already plans to stay for the full game.',
  },
  {
    icon: Wallet,
    title: 'No listing fees',
    body: 'Partnering costs nothing up front. We make money when your seats fill, which means our incentives match yours.',
  },
  {
    icon: TrendingUp,
    title: 'Regulars, not one-offs',
    body: 'Guests who find you through a game night come back on their own. Most partner venues see repeat visits within a month.',
  },
];

const STEPS = [
  'Tell us about your room — screens, capacity, and the nights you want filled.',
  'We visit, confirm the fit, and agree which fixtures make sense for your crowd.',
  'We list the night, handle reservations, and promote it to our members.',
  'You run the room. We send you the headcount in advance so the kitchen is ready.',
];

export default function Partners() {
  const [form, setForm] = useState({ venue: '', name: '', email: '', city: '', message: '' });
  const [status, setStatus] = useState(null);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.venue.trim() || !form.name.trim())
      return setStatus({ tone: 'error', message: 'Please include your name and venue name.' });

    const emailError = validateEmail(form.email);
    if (emailError) return setStatus({ tone: 'error', message: emailError });

    const result = saveInquiry('partner-application', form);
    if (result.error) return setStatus({ tone: 'error', message: result.error });

    setForm({ venue: '', name: '', email: '', city: '', message: '' });
    setStatus({
      tone: 'success',
      message: `Thanks ${result.record.name.split(' ')[0]} — your application is saved.`,
    });
  };

  const inputClass =
    'w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-accent/50 focus:bg-white/10';

  return (
    <>
      <PageHeader
        eyebrow="For Venues"
        title="Own a great venue?"
        lead="Partner with Front Row to fill seats during sports watch parties, attract new customers, and create game-day experiences that keep them coming back."
      >
        <a href="#apply" className="btn-accent">
          Apply to partner <ArrowRight size={16} />
        </a>
      </PageHeader>

      <section id="benefits" className="bg-ink py-16 lg:py-24">
        <div className="shell">
          <h2 className="mb-12 font-display text-3xl font-semibold tracking-tight text-white lg:text-4xl">
            Venue benefits
          </h2>

          <div className="grid gap-6 lg:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-7"
              >
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

      <section className="bg-surface py-16 lg:py-24">
        <div className="shell">
          <h2 className="mb-12 font-display text-3xl font-semibold tracking-tight text-white lg:text-4xl">
            How partnering works
          </h2>
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step} className="rounded-3xl border border-white/[0.06] p-6">
                <span className="font-display text-3xl font-semibold text-accent/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-white/55">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="apply" className="bg-ink py-16 lg:py-24">
        <div className="shell max-w-2xl">
          <div className="mb-10 text-center">
            <span className="eyebrow mb-4">List Your Venue</span>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white lg:text-4xl">
              Put your room forward
            </h2>
            <p className="mt-4 leading-relaxed text-white/45">
              Tell us about your venue and we'll be in touch about the nights that fit.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="venue" className="mb-2 block text-xs font-medium text-white/60">
                  Venue name
                </label>
                <input
                  id="venue"
                  value={form.venue}
                  onChange={update('venue')}
                  placeholder="The Corner Tap"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="city" className="mb-2 block text-xs font-medium text-white/60">
                  City
                </label>
                <input
                  id="city"
                  value={form.city}
                  onChange={update('city')}
                  placeholder="Northgate, Rivermouth"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="pname" className="mb-2 block text-xs font-medium text-white/60">
                  Your name
                </label>
                <input
                  id="pname"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Alex Morgan"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="pemail" className="mb-2 block text-xs font-medium text-white/60">
                  Email
                </label>
                <input
                  id="pemail"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@venue.ca"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="pmessage" className="mb-2 block text-xs font-medium text-white/60">
                Tell us about the room
              </label>
              <textarea
                id="pmessage"
                rows={4}
                value={form.message}
                onChange={update('message')}
                placeholder="Screens, capacity, which nights you'd like to fill…"
                className={`${inputClass} resize-none`}
              />
            </div>

            {status && (
              <FormMessage tone={status.tone}>
                <span className="flex items-start gap-2">
                  {status.tone === 'success' && (
                    <Check size={16} className="mt-0.5 flex-shrink-0" />
                  )}
                  <span>
                    {status.message}
                    {status.tone === 'success' && (
                      <span className="mt-1 block text-xs text-white/40">
                        Saved in this browser only — nothing was sent anywhere.
                      </span>
                    )}
                  </span>
                </span>
              </FormMessage>
            )}

            <button type="submit" className="btn-accent w-full">
              Submit application <ArrowRight size={16} />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-white/35">
            Already a partner?{' '}
            <Link to="/signin?role=partner" className="text-accent hover:underline">
              Partner sign in
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
