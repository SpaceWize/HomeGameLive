import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Local-only accounts.
 *
 * Everything here lives in the visitor's own browser via localStorage — no
 * server, no network request, no personal data leaving the device. That is a
 * deliberate choice for this build: the site can demonstrate a complete
 * sign-in / reserve / manage-booking flow without collecting anything.
 *
 * Passwords are salted and SHA-256 hashed even so. Nothing here is a substitute
 * for real server-side auth, but storing plaintext passwords teaches the wrong
 * shape and would be trivially readable in devtools.
 */

const USERS_KEY = 'hgl.users.v1';
const SESSION_KEY = 'hgl.session.v1';
const RESERVATIONS_KEY = 'hgl.reservations.v1';
const SUBSCRIBERS_KEY = 'hgl.subscribers.v1';

/* -------------------------------------------------------------- storage -- */

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    // Private-browsing modes and disabled storage should degrade, not crash.
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/* --------------------------------------------------------------- crypto -- */

function randomSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

/* --------------------------------------------------------------- helpers - */

const normalizeEmail = (email) => email.trim().toLowerCase();

export function validatePassword(password) {
  if (password.length < 8) return 'Use at least 8 characters.';
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password))
    return 'Include at least one letter and one number.';
  return null;
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? null : 'Enter a valid email address.';
}

/* ---------------------------------------------------------------- context */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [ready, setReady] = useState(false);

  // Restore the session on first paint.
  useEffect(() => {
    const session = read(SESSION_KEY, null);
    if (session?.email) {
      const found = read(USERS_KEY, []).find((u) => u.email === session.email);
      if (found) setUser({ name: found.name, email: found.email, role: found.role });
    }
    setReservations(read(RESERVATIONS_KEY, []));
    setReady(true);
  }, []);

  // Keep multiple open tabs in sync.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === RESERVATIONS_KEY) setReservations(read(RESERVATIONS_KEY, []));
      if (e.key === SESSION_KEY) {
        const session = read(SESSION_KEY, null);
        if (!session) setUser(null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const signUp = useCallback(async ({ name, email, password, role = 'fan' }) => {
    const clean = normalizeEmail(email);
    const users = read(USERS_KEY, []);

    if (users.some((u) => u.email === clean))
      return { error: 'An account already exists for that email. Try signing in.' };

    const salt = randomSalt();
    const record = {
      name: name.trim(),
      email: clean,
      role,
      salt,
      hash: await hashPassword(password, salt),
      createdAt: new Date().toISOString(),
    };

    if (!write(USERS_KEY, [...users, record]))
      return { error: 'Your browser is blocking local storage, so accounts cannot be saved.' };

    write(SESSION_KEY, { email: clean, since: new Date().toISOString() });
    setUser({ name: record.name, email: clean, role });
    return { user: { name: record.name, email: clean, role } };
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const clean = normalizeEmail(email);
    const found = read(USERS_KEY, []).find((u) => u.email === clean);

    // Same message either way so the form does not reveal which emails exist.
    const rejection = { error: 'That email and password combination did not match.' };
    if (!found) return rejection;
    if ((await hashPassword(password, found.salt)) !== found.hash) return rejection;

    write(SESSION_KEY, { email: clean, since: new Date().toISOString() });
    setUser({ name: found.name, email: clean, role: found.role });
    return { user: { name: found.name, email: clean, role: found.role } };
  }, []);

  const signOut = useCallback(() => {
    write(SESSION_KEY, null);
    setUser(null);
  }, []);

  const reserve = useCallback(
    ({ eventId, eventSlug, eventTitle, startsAt, venueName, seats = 1 }) => {
      if (!user) return { error: 'Sign in to reserve a seat.' };

      const all = read(RESERVATIONS_KEY, []);
      if (all.some((r) => r.email === user.email && r.eventId === eventId))
        return { error: 'You already have a seat reserved for this game.' };

      const record = {
        id: `res-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        email: user.email,
        eventId,
        eventSlug,
        eventTitle,
        startsAt,
        venueName,
        seats,
        createdAt: new Date().toISOString(),
      };

      const next = [...all, record];
      write(RESERVATIONS_KEY, next);
      setReservations(next);
      return { reservation: record };
    },
    [user]
  );

  const cancelReservation = useCallback((id) => {
    const next = read(RESERVATIONS_KEY, []).filter((r) => r.id !== id);
    write(RESERVATIONS_KEY, next);
    setReservations(next);
  }, []);

  const myReservations = useMemo(
    () =>
      user
        ? reservations
            .filter((r) => r.email === user.email)
            .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt))
        : [],
    [reservations, user]
  );

  const hasReserved = useCallback(
    (eventId) => myReservations.some((r) => r.eventId === eventId),
    [myReservations]
  );

  const value = useMemo(
    () => ({
      user,
      ready,
      signUp,
      signIn,
      signOut,
      reserve,
      cancelReservation,
      myReservations,
      hasReserved,
    }),
    [user, ready, signUp, signIn, signOut, reserve, cancelReservation, myReservations, hasReserved]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

/* ------------------------------------------------------------ newsletter -- */

/**
 * Unlike the original — which showed "You're In!" and silently threw the
 * address away — this actually persists the subscription locally and tells the
 * visitor plainly that it stayed in their browser.
 */
export function subscribe(email) {
  const clean = normalizeEmail(email);
  const invalid = validateEmail(clean);
  if (invalid) return { error: invalid };

  const list = read(SUBSCRIBERS_KEY, []);
  if (list.some((s) => s.email === clean)) return { alreadySubscribed: true, email: clean };

  write(SUBSCRIBERS_KEY, [...list, { email: clean, subscribedAt: new Date().toISOString() }]);
  return { email: clean };
}

export function getSubscribers() {
  return read(SUBSCRIBERS_KEY, []);
}
