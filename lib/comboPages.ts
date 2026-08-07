import { getBorough } from "@/lib/boroughs";
import { getService } from "@/lib/services";

/**
 * Borough × condition combination pages (SEO.md §3): high-intent local
 * long-tail pages like "Diabetic foot ulcer care in The Bronx".
 *
 * Copy rules: every entry's prose must be unique — no recycled sentences
 * between combos, no repeats of the parent borough/service page copy, and
 * no clinical statistics that aren't already cited elsewhere in the repo.
 */
export interface ComboFactor {
  title: string;
  copy: string;
}

export interface ComboFaq {
  q: string;
  a: string;
}

export interface ComboPage {
  /** Must match a slug in lib/services.ts */
  serviceSlug: string;
  /** Must match a slug in lib/boroughs.ts */
  boroughSlug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  whyLocal: string;
  localFactors: ComboFactor[];
  faq: ComboFaq[];
}

export const comboPages: ComboPage[] = [
  {
    serviceSlug: "diabetic-foot-ulcers",
    boroughSlug: "the-bronx",
    title: "Diabetic Foot Ulcer Care in The Bronx | House Calls",
    metaDescription:
      "In-home diabetic foot ulcer care across The Bronx — debridement, offloading and advanced dressings from Timothy Donoho, PA. Works with Medicare and many plans.",
    h1: "Diabetic Foot Ulcer Care in The Bronx, at Home.",
    intro:
      "A diabetic foot ulcer in the Bronx is a race against time in a borough that carries one of the heaviest diabetes burdens in New York State. Timothy Donoho, PA brings the full limb-preservation protocol — sharp debridement, offloading, infection surveillance — into Bronx homes from Mott Haven to Wakefield, so treatment never depends on a bus transfer.",
    whyLocal:
      "The Bronx carries one of the highest diabetes burdens in New York State — and diabetic feet pay the price. A foot ulcer here rarely arrives alone: many patients are already juggling dialysis, cardiology and kidney appointments, and neuropathy that hides how fast a wound is deteriorating. Asking that patient to add a weekly wound-center trip — down the stairs of a walk-up, onto a bus, across the borough — is asking them to walk on the very ulcer we're trying to offload. A house call resolves that contradiction: Timothy Donoho, PA brings sharp debridement, moisture-balanced dressings and infection surveillance to the kitchen table, checks the actual shoes and floors the foot lives on, and schedules around dialysis instead of against it. Every visit is documented and shared with your podiatrist, endocrinologist and primary care physician, so the whole Bronx care team works from one record.",
    localFactors: [
      {
        title: "One of the state's heaviest diabetes burdens",
        copy: "Diabetes rates in the Bronx are among the highest in New York State, and foot ulcers and amputations follow that curve. Limb preservation here starts with treatment that actually happens — every week, without a missed visit.",
      },
      {
        title: "Dialysis and foot ulcers travel together",
        copy: "Many Bronx patients with diabetic foot wounds already spend much of their week at dialysis. We schedule wound visits around those sessions instead of forcing a choice between them.",
      },
      {
        title: "Stairs, buses and transfers work against the foot",
        copy: "Walk-up buildings and long bus transfers put miles on an ulcer that is supposed to be offloaded. A house call takes those miles off the treatment plan entirely.",
      },
      {
        title: "One record, whole care team",
        copy: "Visit notes and wound photos go to your podiatrist, endocrinologist and primary care physician, keeping your Bronx-based specialists in the loop without another appointment.",
      },
    ],
    faq: [
      {
        q: "How often will you visit a diabetic foot ulcer in the Bronx?",
        a: "Visit frequency is set at the first assessment based on the wound's stage, drainage and infection risk — for most active diabetic foot ulcers that means weekly care, sometimes more often. Because visits come to you, the schedule can flex around dialysis and other standing appointments without gaps in treatment.",
      },
      {
        q: "Does Medicare cover diabetic foot ulcer house calls in the Bronx?",
        a: "Apollo Wound Care works with Medicare and many major insurance plans, and coverage is verified with your plan before the first visit — so you know where you stand before treatment begins. Call with your insurance information and we'll check your specific plan.",
      },
    ],
  },
  {
    serviceSlug: "diabetic-foot-ulcers",
    boroughSlug: "brooklyn",
    title: "Diabetic Foot Ulcer Care in Brooklyn | Home Visits",
    metaDescription:
      "House-call diabetic foot ulcer treatment in Brooklyn — skip the wound-center waitlist. Limb-preserving care at home, from Bay Ridge to East New York.",
    h1: "Diabetic Foot Ulcer Care in Brooklyn — Without the Waitlist.",
    intro:
      "In New York's most populous borough, a new diabetic foot ulcer can wait weeks for a wound-center opening — time that ulcer doesn't have. Apollo Wound Care skips the waitlist entirely, bringing wound assessment, debridement and an offloading plan to Brooklyn homes from Bay Ridge to East New York.",
    whyLocal:
      "A diabetic foot ulcer is decided in its first weeks — and in Brooklyn, those weeks are often spent waiting. With the city's largest borough population competing for wound-center slots, a new ulcer can sit under a drugstore bandage while the calendar fills against it. The neighborhoods farthest from hospital wound programs — East New York, Canarsie, and much of southern Brooklyn, where many seniors are aging in place — are exactly where keeping a weekly appointment is hardest. Bringing the specialist to the patient removes the waitlist and the commute in one move: Timothy Donoho, PA checks circulation and sensation in your home, debrides when clinically indicated, builds an offloading plan around the shoes you actually wear and the stairs you actually climb, and teaches family members what a warning sign looks like — so the people who see the foot every day become part of its defense.",
    localFactors: [
      {
        title: "Waitlists an ulcer can't afford",
        copy: "Brooklyn's wound clinics serve the city's largest borough population, and new-patient slots can sit weeks out. A house call starts diabetic ulcer treatment without waiting for a calendar to open.",
      },
      {
        title: "Far from the wound program",
        copy: "Hospital wound programs cluster in a few corners of the borough, leaving neighborhoods like East New York and Canarsie a long ride from specialty care. Mobile care reaches East New York as easily as Park Slope.",
      },
      {
        title: "Seniors aging in place",
        copy: "Southern Brooklyn is home to a large population of older adults managing diabetes in houses and apartments they've lived in for decades. Care that comes to them protects both the foot and the independence.",
      },
      {
        title: "Family in the room",
        copy: "Home visits let spouses and adult children see the wound, learn the dressing routine and know exactly which changes warrant a call — turning the household into an early-warning system.",
      },
    ],
    faq: [
      {
        q: "Do I still need my podiatrist if Apollo treats my foot ulcer at home in Brooklyn?",
        a: "Yes — house calls complement your existing specialists rather than replace them. Timothy Donoho, PA handles the week-to-week wound treatment and sends documentation to your podiatrist, endocrinologist and primary care physician so surgical and medication decisions stay coordinated.",
      },
      {
        q: "How fast can treatment start for a new diabetic foot ulcer in Brooklyn?",
        a: "Call and describe the wound — new diabetic foot ulcers are treated as time-sensitive, because the early weeks matter most for protecting the limb. Scheduling is arranged directly by phone, and insurance coverage is confirmed with your plan before the first visit.",
      },
    ],
  },
  {
    serviceSlug: "diabetic-foot-ulcers",
    boroughSlug: "queens",
    title: "Diabetic Foot Ulcer Care in Queens | Mobile Wound Care",
    metaDescription:
      "Mobile diabetic foot ulcer care across all of Queens — expert treatment at home so you stay off the foot, from Jackson Heights to the Rockaways.",
    h1: "Diabetic Foot Ulcer Care Across Queens, at Your Door.",
    intro:
      "Queens is where distance defeats diabetic foot care — a weekly trek from Far Rockaway or Bayside to a wound center means hours on a foot that's supposed to be resting. Apollo Wound Care reverses the commute: the specialist travels, the ulcer stays offloaded, and treatment reaches every corner of the borough.",
    whyLocal:
      "Offloading is the heart of diabetic foot ulcer treatment: stay off the wound and it can close; keep walking on it and it won't. Queens turns that instruction into a contradiction. The borough's sheer size leaves the Rockaways, College Point and much of eastern Queens far from any wound specialty program, so standard care asks patients to spend hours commuting on a foot that is supposed to be resting. Across Jamaica, Richmond Hill and Jackson Heights, that trade-off plays out in thousands of households, many multigenerational, where an adult child coordinates a parent's care between work shifts. So the practice reverses it — debridement, advanced dressings and footwear guidance happen at home, where Timothy Donoho, PA can see the actual slippers, stairs and floors a foot crosses every day, and family can join the visit instead of taking a day off to escort one.",
    localFactors: [
      {
        title: "The offloading contradiction",
        copy: "Standard care asks Queens patients to rest the foot, then commute hours each week on it. Home visits deliver the treatment without spending the foot to get it.",
      },
      {
        title: "The distance the borough built",
        copy: "From Far Rockaway to Little Neck, Queens' size leaves whole neighborhoods without a nearby wound program. Apollo covers the entire borough, edge to edge.",
      },
      {
        title: "Footwear checked where it lives",
        copy: "Offloading fails when the prescribed boot stays in the closet. Seeing the actual shoes, slippers and floors a foot crosses every day lets the plan fit real life — and stick.",
      },
      {
        title: "Multigenerational households",
        copy: "In much of Queens, an adult child or grandchild manages a parent's diabetes care. Home visits let them join the appointment at the kitchen table instead of burning a workday on an escort trip.",
      },
    ],
    faq: [
      {
        q: "Do you cover all of Queens, including the Rockaways?",
        a: "Yes — every neighborhood, from Astoria and Long Island City to Bayside, Jamaica and Far Rockaway. Distance from a wound center is exactly the problem this practice was built to solve, so no part of the borough is out of range.",
      },
      {
        q: "What happens at the first home visit for a diabetic foot ulcer in Queens?",
        a: "The first visit is a full assessment: circulation and sensation checks, wound measurement, sharp debridement if clinically indicated, an initial dressing matched to the wound's drainage, and an offloading plan built around your footwear and home. Findings are documented and shared with your existing doctors.",
      },
    ],
  },
  {
    serviceSlug: "pressure-injuries",
    boroughSlug: "brooklyn",
    title: "Pressure Injury (Bedsore) Care in Brooklyn | At Home",
    metaDescription:
      "In-home pressure injury and bedsore treatment across Brooklyn — staging, debridement and repositioning plans at the bedside, including adult-care residences.",
    h1: "Pressure Injury Care in Brooklyn, at the Bedside.",
    intro:
      "For a Brooklynite who is bed- or chair-bound, the trip to a wound clinic is itself a pressure event — hours spent seated on the very tissue that is breaking down. Apollo Wound Care treats pressure injuries where they form: in the bed, the chair and the daily routines of homes and adult-care residences across Brooklyn.",
    whyLocal:
      "A pressure injury is caused by an environment — a mattress that is too firm, a wheelchair cushion that has flattened, a repositioning routine that slips overnight. Treating it in a clinic means treating the wound while ignoring its cause, and for Brooklyn's bed- and chair-bound patients, reaching that clinic means an ambulette ride spent seated on the injury itself. Bedside treatment starts from the cause instead: Timothy Donoho, PA stages and measures the wound where it happened, debrides devitalized tissue when clinically indicated, then walks the actual room — the bed, the chair, the cushions, the turn schedule. In a borough dense with adult homes, assisted-living residences and families caring for elders after a hospitalization, each visit doubles as training: aides and relatives learn the dressing routine and repositioning plan firsthand and in writing, so care continues correctly through every shift change until the next visit.",
    localFactors: [
      {
        title: "Transport is a pressure event",
        copy: "An ambulette ride to a clinic can mean hours seated on the exact tissue that is injured. Bedside care deletes that trip from the treatment plan.",
      },
      {
        title: "Brooklyn's adult homes and assisted living",
        copy: "Brooklyn houses a large share of the city's adult-care residences. Apollo treats residents on site and aligns the plan with facility staff so care continues between visits.",
      },
      {
        title: "The wound's cause is in the room",
        copy: "Mattresses, cushions and repositioning routines are what create — and heal — pressure injuries. A home visit inspects and corrects the actual equipment, not a generic checklist.",
      },
      {
        title: "A plan every caregiver can follow",
        copy: "Aides change, shifts rotate, family fills the gaps. Each visit leaves a written dressing and turning plan simple enough to survive the handoffs.",
      },
    ],
    faq: [
      {
        q: "Can you treat a pressure injury in a Brooklyn assisted living residence or adult home?",
        a: "Yes — Apollo Wound Care regularly treats residents of adult homes and assisted living communities across Brooklyn. Visits are coordinated with facility staff, and the dressing and repositioning plan is written so on-site caregivers can carry it through between visits.",
      },
      {
        q: "How do you keep a bedsore improving between weekly visits?",
        a: "By making the between-visit plan realistic: dressings caregivers can actually change, a repositioning schedule that fits the household's routine, support-surface adjustments to the actual bed and chair, and nutrition screening — with clear instructions on which changes mean call now rather than wait.",
      },
    ],
  },
  {
    serviceSlug: "venous-leg-ulcers",
    boroughSlug: "queens",
    title: "Venous Leg Ulcer Care in Queens | In-Home Compression",
    metaDescription:
      "Venous leg ulcer treatment at home across Queens — multi-layer compression on schedule, without the trip that makes swelling worse. From Astoria to Far Rockaway.",
    h1: "Venous Leg Ulcer Care in Queens, on Schedule.",
    intro:
      "Venous leg ulcers heal most reliably with correctly applied compression, changed on schedule, week after week. In a borough as spread out as Queens, that schedule is exactly what breaks — so Apollo Wound Care brings the wrap to you, from Astoria to Far Rockaway.",
    whyLocal:
      "Compression is the backbone of venous leg ulcer treatment — and it works best when the wrap is applied correctly and changed on schedule, week after week, until the skin closes. Queens geography attacks that schedule from every side. A wrap change at a distant clinic means a long ride with legs hanging down — the exact position that feeds the swelling — and for patients in Bayside, Whitestone or the Rockaways, one missed trip hands progress straight back to the fluid the veins cannot move. Home delivery puts the schedule on the patient's side: multi-layer compression, wound cleansing and exudate management arrive at your door on a fixed rhythm; vascular screening confirms compression is safe before it starts; and elevation guidance is built around your actual furniture — the recliner, the ottoman, the bed — rather than a diagram on a discharge handout.",
    localFactors: [
      {
        title: "Compression lives or dies on schedule",
        copy: "Multi-layer wraps lose tension and must be changed on time to keep working. Home visits fix the schedule to your address, not a clinic's calendar.",
      },
      {
        title: "Transit works against your veins",
        copy: "Every hour spent standing on a bus or waiting on a platform is an hour of blood pooling in the legs. Removing the commute removes hours of swelling every week.",
      },
      {
        title: "Eastern Queens and the Rockaways, covered",
        copy: "The neighborhoods farthest from vascular and wound programs — Bayside, Whitestone, Far Rockaway — are fully in range. The wrap comes to the ulcer, not the other way around.",
      },
      {
        title: "Elevation taught on your own furniture",
        copy: "Leg elevation only happens if it is comfortable and practical. We set it up on your actual recliner and couch, not a diagram on a handout.",
      },
    ],
    faq: [
      {
        q: "Is compression therapy safe to start at home in Queens?",
        a: "Compression is only applied after a vascular screening confirms your arteries can handle it — that check is part of the first visit, and patients who need vascular studies first are referred before wrapping begins. When compression is appropriate, it starts the same day.",
      },
      {
        q: "My venous ulcer healed before and came back. Can home care change that?",
        a: "Recurrence is common when compression stops the day a wound closes. Home-based care makes the long game practical — consistent wrap changes through healing, then guidance on maintenance compression, skin care and elevation to defend the closed skin.",
      },
    ],
  },
  {
    serviceSlug: "diabetic-foot-ulcers",
    boroughSlug: "new-jersey",
    title: "Diabetic Foot Ulcer Care in New Jersey | House Calls",
    metaDescription:
      "In-home diabetic foot ulcer treatment across all 21 New Jersey counties — debridement, offloading and advanced dressings without the drive. Medicare accepted.",
    h1: "Diabetic Foot Ulcer Care Across New Jersey, at Home.",
    intro:
      "A diabetic foot ulcer doesn't care which exit you live off — and in much of New Jersey, the nearest wound center is a county away. Apollo Wound Care covers all 21 counties with the same in-home diabetic wound protocol, from Bergen County high-rises to Cape May bungalows.",
    whyLocal:
      "New Jersey runs on cars — and a diabetic foot ulcer takes the keys away. Neuropathy dulls the feedback a driver needs, an offloading boot does not belong on a gas pedal, and many patients are under explicit orders not to bear weight at all. Yet most of the state's wound programs sit on hospital campuses in a few metro corridors, leaving patients in Sussex, Warren, Ocean or Cape May counties an hour or more from care their ulcer needs weekly. Treating the entire state as one service area changes the math: the same diabetic wound protocol — circulation and sensation assessment, sharp debridement when indicated, advanced dressings, offloading strategy — is delivered in Hoboken high-rises, Freehold split-levels and shore bungalows alike. Every visit is documented for your New Jersey podiatrist, endocrinologist and primary care physician, and coverage is checked with your plan before the first appointment, so treatment starts without a road trip attached.",
    localFactors: [
      {
        title: "A foot that shouldn't be driving",
        copy: "Neuropathy, offloading boots and weight-bearing restrictions all conflict with New Jersey's car-first geography. House calls remove driving from the treatment equation.",
      },
      {
        title: "All 21 counties, one protocol",
        copy: "From Bergen to Cape May, the same diabetic wound care arrives at the door — assessment, debridement when indicated, advanced dressings and offloading — whether that door is on a shore block or a city avenue.",
      },
      {
        title: "Distance from hospital wound programs",
        copy: "Much of Sussex, Warren, Ocean and the rural south sits an hour or more from a wound center. Weekly ulcer care rarely survives that commute — home visits make the schedule hold.",
      },
      {
        title: "Coordinated with your New Jersey doctors",
        copy: "Visit documentation goes to your NJ podiatrist, endocrinologist and primary care physician, so home treatment strengthens your local care team instead of bypassing it.",
      },
    ],
    faq: [
      {
        q: "Do you really make house calls everywhere in New Jersey?",
        a: "Yes — all 21 counties, from the Hudson waterfront to the shore and the rural northwest. If your address is in New Jersey, it is in the service area; call to arrange a first visit.",
      },
      {
        q: "Does insurance cover diabetic foot ulcer house calls in New Jersey?",
        a: "Apollo Wound Care works with Medicare and many major plans. Coverage is confirmed with your specific plan before the first visit, so there are no surprises — call with your insurance details and we'll verify before anything is scheduled.",
      },
    ],
  },
];

export function getCombo(
  serviceSlug: string,
  boroughSlug: string,
): ComboPage | undefined {
  return comboPages.find(
    (c) => c.serviceSlug === serviceSlug && c.boroughSlug === boroughSlug,
  );
}

/** Combos for a given service (for cross-linking from the service page). */
export function combosForService(serviceSlug: string): ComboPage[] {
  return comboPages.filter((c) => c.serviceSlug === serviceSlug);
}

/** Combos for a given area (for cross-linking from the borough page). */
export function combosForBorough(boroughSlug: string): ComboPage[] {
  return comboPages.filter((c) => c.boroughSlug === boroughSlug);
}

/** Resolve display names, throwing at build time if a slug is stale. */
export function comboNames(c: ComboPage) {
  const service = getService(c.serviceSlug);
  const borough = getBorough(c.boroughSlug);
  if (!service || !borough) {
    throw new Error(
      `comboPages: unknown slug pair ${c.serviceSlug}/${c.boroughSlug}`,
    );
  }
  return { service, borough };
}
