import { useEffect, useState } from 'react';
import { loadEvents, selectThisWeek, selectUpcoming } from './events';

/**
 * Single source of truth for the schedule. Every surface that shows a game —
 * the hero, the home schedule, /events, an event page — reads from this, which
 * is why the hero and the schedule can no longer disagree the way the original
 * site's two hardcoded date strings did.
 */
export function useEvents() {
  const [state, setState] = useState({ events: [], loading: true, error: null });

  useEffect(() => {
    let active = true;

    loadEvents()
      .then((events) => active && setState({ events, loading: false, error: null }))
      .catch((error) => active && setState({ events: [], loading: false, error }));

    return () => {
      active = false;
    };
  }, []);

  const upcoming = selectUpcoming(state.events);

  return {
    ...state,
    all: state.events,
    upcoming,
    thisWeek: selectThisWeek(state.events),
    next: upcoming[0] ?? null,
  };
}
