import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { footerNav, site } from '../data/site';
import { brand } from '../config';

const ICONS = { Instagram, Twitter, Facebook, YouTube: Youtube };

export default function Footer() {
  const social = site.social.filter((s) => s.url);

  return (
    <footer className="border-t border-white/5 bg-ink">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent font-display text-sm font-bold text-ink">
                {brand.monogram}
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                {brand.nameParts[0]}{' '}
                {brand.nameParts.length > 1 && (
                  <span className="text-accent">{brand.nameParts.slice(1).join(' ')}</span>
                )}
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/40">
              {site.tagline} {site.description}
            </p>

            {social.length > 0 && (
              <div className="mt-6 flex items-center gap-3">
                {social.map((item) => {
                  const Icon = ICONS[item.name];
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${item.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      <Icon size={17} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {group.heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/30">
            © {new Date().getFullYear()} {site.name} — All rights reserved
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/30">
            {site.serviceArea}
          </p>
        </div>
      </div>
    </footer>
  );
}
