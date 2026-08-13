import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-32">
      <div className="max-w-md text-center">
        <p className="font-display text-7xl font-semibold text-accent/25">404</p>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white">
          That page isn't on the schedule.
        </h1>
        <p className="mt-4 leading-relaxed text-white/45">
          The link may be out of date, or the game night it pointed to has already been and gone.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/events" className="btn-accent">
            See what's on <ArrowRight size={16} />
          </Link>
          <Link to="/" className="btn-ghost">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
