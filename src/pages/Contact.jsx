import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Mail, MapPin, Phone } from 'lucide-react';
import { saveInquiry } from '../lib/forms';
import { validateEmail } from '../lib/auth.jsx';
import { site } from '../data/site';
import { FormMessage, PageHeader } from '../components/Primitives';

const TOPICS = ['A reservation', 'Partnering a venue', 'Press', 'Something else'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' });
  const [status, setStatus] = useState(null);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return setStatus({ tone: 'error', message: 'Please add your name.' });

    const emailError = validateEmail(form.email);
    if (emailError) return setStatus({ tone: 'error', message: emailError });

    if (!form.message.trim())
      return setStatus({ tone: 'error', message: 'Let us know what you need.' });

    const result = saveInquiry('contact', form);
    if (result.error) return setStatus({ tone: 'error', message: result.error });

    setForm({ name: '', email: '', topic: TOPICS[0], message: '' });
    setStatus({ tone: 'success', message: 'Thanks — your message is saved.' });
  };

  const inputClass =
    'w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-accent/50 focus:bg-white/10';

  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact us"
        lead="Questions about a reservation, a venue, or working together? Send a note and we'll come back to you."
      />

      <section className="bg-ink py-16 lg:py-24">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            {[
              [Mail, 'Email', site.email, `mailto:${site.email}`],
              [Phone, 'Phone', site.phone, `tel:${site.phone.replace(/[^\d+]/g, '')}`],
              [MapPin, 'Service area', site.serviceArea, null],
            ].map(([Icon, label, value, href]) => (
              <div key={label} className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Icon size={19} />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="mt-1.5 block text-sm font-medium text-white transition-colors hover:text-accent"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-1.5 text-sm font-medium text-white">{value}</p>
                )}
              </div>
            ))}

            <div className="rounded-3xl border border-white/[0.07] p-6">
              <p className="text-sm leading-relaxed text-white/45">
                Running a venue? The{' '}
                <Link to="/partners" className="text-accent hover:underline">
                  partner application
                </Link>{' '}
                is the faster route — it asks the questions we'd ask anyway.
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="cname" className="mb-2 block text-xs font-medium text-white/60">
                  Your name
                </label>
                <input
                  id="cname"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Alex Morgan"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="cemail" className="mb-2 block text-xs font-medium text-white/60">
                  Email
                </label>
                <input
                  id="cemail"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="topic" className="mb-2 block text-xs font-medium text-white/60">
                What's this about?
              </label>
              <select
                id="topic"
                value={form.topic}
                onChange={update('topic')}
                className={inputClass}
              >
                {TOPICS.map((topic) => (
                  <option key={topic} value={topic} className="bg-surface">
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cmessage" className="mb-2 block text-xs font-medium text-white/60">
                Message
              </label>
              <textarea
                id="cmessage"
                rows={6}
                value={form.message}
                onChange={update('message')}
                placeholder="How can we help?"
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
              Send message <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
