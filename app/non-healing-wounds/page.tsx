import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ResultStat from "@/components/ResultStat";
import CTABand from "@/components/CTABand";
import StitchDivider from "@/components/StitchDivider";
import { site } from "@/lib/site";
import { technologies } from "@/lib/technology";
import { boroughs } from "@/lib/boroughs";

export const metadata: Metadata = {
  title: "Non-Healing & Chronic Wound Care at Home in NYC",
  description:
    "A wound that won't heal is a stalled wound — and it needs a different plan. Apollo Wound Care treats complex, chronic and non-healing ulcers at home across NYC with advanced modalities: UltraMIST® ultrasound, amniotic allografts, antimicrobial matrix and collagen. Led by Timothy Donoho, PA.",
  alternates: { canonical: "/non-healing-wounds" },
  keywords: [
    "non-healing wound treatment NYC",
    "chronic wound care at home",
    "wound that won't heal",
    "complex wound care New York",
    "non-healing diabetic ulcer",
    "stalled wound treatment",
    "chronic venous ulcer treatment NYC",
  ],
};

const reasons = [
  {
    n: "01",
    t: "Poor circulation",
    c: "Without enough blood flow, tissue can't get the oxygen and nutrients it needs to rebuild. Common in diabetic and arterial wounds.",
  },
  {
    n: "02",
    t: "Infection & biofilm",
    c: "A protective bacterial film shields microbes from the immune system and keeps the wound locked in inflammation. Present in 60–90% of chronic wounds.",
  },
  {
    n: "03",
    t: "Runaway wound enzymes",
    c: "Chronic wounds overproduce enzymes (MMPs) — up to 30× normal — that destroy the growth factors and matrix a wound needs to close.",
  },
  {
    n: "04",
    t: "Unrelieved pressure",
    c: "Wounds over pressure points can't heal while the pressure that caused them continues. The home environment is where this is actually fixed.",
  },
  {
    n: "05",
    t: "Nutrition & whole-person factors",
    c: "Healing requires protein, calories and managed underlying conditions. A home visit sees the full picture a clinic can't.",
  },
];

const headlineStats = [
  { value: "30", label: "days on standard care without improvement — the benchmark for a stalled wound", source: "" },
  { value: "60–90%", label: "of chronic wounds harbor biofilm" },
  { value: "40 kHz", label: "non-contact ultrasound we bring to the bedside" },
  { value: "5", label: "NYC boroughs served, wherever you live" },
];

export default function NonHealingWoundsPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What counts as a non-healing or chronic wound?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A wound is generally considered non-healing or chronic when it has not shown meaningful improvement after about 30 days of standard wound care. These wounds are stalled in the healing process and typically need advanced treatment matched to the underlying cause.",
        },
      },
      {
        "@type": "Question",
        name: "Why won't my wound heal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Chronic wounds usually stall for one or more identifiable reasons: poor circulation, infection and biofilm, an excess of destructive wound enzymes (MMPs), unrelieved pressure, or nutritional and whole-person factors. Effective treatment starts by identifying which of these is holding your wound back, then targeting it directly.",
        },
      },
      {
        "@type": "Question",
        name: "Can a non-healing wound be treated at home?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Apollo Wound Care treats complex and non-healing wounds in the home across all five NYC boroughs, bringing the same advanced modalities used in outpatient wound centers — including non-contact UltraMIST ultrasound, amniotic allografts, antimicrobial matrix and collagen — directly to the patient, and coordinating with your existing physicians.",
        },
      },
    ],
  };
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Non-Healing & Chronic Wound Care at Home in NYC",
    description:
      "In-home treatment for complex, chronic and non-healing wounds and ulcers across all five NYC boroughs, led by Timothy Donoho, PA.",
    about: {
      "@type": "MedicalCondition",
      name: "Chronic wound",
      alternateName: ["Non-healing wound", "Non-healing ulcer", "Chronic ulcer"],
    },
    medicalAudience: { "@type": "MedicalAudience", audienceType: "Patient" },
    lastReviewed: "2026-07-30",
    reviewedBy: { "@id": `${site.url}/about#provider` },
    author: { "@id": `${site.url}/about#provider` },
    isPartOf: { "@id": `${site.url}/#website` },
    provider: { "@id": `${site.url}/#organization` },
    inLanguage: "en-US",
    url: `${site.url}/non-healing-wounds`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([pageLd, faqLd]) }}
      />

      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Non-Healing Wounds</span>
          </nav>
          <span className="eyebrow">A wound that won&apos;t heal needs a different plan</span>
          <h1>Non-Healing &amp; Chronic Wound Care, at Home Across NYC.</h1>
          <p className="section-lede">
            If an ulcer or wound has gone months without closing, it isn&apos;t failing
            because you did something wrong — it&apos;s stalled, and stalled wounds need a
            reason found and a treatment matched to it. Apollo Wound Care treats complex,
            chronic and non-healing wounds at your bedside, in every borough of New York
            City.
          </p>
          <div className="hero-actions">
            <a href={`tel:${site.phoneHref}`} className="btn btn-primary btn-lg">
              Call {site.phone}
            </a>
            <Link href="/contact" className="btn btn-ghost btn-lg">
              Request an Evaluation
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-night results-band">
        <div className="container">
          <Reveal>
            <span className="eyebrow">The reality of chronic wounds</span>
            <h2 className="section-title">The numbers behind a stalled wound.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rstat-grid">
              {headlineStats.map((s) => (
                <ResultStat key={s.label} stat={s} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Why wounds stall</span>
            <h2 className="section-title">Five reasons a wound stops healing.</h2>
            <p className="section-lede">
              Almost every non-healing wound is held back by one or more of these. The
              first visit is about finding which — because the fix depends entirely on the
              cause.
            </p>
          </Reveal>
          <div className="reasons">
            {reasons.map((r, i) => (
              <Reveal key={r.n} delay={Math.min(i * 0.06, 0.3)} className="reason">
                <span className="reason-n">{r.n}</span>
                <div>
                  <h3>{r.t}</h3>
                  <p>{r.c}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <Reveal>
            <span className="eyebrow">How we escalate</span>
            <h2 className="section-title">Advanced modalities, matched to the cause.</h2>
            <p className="section-lede">
              When standard dressings aren&apos;t enough, these are the tools that move a
              stalled wound — the same ones used in hospital wound centers, brought to your
              home.
            </p>
          </Reveal>
          <div className="grid-cards">
            {technologies.map((t, i) => (
              <Reveal key={t.slug} delay={Math.min(i * 0.06, 0.24)}>
                <Link href={`/technology/${t.slug}`} className="card service-card">
                  <span className="card-eyebrow">{t.category}</span>
                  <h3 style={{ marginTop: "0.7rem" }}>{t.shortName}</h3>
                  <p>{t.teaser}</p>
                  <span className="card-link">
                    Learn more <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2 grid-2-top">
          <Reveal>
            <span className="eyebrow">Who we help</span>
            <h2 className="section-title">Built for the hardest wounds.</h2>
            <p className="section-lede">
              Apollo Wound Care is often the team called when a wound has already been
              through others. We routinely treat:
            </p>
            <ul className="detail-list detail-list-links">
              <li>
                <Link href="/services/diabetic-foot-ulcers">
                  Non-healing diabetic foot ulcers
                </Link>{" "}
                that keep reopening or won&apos;t close
              </li>
              <li>
                <Link href="/services/venous-leg-ulcers">Venous leg ulcers</Link> that
                return after &quot;healing&quot;
              </li>
              <li>
                <Link href="/services/pressure-injuries">Pressure injuries</Link> in bed-
                or chair-bound patients
              </li>
              <li>
                <Link href="/services/arterial-ulcers">Arterial and ischemic wounds</Link>{" "}
                needing careful, coordinated care
              </li>
              <li>
                <Link href="/services/surgical-wounds">Surgical wounds</Link> that opened
                (dehiscence) or won&apos;t close
              </li>
              <li>
                Wounds that have failed prior{" "}
                <Link href="/technology/amniotic-membrane-allografts">grafts</Link> or
                advanced dressings
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.12}>
            <aside className="aside-card" style={{ position: "static" }}>
              <h3>Serving your borough</h3>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--ink-2)", marginTop: "0.6rem" }}>
                In-home complex and non-healing wound care, wherever you are in the city.
              </p>
              <div className="aside-links">
                {boroughs.map((b) => (
                  <Link key={b.slug} href={`/service-areas/${b.slug}`}>
                    Non-healing wound care in {b.name} →
                  </Link>
                ))}
              </div>
              <div className="aside-links" style={{ borderTop: "1px solid var(--line)", paddingTop: "1.2rem" }}>
                <strong>Prefer to talk it through?</strong>
                <a href={`tel:${site.phoneHref}`}>Call {site.phone} →</a>
                <Link href="/contact">Request an evaluation online →</Link>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <StitchDivider />
          <p className="tech-footnote">
            Content on this page is general information, not medical advice. Advanced
            modalities are used adjunctively and only when clinically appropriate;
            candidacy and insurance coverage are determined at assessment. If you are
            experiencing a medical emergency, call 911.
          </p>
        </div>
      </section>

      <CTABand
        title="Send us the wound that won't heal."
        copy={`Call and describe it, or request a visit online. ${site.provider.fullTitle} will evaluate why it stalled and build the plan to close it — in your home, on your schedule.`}
      />
    </>
  );
}
