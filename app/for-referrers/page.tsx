import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import StitchDivider from "@/components/StitchDivider";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "For Physicians & Home-Health Agencies — Refer a Patient",
  description:
    "Refer patients to Apollo Wound Care for in-home wound care across NYC's five boroughs and all of New Jersey — visit notes and photos back to you, coverage verified first.",
  alternates: { canonical: "/for-referrers" },
};

const audiences = [
  {
    who: "Physicians & podiatrists",
    pitch:
      "You already know which patients won't make it back for a weekly debridement or compression wrap — transportation, mobility, or geography gets in the way. Apollo Wound Care picks up exactly there, running the same clinical playbook you'd expect from a wound center, with visit notes and wound photos returned to you after every visit so you stay the physician of record.",
  },
  {
    who: "Home health agencies",
    pitch:
      "Add a wound specialist to a case without adding another intake headache. Timothy Donoho, PA coordinates directly with your care team, documents every visit, and flags anything that needs a nurse's or aide's attention between our stops — so wound care stays part of the plan, not a gap in it.",
  },
  {
    who: "Case managers & discharge planners",
    pitch:
      "A patient going home with an open surgical incision or a fresh wound VAC shouldn't wait weeks for the first outpatient follow-up. Refer before or at discharge and a first visit is typically on the calendar within a few business days — so the first wound check isn't sitting on a waitlist while the surgical site is on its own.",
  },
  {
    who: "SNF & assisted-living operators",
    pitch:
      "Residents with pressure injuries or stalled wounds get an on-site specialist without a transport van, a missed meal, or a half-day absence from the facility. Visits work around your schedule, and documentation flows back to your clinical team so their plan and ours stay in sync.",
  },
];

const valueProps = [
  {
    title: "Seen within days, typically",
    copy: "Most referrals are on the schedule within a few business days, and urgent wounds are prioritized. Call, email, or submit online and we confirm scheduling directly.",
  },
  {
    title: "Visit notes and photos, back to you",
    copy: "After every visit — not just at discharge — you get notes and wound photos documenting what changed. Good wound care is a team sport; we keep you on the team.",
  },
  {
    title: "Advanced modalities, at the bedside",
    copy: "Non-contact UltraMIST® low-frequency ultrasound therapy, human placental (amniotic membrane) allografts from single- to tri-layer, and Microlyte® SAM antimicrobial matrix — the same adjunctive tools used in outpatient wound centers, brought to the patient when standard dressings have stalled. Candidacy and coverage are determined at assessment.",
  },
  {
    title: "Coverage verification, handled",
    copy: "We work with Medicare and many major plans and verify the patient's benefits before the first visit — so a referral doesn't turn into a billing surprise for the patient or a callback for you.",
  },
  {
    title: "One partner for NYC and all of New Jersey",
    copy: "All five NYC boroughs and all 21 New Jersey counties, from Bergen to Cape May, covered by a single referral relationship — no separate agency to find when a patient's address changes.",
  },
];

const howItWorks = [
  {
    step: "Send the referral",
    copy: "Call, email, or use the online request form. Include the patient's name, borough or New Jersey county, and a description of the wound — a written order isn't required to get started, though we'll coordinate one with you when a specific therapy or insurance requires it.",
  },
  {
    step: "Benefits verified",
    copy: "We check Medicare and major-plan coverage before the first visit, so coverage questions surface before treatment begins, not after — and we follow up with you or the patient if anything needs clarifying.",
  },
  {
    step: "First visit, typically within a few business days",
    copy: "Timothy Donoho, PA evaluates the patient at home: the wound is measured, photographed and staged, circulation and history are reviewed, and treatment begins the same day whenever appropriate. Urgent wounds are prioritized.",
  },
  {
    step: "Ongoing documentation",
    copy: "Visit notes and wound photos come back to you on an ongoing basis, plus direct outreach when something changes that you or the care team should know about.",
  },
];

const faqs = [
  {
    q: "How do I refer a patient?",
    a: "Call, email, or use the contact form — whichever is fastest for you. There's no required referral form; tell us about the patient and the wound and we take it from there. If a written order becomes necessary for a specific therapy or a plan's requirements, we coordinate it with your office directly.",
  },
  {
    q: "How quickly can a referred patient be seen?",
    a: "In most cases, we can get a first visit on the schedule within a few business days of the referral, and urgent wounds are prioritized. Call and we'll confirm the earliest slot available for the patient's borough or county.",
  },
  {
    q: "What documentation do I receive after each visit?",
    a: "Visit notes and wound photos go to the referring physician, involved specialists and the patient's home health agency as care progresses, so you can track the wound without having to ask for an update.",
  },
];

export default function ForReferrersPage() {
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Refer a Patient to Apollo Wound Care",
    description: metadata.description,
    url: `${site.url}/for-referrers`,
    audience: { "@type": "Audience", audienceType: "Physicians, home health agencies, case managers" },
    provider: { "@id": `${site.url}/#organization` },
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
      { "@type": "ListItem", position: 2, name: "For Referrers" },
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
            <span>For Referrers</span>
          </nav>
          <span className="eyebrow">Physicians · Agencies · Facilities</span>
          <h1>Refer a Patient — We Handle the Rest, at Their Door.</h1>
          <p className="section-lede">
            When a patient needs wound care but getting to your office, a wound
            center, or a follow-up appointment isn&apos;t realistic, refer them
            to Apollo Wound Care. {site.provider.fullTitle} (NPI{" "}
            {site.provider.npi}) brings hospital-grade wound treatment directly
            to the patient — home, family member&apos;s home, or facility room —
            across all five NYC boroughs and every county in New Jersey, and
            reports back after every visit so you stay in the loop on the case
            you referred.
          </p>
          <div className="hero-actions">
            <a href={`tel:${site.phoneHref}`} className="btn btn-primary btn-lg">
              Refer by phone: {site.phone}
            </a>
            <Link href="/contact" className="btn btn-ghost btn-lg">
              Refer online
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Who refers to us</span>
            <h2 className="section-title">Built to plug into your care team.</h2>
          </Reveal>
          <div className="grid-cards" style={{ marginTop: "2rem" }}>
            {audiences.map((a, i) => (
              <Reveal key={a.who} delay={i * 0.06} className="card">
                <span className="card-eyebrow">{a.who}</span>
                <p style={{ marginTop: "0.8rem" }}>{a.pitch}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Why practices refer here</span>
            <h2 className="section-title">What your referral gets.</h2>
          </Reveal>
          <div className="grid-cards" style={{ marginTop: "2rem" }}>
            {valueProps.map((v, i) => (
              <Reveal key={v.title} delay={Math.min(i * 0.06, 0.25)} className="card">
                <span className="card-eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <h3>{v.title}</h3>
                <p>{v.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">The process</span>
            <h2 className="section-title">From referral to first visit.</h2>
          </Reveal>
          <div style={{ marginTop: "2rem" }}>
            {howItWorks.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.05} className="reason">
                <span className="reason-n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{s.step}</h3>
                  <p>{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Referrer questions</span>
            <h2 className="section-title">The details, answered.</h2>
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
        </div>
      </section>

      <CTABand
        title="Have a patient in mind right now?"
        copy={`Call ${site.phone} with the patient's name, area and wound details — we'll take it from there and keep you posted after every visit.`}
      />
    </>
  );
}
