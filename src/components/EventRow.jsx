import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import { formatDayLabel, formatTime } from '../lib/events';
import { Badge, SeatsLeft } from './Primitives';
import ReserveButton from './ReserveButton';

/** One row in the schedule list, on the paper section background. */
export default function EventRow({ event }) {
  return (
    <div className="group border-b border-ink/10 py-6 transition-colors last:border-0 hover:bg-ink/[0.02]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-6">
        <div className="flex items-center gap-3 lg:w-44 lg:flex-shrink-0">
          <Badge label={event.badge} className="!bg-ink/10 !text-ink/70" />
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink/50">
            {formatDayLabel(event.startsAt)}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
            <Link
              to={`/events/${event.slug}`}
              className="transition-colors hover:text-accent focus-visible:text-accent"
            >
              {event.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-ink/50">{event.league} Watch Party</p>
        </div>

        <p className="flex items-center gap-1.5 text-sm text-ink/70 lg:w-28 lg:flex-shrink-0">
          <Clock size={13} className="text-accent" />
          {formatTime(event.startsAt)}
        </p>

        <div className="lg:w-52 lg:flex-shrink-0">
          <Link
            to={`/venues/${event.venue}`}
            className="truncate text-sm font-medium text-ink transition-colors hover:text-accent"
          >
            {event.venueName}
          </Link>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-ink/40">
            <MapPin size={11} />
            {event.city}
          </p>
        </div>

        <div className="lg:w-32 lg:flex-shrink-0">
          <SeatsLeft count={event.seatsLeft} tone="light" />
        </div>

        <div className="lg:flex-shrink-0">
          <ReserveButton event={event} className="w-full lg:w-auto" />
        </div>
      </div>
    </div>
  );
}
