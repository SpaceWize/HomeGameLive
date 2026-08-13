import { useState } from 'react';
import { Check, Send } from 'lucide-react';
import { subscribe } from '../lib/auth.jsx';
import { FormMessage } from './Primitives';

/**
 * The original version of this form called preventDefault, flipped the button
 * to "You're In!", cleared the input and threw the address away — no request,
 * no storage, nothing. This one actually saves the subscription and says
 * plainly where it went.
 */
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const result = subscribe(email);

    if (result.error) {
      setStatus({ tone: 'error', message: result.error });
      return;
    }

    setEmail('');
    setStatus({
      tone: 'success',
      message: result.alreadySubscribed
        ? `${result.email} is already on the list.`
        : `You're on the list. We'll see you at the game.`,
    });
  };

  return (
    <section className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#161d2e] via-[#101521] to-[#0b0e16]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink/95" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center lg:px-10">
        <span className="eyebrow mb-4">Stay in the Loop</span>
        <h2 className="mb-5 font-display text-4xl font-semibold tracking-tight text-white lg:text-6xl">
          Don't Miss a Game.
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-white/50">
          Be the first to hear about upcoming sports watch parties, exclusive game-day events, and
          venue announcements.
        </p>

        <form
          onSubmit={onSubmit}
          className="mx-auto flex max-w-md flex-col items-stretch gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-4 text-sm text-white outline-none transition-all duration-200 placeholder:text-white/30 focus:border-accent/50 focus:bg-white/10"
          />
          <button type="submit" className="btn-accent whitespace-nowrap">
            Notify Me <Send size={15} />
          </button>
        </form>

        {status && (
          <div className="mx-auto mt-5 max-w-md text-left">
            <FormMessage tone={status.tone}>
              <span className="flex items-start gap-2">
                {status.tone === 'success' && <Check size={16} className="mt-0.5 flex-shrink-0" />}
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
          </div>
        )}
      </div>
    </section>
  );
}
