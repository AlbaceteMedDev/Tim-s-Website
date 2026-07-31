/**
 * Advanced wound-healing technologies Apollo Wound Care can bring to the home.
 *
 * ── SOURCING NOTE ─────────────────────────────────────────────────────────
 * Every clinical figure and mechanism here is drawn from the manufacturer /
 * partner material at albacetemeddev.com (UltraMIST product page and the
 * physician-facing scientific portfolio) with its original citation kept
 * beside the claim. Do not add outcome statistics that aren't traceable to a
 * cited source. Availability of any given modality for a specific patient is
 * always subject to clinical assessment and payer coverage.
 *
 * Specific FDA 510(k) / HCPCS identifiers are intentionally NOT published here:
 * the source material assigned the same code (K153756 / A2005) to two distinct
 * products, so exact clearance numbers must be human-verified against NPPES /
 * the FDA 510(k) database before being stated on a patient-facing page.
 * ──────────────────────────────────────────────────────────────────────────
 */

export interface Effect {
  label: string;
  title: string;
  copy: string;
}

export interface Spec {
  k: string;
  v: string;
}

export interface Stat {
  value: string;
  label: string;
  source?: string;
}

export interface Technology {
  slug: string;
  /** Short nav/label name. */
  shortName: string;
  /** Full page/product name. */
  name: string;
  /** Trademark/manufacturer attribution line. */
  attribution: string;
  category: "Ultrasound therapy" | "Biologic graft" | "Antimicrobial";
  /** One-line teaser for cards + meta. */
  teaser: string;
  /** Lead paragraph. */
  intro: string;
  /** Hero image in /public, if any. */
  image?: string;
  /** Hero video loop in /public, if any (used in the dark product hero). */
  video?: string;
  /** Poster image for the video. */
  poster?: string;
  featured?: boolean;
  effects?: Effect[];
  specs?: Spec[];
  stats?: Stat[];
  /** Plain-language "what this means for you" bullets for patients. */
  patient?: string[];
  /** Global citation/disclaimer footnote for the page. */
  footnote?: string;
}

export const technologies: Technology[] = [
  {
    slug: "ultramist-ultrasound-therapy",
    shortName: "UltraMIST® Therapy",
    name: "UltraMIST® Low-Frequency Ultrasound Therapy",
    attribution: "Sanuwave UltraMIST® · delivered by Apollo Wound Care",
    category: "Ultrasound therapy",
    teaser:
      "Non-contact, painless low-frequency ultrasound that reaches into and below the wound bed through a fine saline mist.",
    intro:
      "UltraMIST delivers low-energy, low-frequency (40 kHz) ultrasound to the wound bed through a gentle saline mist — without ever touching the wound surface. The acoustic waves mechanically stimulate cells in and below the wound, supporting the body's natural healing cascade. Because nothing contacts the wound, treatment is painless, which makes it especially suited to sensitive wounds and patients who can't tolerate contact-based therapies. Apollo Wound Care brings UltraMIST to the home as an adjunct to your wound-care plan when standard care has stalled.",
    image: "/ultramist-device.webp",
    video: "/ultramist-loop.webm",
    poster: "/ultramist-poster.png",
    featured: true,
    effects: [
      {
        label: "Effect 01",
        title: "Reduce bacterial load",
        copy: "Acoustic disruption reduces bacteria and biofilm at the wound surface, lowering an infection-related barrier to healing.",
      },
      {
        label: "Effect 02",
        title: "Calm inflammation",
        copy: "Mechanical stimulation modulates the local inflammatory response, helping chronic wounds progress past a stalled inflammatory phase.",
      },
      {
        label: "Effect 03",
        title: "Increase perfusion",
        copy: "Improved blood flow and angiogenic signaling support granulation tissue and oxygen delivery to the wound bed.",
      },
    ],
    specs: [
      { k: "Frequency", v: "40 kHz, non-thermal" },
      { k: "Delivery", v: "Non-contact saline mist" },
      { k: "Session", v: "3–20 min per visit" },
      { k: "Plan of care", v: "2–3× per week" },
      { k: "Sensation", v: "Painless — no wound contact" },
      { k: "Regulatory", v: "FDA cleared" },
    ],
    stats: [],
    patient: [
      "Nothing touches the wound, so there is no procedural pain during treatment.",
      "Each session is short — most take between three and twenty minutes.",
      "It works alongside your existing dressings and care plan, not instead of them.",
      "Used for venous leg ulcers, diabetic foot ulcers, deep-tissue pressure injuries, surgical wounds and soft-tissue injuries.",
    ],
    footnote:
      "Mechanism reference: Serena TE. Ostomy Wound Management. 2009;55(1):22–30. UltraMIST is an adjunctive treatment for acute and chronic wounds. Contraindicated over cancer lesions, electrical implants (e.g., pacemakers), and the pregnant uterus. Candidacy and coverage are determined at clinical assessment.",
  },
  {
    slug: "amniotic-membrane-allografts",
    shortName: "Amniotic Allografts",
    name: "Human Placental Allografts (Amniotic Membrane)",
    attribution: "Advanced biologic grafts · applied by Apollo Wound Care",
    category: "Biologic graft",
    teaser:
      "A biological scaffold carrying 25+ growth factors that helps reset wounds stuck in chronic inflammation.",
    video: "/amniotic-loop.mp4",
    intro:
      "Some wounds stall because the local environment has run out of the signals healthy tissue needs to rebuild. Human placental (amniotic membrane) allografts place a natural, growth-factor-rich scaffold directly on the wound — over 25 growth factors, anti-inflammatory cytokines and native extracellular matrix — to help move a stalled wound from chronic inflammation back into active repair. Grafts range from a single-layer entry option to a tri-layer construct for the most recalcitrant wounds.",
    stats: [
      { value: "25+", label: "growth factors in the membrane" },
      { value: "3", label: "graft tiers, matched to wound complexity" },
      { value: "A-C-A", label: "tri-layer amnion–chorion–amnion construct for the hardest wounds" },
    ],
    patient: [
      "A thin, natural graft is placed on the wound during a routine visit.",
      "Chosen by wound depth and history — including wounds that failed prior grafts.",
      "Aims to restart healing in wounds that have been stuck for weeks or months.",
    ],
    footnote:
      "Product tiers: Membrane Wrap Lite (single amnion), Membrane Wrap (dual-layer), Tri-Membrane Wrap (A-C-A). Suitability and coverage are determined at clinical assessment.",
  },
  {
    slug: "antimicrobial-silver-matrix",
    shortName: "Antimicrobial Matrix",
    name: "Microlyte® SAM Antimicrobial Matrix",
    attribution: "Sub-cytotoxic silver technology · applied by Apollo Wound Care",
    category: "Antimicrobial",
    teaser:
      "An ultra-thin conforming film that clears wound bacteria at a fraction of conventional silver — then resorbs, so removal never disrupts new tissue.",
    video: "/microlyte-loop.mp4",
    intro:
      "Infection and biofilm keep many chronic wounds locked in inflammation. Microlyte SAM is an ultra-thin, bioresorbable film that conforms to the wound's micro-contours for full surface contact, delivering effective antimicrobial protection using 50–100× less silver than conventional silver dressings — below the threshold that harms the very cells trying to heal. Because it resorbs, there is no dressing to peel away and no removal trauma to fragile new tissue.",
    stats: [
      { value: "99.99%", label: "antimicrobial kill efficacy" },
      { value: "50–100×", label: "less silver than conventional dressings" },
      { value: "91%", label: "refractory wounds healed or improved at 12 weeks", source: "Manning, n=32" },
    ],
    patient: [
      "Protects stalled or infection-prone wounds without harsh silver levels.",
      "Resorbs into the wound — no painful dressing removal.",
      "Used where biofilm or infection risk is holding healing back.",
    ],
    footnote:
      "FDA cleared. Clinical figures: Manning (n=32), refractory wounds, mean 40 weeks stalled. Applicability and coverage are determined at clinical assessment.",
  },
];

export function getTechnology(slug: string): Technology | undefined {
  return technologies.find((t) => t.slug === slug);
}
