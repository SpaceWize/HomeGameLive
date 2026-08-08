import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Ticket, Trash2 } from 'lucide-react';
import { useAuth } from '../lib/auth.jsx';
import { formatLongDate, formatTime } from '../lib/events';
import { PageHeader } from '../components/Primitives';
import AddToCalendarButton from '../components/AddToCalendarButton';

export default function Account() {
  const { user, myReservations, cancelReservation } = useAuth();

  const now = new Date();
  const upcoming = myReservations.filter((r) => new Date(r.startsAt) >= now);
  const past = myReservations.filter((r) => new Date(r.startsAt) < now);

  return (
    <>
      <PageHeader
        eyebrow={user.role === 'partner' ? 'Venue Partner' : 'Your Account'}
        title={`Hey, ${user.name.split(' ')[0]}.`}
        lead={
          upcoming.length
            ? `You have ${upcoming.length} game night${upcoming.length === 1 ? '' : 's'} coming up.`
            : "You haven't reserved a seat yet. Let's fix that."
        }
      />

      <section className="bg-ink py-16 lg:py-24">
        <div className="shell max-w-4xl">
          {myReservations.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] px-8 py-20 text-center">
              <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <Ticket size={24} />
              </span>
              <h2 className="font-display text-2xl font-semibold text-white">No reservations yet</h2>
              <p className="mx-auto mt-3 max-w-sm leading-relaxed text-white/45">
                Browse this week's watch parties and hold a seat — it takes one click and costs
                nothing.
              </p>
              <Link to="/events" className="btn-gold mt-8">
                Find a game night
              </Link>
            </div>
          ) : (
            <div className="space-y-14">
              {upcoming.length > 0 && (
                <div>
                  <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-gold">
                    Upcoming
                  </h2>
                  <ul className="space-y-4">
                    {upcoming.map((r) => (
                      <li
                        key={r.id}
                        className="flex flex-col gap-5 rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0">
                          <h3 className="font-display text-lg font-semibold text-white">
                            <Link to={`/events/${r.eventSlug}`} className="hover:text-gold">
                              {r.eventTitle}
                            </Link>
                          </h3>
                          <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-white/45">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={12} className="text-gold" />
                              {formatLongDate(r.startsAt)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock size={12} className="text-gold" />
                              {formatTime(r.startsAt)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin size={12} className="text-gold" />
                              {r.venueName}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-shrink-0 items-center gap-2">
                          <AddToCalendarButton
                            event={{
                              id: r.eventId,
                              slug: r.eventSlug,
                              title: r.eventTitle,
                              startsAt: r.startsAt,
                              venueName: r.venueName,
                            }}
                            label="Add to calendar"
                            className="!px-4 !py-2.5 !text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => cancelReservation(r.id)}
                            className="btn border border-white/12 px-4 py-2.5 text-xs text-white/55 hover:border-flames/50 hover:text-flames"
                          >
                            <Trash2 size={14} /> Cancel
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {past.length > 0 && (
                <div>
                  <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-white/35">
                    Past nights
                  </h2>
                  <ul className="space-y-3">
                    {past.map((r) => (
                      <li
                        key={r.id}
                        className="flex items-center justify-between rounded-2xl border border-white/[0.05] px-6 py-4 opacity-60"
                      >
                        <div>
                          <p className="text-sm font-medium text-white/70">{r.eventTitle}</p>
                          <p className="mt-0.5 text-xs text-white/35">
                            {formatLongDate(r.startsAt)} · {r.venueName}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => cancelReservation(r.id)}
                          aria-label={`Remove ${r.eventTitle} from history`}
                          className="text-white/25 transition-colors hover:text-flames"
                        >
                          <Trash2 size={15} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <p className="mt-14 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 text-xs leading-relaxed text-white/40">
            These reservations are stored in this browser only. Clearing your browser data will
            remove them, and they won't appear on another device.
          </p>
        </div>
      </section>
    </>
  );
}
