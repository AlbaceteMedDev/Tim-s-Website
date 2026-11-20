import { getBorough } from "@/lib/boroughs";
import { getCombo } from "@/lib/comboPages";
import type { RelatedCard } from "@/lib/content";
import { filled } from "@/lib/content";
import { getService, type Service } from "@/lib/services";

/** A related-content card, ready to render. */
export interface ResolvedCard {
  key: string;
  /** Slug of the service the card is about (also set on borough cards). */
  serviceSlug: string;
  href: string;
  icon: Service["icon"];
  heading: string;
  description: string;
}

function serviceCard(service: Service): ResolvedCard {
  return {
    key: service.slug,
    serviceSlug: service.slug,
    href: `/services/${service.slug}`,
    icon: service.icon,
    heading: service.shortName,
    description: service.teaser,
  };
}

/**
 * Turn a page's optional `relatedCards` into the cards to show.
 *
 * - No custom cards: the page's default cards, unchanged.
 * - Custom cards: shown in the order listed. If fewer than `count` are
 *   listed, the remaining places are filled from the defaults so the section
 *   always shows `count` cards.
 * - A slug that doesn't exist, a service + borough pair with no page, a
 *   service page pointing at itself, a duplicate, or too many cards throws —
 *   which fails the build and leaves the live site as it was.
 */
export function resolveRelatedCards(options: {
  /** e.g. `lib/services.ts → "pressure-injuries"`, used in error messages. */
  where: string;
  custom: RelatedCard[] | undefined;
  defaults: Service[];
  count: number;
  /** On a service page: that page's own slug, which it may not link to. */
  ownServiceSlug?: string;
}): ResolvedCard[] {
  const { where, custom, defaults, count, ownServiceSlug } = options;
  if (!custom || custom.length === 0) {
    return defaults.slice(0, count).map(serviceCard);
  }
  const defaultCards = defaults.map(serviceCard);

  const fail = (problem: string): never => {
    throw new Error(`relatedCards in ${where}: ${problem}`);
  };

  if (custom.length > count) {
    fail(
      `${custom.length} cards are listed, but this section shows ${count}. Remove ${custom.length - count}.`,
    );
  }

  const cards: ResolvedCard[] = [];
  for (const entry of custom) {
    const service = getService(entry.service);
    if (!service) {
      return fail(
        `"${entry.service}" is not a service slug. Copy a slug from lib/services.ts.`,
      );
    }

    const boroughSlug = filled(entry.borough);
    let card: ResolvedCard;
    if (boroughSlug) {
      const borough = getBorough(boroughSlug);
      if (!borough) {
        return fail(
          `"${boroughSlug}" is not a borough slug. Copy a slug from lib/boroughs.ts.`,
        );
      }
      const combo = getCombo(service.slug, borough.slug);
      if (!combo) {
        return fail(
          `there is no page for "${service.slug}" in "${borough.slug}". Use a pair that exists in lib/comboPages.ts, or remove the borough to link to /services/${service.slug}.`,
        );
      }
      card = {
        key: `${service.slug}/${borough.slug}`,
        serviceSlug: service.slug,
        href: `/services/${service.slug}/${borough.slug}`,
        icon: service.icon,
        heading: `${service.shortName} in ${borough.name}`,
        description: combo.metaDescription,
      };
    } else {
      if (service.slug === ownServiceSlug) {
        return fail(
          `"${service.slug}" is this page itself. Pick a different service, or add a borough.`,
        );
      }
      card = serviceCard(service);
    }

    if (cards.some((c) => c.key === card.key)) {
      return fail(`"${card.key}" is listed twice.`);
    }

    cards.push({
      ...card,
      heading: filled(entry.heading) ?? card.heading,
      description: filled(entry.description) ?? card.description,
    });
  }

  for (const fallback of defaultCards) {
    if (cards.length >= count) break;
    // Skip a default whose service already has a card, plain or borough.
    if (!cards.some((c) => c.serviceSlug === fallback.serviceSlug)) {
      cards.push(fallback);
    }
  }
  return cards;
}
