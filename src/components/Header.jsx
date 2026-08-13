import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, Ticket, User, X } from 'lucide-react';
import { useAuth } from '../lib/auth.jsx';
import { brand } from '../config';

const NAV = [
  { to: '/events', label: 'This Week' },
  { to: '/how-it-works', label: 'Why Us' },
  { to: '/venues', label: 'Venues' },
  { to: '/partners', label: 'Partners' },
];

function Wordmark() {
  const [first, ...rest] = brand.nameParts;
  return (
    <Link to="/" className="flex items-center gap-3" aria-label={`${brand.name} — home`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent font-display text-sm font-bold text-ink">
        {brand.monogram}
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-white">
        {first} {rest.length > 0 && <span className="text-accent">{rest.join(' ')}</span>}
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut, myReservations } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const accountRef = useRef(null);

  // Close both menus whenever the route changes.
  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setMenuOpen(false);
      }
    };
    const onClick = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  // Stop the page scrolling behind the open mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkClass = ({ isActive }) =>
    `text-sm transition-colors duration-200 ${
      isActive ? 'text-accent' : 'text-white/60 hover:text-white'
    }`;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-white/5 bg-ink/90 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="shell flex h-20 items-center justify-between gap-6">
          <Wordmark />

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <div className="relative" ref={accountRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-expanded={menuOpen}
                  aria-haspopup="menu"
                  className="flex items-center gap-2 rounded-full border border-white/15 py-2 pl-2 pr-4 text-sm text-white transition-colors hover:border-white/30"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-ink">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  {user.name.split(' ')[0]}
                </button>

                {menuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl"
                  >
                    <div className="border-b border-white/5 px-4 py-3">
                      <p className="truncate text-sm font-medium text-white">{user.name}</p>
                      <p className="truncate text-xs text-white/40">{user.email}</p>
                    </div>
                    <Link
                      to="/account"
                      role="menuitem"
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <Ticket size={15} />
                      My reservations
                      {myReservations.length > 0 && (
                        <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-ink">
                          {myReservations.length}
                        </span>
                      )}
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        signOut();
                        navigate('/');
                      }}
                      className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <LogOut size={15} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Sign In
              </Link>
            )}

            <Link
              to="/events"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-light"
            >
              Reserve a Seat
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="text-white lg:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-ink pt-20 lg:hidden">
          <nav aria-label="Mobile" className="shell flex flex-col gap-1 py-8">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `border-b border-white/5 py-4 font-display text-2xl font-semibold ${
                    isActive ? 'text-accent' : 'text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mt-6 flex flex-col gap-3">
              {user ? (
                <>
                  <Link to="/account" className="btn-ghost w-full">
                    <User size={16} /> My reservations ({myReservations.length})
                  </Link>
                  <button
                    type="button"
                    className="btn-ghost w-full"
                    onClick={() => {
                      signOut();
                      navigate('/');
                    }}
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </>
              ) : (
                <Link to="/signin" className="btn-ghost w-full">
                  Sign In
                </Link>
              )}
              <Link to="/events" className="btn-accent w-full">
                Reserve a Seat
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
