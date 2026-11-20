/**
 * Optional per-page fields shared by lib/services.ts, lib/boroughs.ts and
 * lib/technology.ts. Everything here is optional: a page entry that doesn't
 * use a field renders exactly as it did before the field existed.
 *
 * The README section "Adding content, SEO titles and related cards" has
 * copy-and-paste examples for each of these.
 */

/**
 * One extra block of content on a page: an H2 heading, paragraphs, and an
 * optional bulleted list. Each block gets its own full-width section, with
 * the text held to a comfortable reading width.
 *
 * Inside any paragraph or bullet you can write:
 *   - a link:  [the words to click](/services/pressure-injuries)
 *   - bold:    **important words**
 *
 * Links to pages on this site start with "/" and are checked when the site
 * builds. A link to a page that doesn't exist stops the update (red ✕) and
 * names the bad link, instead of publishing a broken one.
 */
export interface ContentSection {
  /** The H2 heading for this block. */
  heading: string;
  /** Optional small label printed above the heading. */
  eyebrow?: string;
  /** Paragraphs shown under the heading, one quoted text per paragraph. */
  paragraphs?: string[];
  /** Optional bulleted list, shown after the paragraphs. */
  bullets?: string[];
  /** Optional paragraphs shown after the bulleted list. */
  closing?: string[];
}

/**
 * One hand-picked card for "Often paired with" (service pages) or "Common
 * reasons neighbors call us" (borough pages).
 *
 * Give the service slug, and the borough slug as well when the card should go
 * to a service + borough page:
 *   { service: "pressure-injuries" }                          → /services/pressure-injuries
 *   { service: "diabetic-foot-ulcers", borough: "the-bronx" } → /services/diabetic-foot-ulcers/the-bronx
 *
 * The card's heading and description come from the destination page unless
 * you set `heading` or `description` here. A service + borough pair is only
 * accepted if that page exists in lib/comboPages.ts; otherwise the update
 * stops (red ✕) and names the bad pair.
 */
export interface RelatedCard {
  /** A `slug` from lib/services.ts. */
  service: string;
  /** Optional: a `slug` from lib/boroughs.ts. */
  borough?: string;
  /** Optional: replaces the card's heading. */
  heading?: string;
  /** Optional: replaces the card's short description. */
  description?: string;
}

/** Optional search-engine fields available on every page entry. */
export interface SeoOverrides {
  /**
   * Replaces the whole title tag, exactly as typed. Nothing is added, so
   * include "| Apollo Wound Care" yourself if you want it. Leave it out (or
   * blank) to keep the automatic title. Never changes the H1 on the page.
   */
  seoTitle?: string;
  /**
   * Replaces the meta description. Leave it out (or blank) to keep the
   * automatic one. Never changes anything visible on the page.
   */
  seoDescription?: string;
}

/** A filled-in value, or undefined when the field is missing or blank. */
export function filled(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}
