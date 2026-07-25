import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Smartphone, Mail } from "lucide-react";
import { FOOTER_LINKS } from "../../constants";

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-white">{title}</h3>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link to={l.href} className="text-sm text-white/60 hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container-page grid grid-cols-2 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="col-span-2">
          <p className="font-display text-2xl font-bold">
            Wise<span className="text-brand-gold">Care</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
            Verified healthcare providers dispatched to your home in 30 minutes, or on the phone in 15.
            Premium, transparent, and available around the clock.
          </p>
          <div className="mt-4 flex gap-3">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-brand-gold hover:text-brand-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href="#"
              className="flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs text-white/80 hover:border-brand-gold"
            >
              <Smartphone className="h-4 w-4" /> Download the app
            </a>
          </div>
        </div>
        <FooterColumn title="Company" links={FOOTER_LINKS.company} />
        <FooterColumn title="Support" links={FOOTER_LINKS.support} />
        <FooterColumn title="Legal" links={FOOTER_LINKS.legal} />
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-xs text-white/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Wise Care Health Services. All rights reserved.</p>
          <a href="mailto:hello@wisecare.health" className="flex items-center gap-1.5 hover:text-white">
            <Mail className="h-3.5 w-3.5" /> hello@wisecare.health
          </a>
        </div>
      </div>
    </footer>
  );
}
