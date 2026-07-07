"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { boroughs } from "@/lib/boroughs";

interface MenuGroup {
  label: string;
  href: string;
  items: { href: string; label: string; hint?: string }[];
  footer: { href: string; label: string };
}

const groups: MenuGroup[] = [
  {
    label: "Services",
    href: "/services",
    items: services.map((s) => ({
      href: `/services/${s.slug}`,
      label: s.shortName,
      hint: s.name,
    })),
    footer: { href: "/services", label: "All services" },
  },
  {
    label: "Service Areas",
    href: "/service-areas",
    items: boroughs.map((b) => ({
      href: `/service-areas/${b.slug}`,
      label: b.name,
      hint: `Wound care in ${b.name}`,
    })),
    footer: { href: "/service-areas", label: "All service areas" },
  },
];

const singles = [
  { href: "/about", label: "About Tim" },
  { href: "/faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // close dropdowns on Escape or outside click
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [openMenu]);

  return (
    <>
      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`} ref={navRef}>
        <div className="container-wide nav-inner">
          <Logo casing={scrolled ? "#FDFDF9" : "#F1F2EC"} />

          <nav className="nav-links" aria-label="Primary">
            {groups.map((g) => {
              const isOpen = openMenu === g.label;
              const active = pathname.startsWith(g.href);
              return (
                <div
                  key={g.label}
                  className={`nav-group ${isOpen ? "is-open" : ""}`}
                  onMouseEnter={() => setOpenMenu(g.label)}
                  onMouseLeave={() => setOpenMenu((m) => (m === g.label ? null : m))}
                >
                  <Link href={g.href} className={`nav-link ${active ? "is-active" : ""}`}>
                    {g.label}
                  </Link>
                  <button
                    className="nav-caret"
                    aria-expanded={isOpen}
                    aria-label={`Open ${g.label} menu`}
                    onClick={() => setOpenMenu(isOpen ? null : g.label)}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                      <path
                        d="m2 3.5 3 3 3-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <div className="nav-panel" role="menu" aria-label={g.label}>
                    <div className="nav-panel-grid">
                      {g.items.map((item, i) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          className="nav-panel-link"
                          style={{ "--i": i } as React.CSSProperties}
                        >
                          <span className="nav-panel-idx">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>
                            {item.label}
                            {item.hint && <small>{item.hint}</small>}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <Link href={g.footer.href} role="menuitem" className="nav-panel-all">
                      {g.footer.label} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              );
            })}

            {singles.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link ${pathname.startsWith(l.href) ? "is-active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="nav-cta">
            <a href={`tel:${site.phoneHref}`} className="nav-phone">
              <PhoneIcon />
              <span>{site.phone}</span>
            </a>
            <Link href="/contact" className="btn btn-primary nav-btn">
              Request a Visit
            </Link>
          </div>

          <button
            className={`nav-burger ${open ? "is-open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`}>
        <nav aria-label="Mobile" className="mobile-nav">
          {groups.map((g, gi) => (
            <div
              key={g.label}
              className="mobile-group"
              style={{ transitionDelay: open ? `${0.06 + gi * 0.05}s` : "0s" }}
            >
              <Link href={g.href} className="mobile-group-title">
                {g.label} <span aria-hidden="true">→</span>
              </Link>
              <div className="mobile-group-links">
                {g.items.map((item) => (
                  <Link key={item.href} href={item.href} className="mobile-sublink">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="mobile-group" style={{ transitionDelay: open ? "0.16s" : "0s" }}>
            <div className="mobile-group-links mobile-group-singles">
              {singles.map((l) => (
                <Link key={l.href} href={l.href} className="mobile-sublink">
                  {l.label}
                </Link>
              ))}
              <Link href="/contact" className="mobile-sublink">
                Request a Visit
              </Link>
            </div>
          </div>
        </nav>
        <a href={`tel:${site.phoneHref}`} className="btn btn-primary btn-lg mobile-call">
          <PhoneIcon /> Call {site.phone}
        </a>
      </div>

      {/* Sticky call bar — mobile only */}
      <div className="callbar">
        <a href={`tel:${site.phoneHref}`} className="callbar-phone">
          <PhoneIcon /> Call Now
        </a>
        <Link href="/contact" className="callbar-visit">
          Request a Visit
        </Link>
      </div>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"
        fill="currentColor"
      />
    </svg>
  );
}
