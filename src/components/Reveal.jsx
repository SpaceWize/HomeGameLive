import { useEffect, useRef, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Fades content up as it scrolls into view.
 *
 * Deliberately subtle — the point is that the page feels considered, not that
 * it performs. Anyone who has asked their OS for reduced motion sees the
 * content immediately with no transition at all.
 */
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (shown || !ref.current) return undefined;

    // Fall back to showing content if the browser lacks IntersectionObserver,
    // so a missing API can never leave the page blank.
    if (!('IntersectionObserver' in window)) {
      setShown(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}
