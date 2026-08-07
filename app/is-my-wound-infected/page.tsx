import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import StitchDivider from "@/components/StitchDivider";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Is My Wound Infected — or Just Not Healing? How to Tell",
  description:
    "Redness, drainage, odor, black tissue — some are normal healing, some mean infection or a stalled wound. A plain-language guide to the difference, the signs that mean call 911, and what an in-home wound evaluation looks like across NYC and New Jersey.",
  alternates: { canonical: "/is-my-wound-infected" },
};

interface SignItem {
  sign: string;
  meaning: string;
}

const healingStages: SignItem[] = [
  {
    sign: "The first few days: expected inflammation",
    meaning:
      "Mild redness right at the wound edge, warmth, slight swelling, and thin, clear-to-yellowish drainage are the body's normal opening move — inflammation is how healing starts, not a sign it's failing.",
  },
  {
    sign: "Early on: quieting down",
    meaning:
      "The early redness and swelling should recede, drainage should taper, and pain should ease a little each day. The wound edges begin to pull inward, and the base starts to look moist and pink-to-red.",
  },
  {
    sign: "As the weeks pass: visible progress",
    meaning:
      "The wound gets measurably smaller. The base fills with healthy, beefy-red tissue (granulation), and new skin creeps in from the edges — a straightforward wound is visibly shrinking.",
  },
  {
    sign: "The one rule that matters",
    meaning:
      "Compare week to week, not day to day. If your wound looks the same — or worse — than it did a week ago, something is holding it back, and it's worth finding out what.",
  },
];

const infectionSigns: SignItem[] = [
  {
    sign: "Redness spreading beyond the wound edge",
    meaning:
      "A thin rim of redness early on is normal. Redness that marches outward — especially warm, tender skin expanding day by day — can signal a spreading skin infection (cellulitis) that needs prompt medical attention.",
  },
  {
    sign: "Pain that's increasing, not easing",
    meaning:
      "Healing wounds hurt less over time. A wound that hurts more this week than last — or a new, deep, throbbing pain — is a warning sign worth acting on.",
  },
  {
    sign: "Drainage that's increasing or changing character",
    meaning:
      "Some drainage is normal. A sudden increase, a change to thick, cloudy or foul-smelling fluid, or drainage soaking through dressings can signal infection or a wound that is deteriorating.",
  },
  {
    sign: "A persistent bad smell",
    meaning:
      "A foul odor that lingers after cleansing often points to bacterial colonization, biofilm, or dead tissue in the wound — all of which keep a wound from healing and should be assessed promptly.",
  },
  {
    sign: "New swelling and warmth around the wound",
    meaning:
      "Skin around the wound that's becoming puffy, tight, shiny or hot suggests the tissue underneath is inflamed or infected — particularly if it appears after the wound had been settling down.",
  },
  {
    sign: "Fever, chills, or feeling generally unwell",
    meaning:
      "Whole-body symptoms alongside a wound suggest the infection may be moving beyond the wound itself. This is urgent — see the red flags below.",
  },
];

const stalledSigns: SignItem[] = [
  {
    sign: "No visible change for weeks",
    meaning:
      "Same size, same depth, same appearance week after week. Chronic wounds stall for identifiable reasons — poor circulation, infection and biofilm, excess wound enzymes, unrelieved pressure, or nutrition — and treatment starts with finding which one is holding yours back.",
  },
  {
    sign: "A pale or yellow-coated wound bed",
    meaning:
      "A healthy healing wound bed is moist and red. A base that stays pale, dusky, or coated in soft yellow tissue (slough) isn't building new tissue — it's stuck.",
  },
  {
    sign: "Black or dark leathery tissue",
    meaning:
      "This is usually eschar — dead tissue — and it physically blocks healing while feeding bacteria underneath. It may need debridement, or in some cases is deliberately left intact. That's a judgment call for a wound specialist in person — not something to treat yourself.",
  },
  {
    sign: "Rolled or raised wound edges",
    meaning:
      "Edges that thicken and curl under instead of creeping inward are a classic sign a wound has been open too long and has stopped trying to close.",
  },
  {
    sign: "A wound that 'heals' and then reopens",
    meaning:
      "Closing and breaking down again — common with venous leg ulcers and pressure injuries — means the underlying cause was never addressed. The wound will keep returning until it is.",
  },
];

const redFlags: string[] = [
  "Spreading redness around a wound plus fever, chills, or feeling very unwell — treat this as an emergency and call 911 or go to an emergency room",
  "Red streaks running from the wound up the limb toward the body",
  "Pain, swelling, or foul-smelling drainage that is worsening rapidly — over hours, not days",
  "Skin around the wound turning dusky, purple, or black with severe pain that seems out of proportion to how the wound looks",
  "A foot or leg below the wound turning suddenly cold, pale, or blue",
  "Bleeding that won't stop despite firm, direct pressure",
];

const faqs = [
  {
    q: "How can I tell the difference between normal healing redness and infection?",
    a: "Normal healing redness stays in a thin rim at the wound edge and fades over the first week or two. Infection-related redness does the opposite — it spreads outward, feels warm and tender, and often arrives with increasing pain, swelling, or a change in drainage. Direction of travel is the tell: fading redness is healing; expanding redness needs prompt evaluation.",
  },
  {
    q: "When is a wound officially considered non-healing or chronic?",
    a: "A wound is generally considered non-healing when it hasn't shown meaningful improvement after about 30 days of standard wound care. At that point the wound is stalled, and stalled wounds usually need the underlying cause identified — circulation, infection and biofilm, pressure, or nutrition — and a treatment matched to it, not more of the same dressing.",
  },
  {
    q: "Can an infected or stalled wound really be treated at home?",
    a: "Yes. Apollo Wound Care brings the same clinical capabilities you'd find in an outpatient wound clinic — assessment, sharp debridement, advanced dressings, negative pressure therapy, and advanced adjunctive modalities when clinically appropriate — to homes across all five NYC boroughs and all of New Jersey. Wounds that need hospital-level care are identified at evaluation and escalated, in coordination with your existing doctors.",
  },
  {
    q: "Should I put anything on the wound while I wait to be seen?",
    a: "Keep it simple: keep the wound covered with a clean dressing, follow any instructions you've already been given, and avoid hydrogen peroxide, alcohol, or home remedies on the wound bed — harsh agents can damage the very tissue trying to heal. If there's black or leathery tissue, leave it alone entirely; whether it should be removed is a specialist's call to make in person.",
  },
];

export default function WoundInfectedGuide() {
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Is My Wound Infected — or Just Not Healing?",
    description: metadata.description,
    url: `${site.url}/is-my-wound-infected`,
    about: { "@type": "MedicalCondition", name: "Wound infection" },
    provider: { "@id": `${site.url}/#organization` },
    reviewedBy: { "@id": `${site.url}/about#provider` },
    isPartOf: { "@id": `${site.url}/#website` },
    inLanguage: "en-US",
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Is My Wound Infected?" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([pageLd, faqLd, breadcrumbLd]),
        }}
      />

      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Is My Wound Infected?</span>
          </nav>
          <span className="eyebrow">Patient guide</span>
          <h1>Is My Wound Infected — or Just Not Healing?</h1>
          <p className="section-lede">
            Every wound produces some redness, drainage and discomfort — the
            question is whether yours is following the normal healing script or
            drifting off it. This guide walks through what healing should look
            like, the signs that point toward infection, the quieter signs that
            a wound has stalled, and exactly what to do next. If any of it
            sounds like your wound, an evaluation can happen in your own home.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">The baseline</span>
            <h2 className="section-title">What normal healing looks like.</h2>
            <p className="section-lede">
              Healing follows a script. The details vary with the wound, your
              circulation and your overall health — but the direction of travel
              doesn&apos;t. A healing wound looks a little better each week.
              That trajectory, more than any single symptom, is what separates a
              wound that&apos;s on track from one that isn&apos;t.
            </p>
          </Reveal>
          <div className="grid-cards" style={{ marginTop: "2rem" }}>
            {healingStages.map((s, i) => (
              <Reveal key={s.sign} delay={i * 0.06} className="card">
                <span className="card-eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.sign}</h3>
                <p>{s.meaning}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Warning signs</span>
            <h2 className="section-title">Signs your wound may be infected.</h2>
            <p className="section-lede">
              Infection tends to announce itself by breaking the healing script:
              things that should be fading start increasing instead. No single
              sign is proof on its own — but the more of these you&apos;re
              seeing, and the more they&apos;re trending the wrong way, the more
              your wound needs prompt evaluation rather than watchful waiting.
            </p>
          </Reveal>
          <div className="grid-cards" style={{ marginTop: "2rem" }}>
            {infectionSigns.map((s, i) => (
              <Reveal key={s.sign} delay={Math.min(i * 0.06, 0.25)} className="card">
                <h3>{s.sign}</h3>
                <p>{s.meaning}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-night">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Emergency signs</span>
            <h2 className="section-title">Red flags — don&apos;t wait for a visit.</h2>
            <p className="section-lede">
              These signs can mean a spreading or deep infection, or a
              circulation emergency. Call 911 or go to an emergency room —
              evaluation at home is for everything above this list, not this
              list.
            </p>
          </Reveal>
          <ul className="detail-list" style={{ marginTop: "2rem" }}>
            {redFlags.map((f) => (
              <Reveal key={f}>
                <li>{f}</li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">The quiet failure mode</span>
            <h2 className="section-title">Signs your wound has stalled.</h2>
            <p className="section-lede">
              A stalled wound is different from an infected one — quieter, and
              easier to ignore. Nothing dramatic happens; the wound simply stops
              making progress. The benchmark clinicians use: a wound that
              hasn&apos;t meaningfully improved after about 30 days of standard
              care is, by definition, a non-healing wound — and stalled wounds
              usually need a different approach, not more of the same dressing.
            </p>
          </Reveal>
          <div className="grid-cards" style={{ marginTop: "2rem" }}>
            {stalledSigns.map((s, i) => (
              <Reveal key={s.sign} delay={Math.min(i * 0.06, 0.25)} className="card">
                <h3>{s.sign}</h3>
                <p>{s.meaning}</p>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: "2.5rem" }}>
            <Reveal>
              <Link href="/non-healing-wounds" className="btn btn-primary">
                See the non-healing wound program →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container grid-2 grid-2-top">
          <Reveal>
            <span className="eyebrow">What to do next</span>
            <h2 className="section-title">Don&apos;t wait it out.</h2>
            <p className="section-lede">
              Take a photo of the wound today so you can compare honestly in a
              week. Keep dressings clean and change them as instructed — a wound
              needs balanced moisture, not drying out and not soaking. Skip
              harsh agents like hydrogen peroxide or alcohol on the wound bed,
              and never cut, pick at, or apply home remedies to black tissue.
              Then make the call: if you&apos;re seeing infection signs, ask for
              an urgent evaluation — urgent wounds are prioritized. If your
              wound has simply gone weeks without progress, that&apos;s reason
              enough. No referral is required — you, a family member, a
              home-care agency or a physician can reach out directly, and{" "}
              {site.provider.fullTitle} comes to you anywhere in NYC&apos;s five
              boroughs or New Jersey&apos;s 21 counties.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <aside className="aside-card">
              <h3>What the first visit checks</h3>
              <p
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--ink-2)",
                  marginTop: "0.7rem",
                  lineHeight: 1.6,
                }}
              >
                When the concern is infection or a stall, the evaluation starts
                with <em>why</em>: circulation and sensation are checked, the
                wound is measured, photographed and staged, and dressings and
                history are reviewed against the usual suspects — pressure,
                bacteria and biofilm, moisture imbalance, blood supply.
                Debridement can begin the same day when appropriate, and you get
                a written plan naming the suspected cause and what changes this
                week. Findings go to your existing doctors; if the wound is
                truly stalled, the plan escalates to advanced modalities matched
                to the cause.
              </p>
              <a href={`tel:${site.phoneHref}`} className="btn btn-primary">
                Call {site.phone}
              </a>
              <Link href="/contact" className="btn btn-ghost">
                Request a Visit
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Common questions</span>
            <h2 className="section-title">Infected vs. stalled, answered.</h2>
          </Reveal>
          <div className="grid-2" style={{ marginTop: "2rem" }}>
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <h3 style={{ fontSize: "var(--text-lg)" }}>{f.q}</h3>
                <p style={{ marginTop: "0.6rem", color: "var(--ink-2)" }}>{f.a}</p>
              </Reveal>
            ))}
          </div>
          <StitchDivider />
          <p className="tech-footnote">
            This guide is educational and is not a diagnosis. Only an in-person
            clinical evaluation can determine whether a wound is infected,
            stalled, or both. If you have signs of a spreading infection with
            fever or feel very unwell, call 911 or go to an emergency room.
          </p>
        </div>
      </section>

      <CTABand
        title="Not sure which category your wound is in?"
        copy={`That's exactly what an evaluation answers. ${site.provider.fullTitle} assesses the wound at home, identifies what's holding it back, and starts treatment the same day when appropriate.`}
      />
    </>
  );
}
