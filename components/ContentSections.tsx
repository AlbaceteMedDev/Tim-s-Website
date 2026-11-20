import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { boroughs } from "@/lib/boroughs";
import { comboPages } from "@/lib/comboPages";
import type { ContentSection } from "@/lib/content";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { technologies } from "@/lib/technology";

/** Pages that exist as their own folder under app/. Add new ones here. */
const STATIC_PATHS = [
  "/",
  "/about",
  "/contact",
  "/faq",
  "/for-referrers",
  "/is-my-wound-infected",
  "/non-healing-wounds",
  "/service-areas",
  "/services",
  "/technology",
];

let cachedPaths: Set<string> | undefined;

function knownPaths(): Set<string> {
  cachedPaths ??= new Set([
    ...STATIC_PATHS,
    ...services.map((s) => `/services/${s.slug}`),
    ...boroughs.map((b) => `/service-areas/${b.slug}`),
    ...technologies.map((t) => `/technology/${t.slug}`),
    ...comboPages.map((c) => `/services/${c.serviceSlug}/${c.boroughSlug}`),
  ]);
  return cachedPaths;
}

/** This site's own address, with or without "www." */
const OWN_HOST = new URL(site.url).hostname.replace(/^www\./, "");
const OWN_ORIGIN = new RegExp(
  `^https?://(www\\.)?${OWN_HOST.replace(/\./g, "\\.")}(?=/|$)`,
  "i",
);

/**
 * Checks a link and says how to render it. Throws — failing the build — on
 * anything that would publish as a broken link.
 */
function resolveHref(
  rawHref: string,
  where: string,
): { href: string; internal: boolean } {
  const fail = (problem: string): never => {
    throw new Error(`contentSections in ${where}: the link "${rawHref}" ${problem}`);
  };
  if (!rawHref || /[\s"()]/.test(rawHref)) {
    fail(
      "isn't a clean address. Write links as [words](/page-address) with no spaces, quotes or brackets inside the round brackets.",
    );
  }
  // A full link to this site is treated like any other on-site link.
  const href = OWN_ORIGIN.test(rawHref)
    ? rawHref.replace(OWN_ORIGIN, "") || "/"
    : rawHref;
  if (/^(https?:\/\/|mailto:|tel:)/.test(href)) return { href, internal: false };
  if (!href.startsWith("/") || href.startsWith("//")) {
    fail('must start with "/" (a page on this site) or "https://".');
  }
  const path = href.split(/[?#]/)[0].replace(/(.)\/$/, "$1");
  if (!knownPaths().has(path)) {
    fail(
      "points to a page that doesn't exist. Check the spelling against the page's address on the site.",
    );
  }
  return { href, internal: true };
}

/**
 * Turns [text](/link) and **bold** inside a string into real elements. Either
 * can sit inside the other. Leftover link or bold punctuation means a typo,
 * and throws rather than printing stray symbols on the page.
 */
function renderInline(text: string, where: string, keyPrefix = ""): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]*)\)/g;
  const plain = (chunk: string) => {
    if (chunk.includes("**") || chunk.includes("](")) {
      throw new Error(
        `contentSections in ${where}: unfinished link or bold near "${chunk.trim().slice(0, 60)}". Links are [words](/page-address) and bold is **words**.`,
      );
    }
    out.push(chunk);
  };
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) plain(text.slice(last, match.index));
    const key = `${keyPrefix}${match.index}`;
    if (match[1] !== undefined) {
      out.push(
        <strong key={key}>{renderInline(match[1], where, `${key}-`)}</strong>,
      );
    } else {
      const label = renderInline(match[2], where, `${key}-`);
      const { href, internal } = resolveHref(match[3].trim(), where);
      out.push(
        internal ? (
          <Link key={key} href={href}>
            {label}
          </Link>
        ) : (
          <a
            key={key}
            href={href}
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {label}
          </a>
        ),
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) plain(text.slice(last));
  return out;
}

const hasText = (items: string[] | undefined): items is string[] =>
  Boolean(items?.some((item) => item.trim()));

/**
 * Renders a page's optional `contentSections` (see lib/content.ts) as
 * full-width sections with the text held to a reading width. Renders nothing
 * at all when the page has none, so pages without extra content are unchanged.
 */
export default function ContentSections({
  sections,
  where,
}: {
  sections: ContentSection[] | undefined;
  /** e.g. `lib/services.ts → "pressure-injuries"`, used in error messages. */
  where: string;
}) {
  const filledSections = (sections ?? []).filter(
    (s) =>
      s.heading?.trim() ||
      hasText(s.paragraphs) ||
      hasText(s.bullets) ||
      hasText(s.closing),
  );
  if (filledSections.length === 0) return null;

  const paragraphs = (items: string[] | undefined) =>
    (items ?? [])
      .filter((p) => p.trim())
      .map((p, i) => <p key={i}>{renderInline(p, where)}</p>);

  return (
    <>
      {filledSections.map((s, index) => (
        <section key={index} className="section content-section">
          <div className="container">
            <Reveal className="content-prose">
              {s.eyebrow?.trim() && <span className="eyebrow">{s.eyebrow}</span>}
              {s.heading?.trim() && (
                <h2 className="section-title">{s.heading}</h2>
              )}
              {paragraphs(s.paragraphs)}
              {hasText(s.bullets) && (
                <ul className="detail-list">
                  {s.bullets
                    .filter((b) => b.trim())
                    .map((b, i) => (
                      <li key={i}>
                        <span>{renderInline(b, where)}</span>
                      </li>
                    ))}
                </ul>
              )}
              {paragraphs(s.closing)}
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
