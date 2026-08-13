import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Loader2, Lock, ShieldCheck } from 'lucide-react';
import { useAuth, validateEmail, validatePassword } from '../lib/auth.jsx';
import { FormMessage } from '../components/Primitives';

export default function SignIn() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();

  const isPartner = params.get('role') === 'partner';
  const redirect = params.get('redirect') || (isPartner ? '/partners' : '/account');
  const intent = params.get('intent');

  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  // Already signed in? Go straight where they were headed.
  useEffect(() => {
    if (user) navigate(decodeURIComponent(redirect), { replace: true });
  }, [user, navigate, redirect]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailError = validateEmail(form.email);
    if (emailError) return setError(emailError);

    if (mode === 'signup') {
      if (!form.name.trim()) return setError('Tell us your name so venues know who to expect.');
      const passwordError = validatePassword(form.password);
      if (passwordError) return setError(passwordError);
    }

    setBusy(true);
    const result =
      mode === 'signup'
        ? await signUp({ ...form, role: isPartner ? 'partner' : 'fan' })
        : await signIn(form);
    setBusy(false);

    if (result.error) setError(result.error);
    else navigate(decodeURIComponent(redirect), { replace: true });
  };

  const switchMode = (next) => {
    setMode(next);
    setError('');
  };

  const inputClass =
    'w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-accent/50 focus:bg-white/10';

  return (
    <div className="flex min-h-screen items-center justify-center px-6 pb-20 pt-32">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="eyebrow mb-3">
            {isPartner ? 'Venue Partners' : 'Your Account'}
          </span>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white lg:text-4xl">
            {mode === 'signin' ? 'Welcome back.' : 'Save your seat.'}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/45">
            {intent === 'reserve'
              ? 'Sign in to hold your seat for this game.'
              : isPartner
                ? 'Manage your venue’s watch parties and seat allocations.'
                : 'Reserve seats, track your game nights, and never miss a fixture.'}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-1 rounded-full border border-white/10 p-1">
          {[
            ['signin', 'Sign In'],
            ['signup', 'Create Account'],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => switchMode(value)}
              aria-pressed={mode === value}
              className={`rounded-full py-2.5 text-sm font-medium transition-colors ${
                mode === value ? 'bg-accent text-ink' : 'text-white/50 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label htmlFor="name" className="mb-2 block text-xs font-medium text-white/60">
                Full name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={update('name')}
                placeholder="Alex Morgan"
                className={inputClass}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-2 block text-xs font-medium text-white/60">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={update('email')}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-xs font-medium text-white/60">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                value={form.password}
                onChange={update('password')}
                placeholder={mode === 'signup' ? 'At least 8 characters' : '••••••••'}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 transition-colors hover:text-white/70"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {mode === 'signup' && (
              <p className="mt-2 text-xs text-white/35">
                Use at least 8 characters with one letter and one number.
              </p>
            )}
          </div>

          <FormMessage tone="error">{error}</FormMessage>

          <button type="submit" disabled={busy} className="btn-accent w-full disabled:opacity-60">
            {busy && <Loader2 size={16} className="animate-spin" />}
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
            {!busy && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="mt-7 flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-4">
          <ShieldCheck size={17} className="mt-0.5 flex-shrink-0 text-accent" />
          <p className="text-xs leading-relaxed text-white/45">
            <span className="font-medium text-white/70">Your account stays on this device.</span>{' '}
            Accounts and reservations are saved in your own browser only — nothing is transmitted to
            a server and no personal data is collected. Your password is salted and hashed before it
            is stored.
          </p>
        </div>

        {!isPartner && (
          <p className="mt-6 text-center text-xs text-white/35">
            Running a venue?{' '}
            <Link to="/signin?role=partner" className="text-accent hover:underline">
              Partner sign in
            </Link>
          </p>
        )}
        {isPartner && (
          <p className="mt-6 text-center text-xs text-white/35">
            Looking to book a seat?{' '}
            <Link to="/signin" className="text-accent hover:underline">
              Fan sign in
            </Link>
          </p>
        )}

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-white/25">
          <Lock size={11} /> Demo build — see{' '}
          <Link to="/privacy" className="underline hover:text-white/50">
            our privacy note
          </Link>
        </p>
      </div>
    </div>
  );
}
