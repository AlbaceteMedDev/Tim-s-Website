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
 * Specific FDA 510(k) / HCPCS identifiers are intentionally NOT published for
 * the amniotic and antimicrobial entries: the source material assigned the same
 * code (K153756 / A2005) to two distinct products, so those clearance numbers
 * must be human-verified against the FDA 510(k) database before being stated on
 * a patient-facing page. Miro3D is the exception — its K221520 clearance is
 * stated unambiguously in Albacete MedDev's own physician guide for the product
 * it distributes, so that number is sourced and safe to cite.
 *
 * EVIDENCE NOTE (Miro3D): the published base is one retrospective case series
 * (11 patients / 13 wounds), a single-case report and conference material, with
 * no randomised or comparative data. The manufacturer's own guide instructs
 * that this be used "for mechanism and plausibility, not as evidence of benefit."
 * Accordingly this page carries NO outcome statistics — do not add any.
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
  category: "Ultrasound therapy" | "Biologic graft" | "Antimicrobial" | "Wound matrix";
  /** One-line teaser for cards + meta. */
  teaser: string;
  /** Lead paragraph. */
  intro: string;
  /** Hero image in /public, if any. */
  image?: string;
  /** Hero video loop in /public, if any (used in the dark product hero). */
  video?: string;
  /** Optional H.264 fallback for browsers without VP9/WebM support. */
  videoFallback?: string;
  /** Poster image for the video — shown while it loads, so the frame is never blank. */
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
    video: "/amniotic-loop.webm",
    videoFallback: "/amniotic-loop.mp4",
    poster: "/amniotic-poster.jpg",
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
    video: "/microlyte-loop.webm",
    videoFallback: "/microlyte-loop.mp4",
    poster: "/microlyte-poster.jpg",
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
  {
    slug: "miro3d-wound-matrix",
    shortName: "Miro3D® Matrix",
    name: "Miro3D® Three-Dimensional Wound Matrix",
    attribution: "Reprise Biomedical Miro3D® · applied by Apollo Wound Care",
    category: "Wound matrix",
    teaser:
      "A 2 cm-thick, open-porous scaffold that fills a deep wound rather than covering it — built for cavities, tunnels and undermined edges.",
    video: "/miro3d-loop.webm",
    videoFallback: "/miro3d-loop.mp4",
    poster: "/miro3d-poster.jpg",
    intro:
      "Some wounds are not a surface — they are a space. A flat sheet graft laid over a deep, tunnelling or undermined wound leaves dead space underneath it, and dead space is where healing stalls. Miro3D is different in kind: a 2 cm-thick, open-porous acellular scaffold that is trimmed at the bedside to the shape of the defect and packed into it, holding contact with the wound's walls and base instead of just its rim. It is made from porcine liver — chosen because the liver is the body's most densely vascularised organ, so once its cells are washed out the collagen left behind is a naturally open, interconnected three-dimensional network rather than a flat plane. Host tissue then grows into that open structure from the surrounding wound.",
    effects: [
      {
        label: "Step 01",
        title: "Fill the dead space",
        copy: "At 2 cm thick the matrix is a volume, not a film. Trimmed to the defect, it occupies the cavity a flat graft would bridge over — the space where deep wounds stall.",
      },
      {
        label: "Step 02",
        title: "Hold contact with walls and base",
        copy: "Cut to shape so it sits in maximum possible contact with healthy, well-vascularised tissue — the sides and floor of the wound, not only the surface rim.",
      },
      {
        label: "Step 03",
        title: "Let tissue grow in",
        copy: "The scaffold stays open and porous so host tissue can integrate into it. Once it has integrated it is deliberately left in place rather than stripped back out.",
      },
    ],
    specs: [
      { k: "Source", v: "Perfusion-decellularised porcine liver" },
      { k: "Thickness", v: "2 cm — a volume, not a sheet" },
      { k: "Sizes", v: "Ten, from 8 cm³ to 100 cm³" },
      { k: "Prepared", v: "Trimmed to shape, hydrated ≥ 5 min" },
      { k: "Sterilisation", v: "Electron-beam · single use · MR safe" },
      { k: "Regulatory", v: "FDA 510(k) cleared" },
    ],
    stats: [],
    patient: [
      "Built for wounds with depth — cavities, tunnels and undermined edges a flat dressing can bridge over.",
      "The scaffold is trimmed to fit your wound during a normal home visit and packed into the space.",
      "Once your own tissue grows into it, it is left in place rather than removed.",
      "Used for partial- and full-thickness wounds, ulcers, tunnelled and undermined wounds and surgical wounds.",
    ],
    footnote:
      "Miro3D® is a registered trademark of Reprise Biomedical, Inc.; Albacete MedDev is an independent distributor and not the manufacturer. FDA 510(k) cleared (K221520) for partial- and full-thickness wounds, ulcers, tunnelled and undermined wounds and surgical wounds. Published clinical experience is limited to a small retrospective case series (Abdo & Couch, J Wound Care 2024;33(Sup9):S5–S16), a single-case report and conference material — there are no randomised or comparative results, and larger trials are enrolling but have not reported. Contraindicated in patients with known sensitivity to porcine material and not indicated for third-degree burns; not applied until infection, bleeding and excessive exudate are controlled. Candidacy and coverage are determined at clinical assessment.",
  },
];

export function getTechnology(slug: string): Technology | undefined {
  return technologies.find((t) => t.slug === slug);
}
