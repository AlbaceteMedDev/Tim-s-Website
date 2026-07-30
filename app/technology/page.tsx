import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ResultStat from "@/components/ResultStat";
import CTABand from "@/components/CTABand";
import { technologies } from "@/lib/technology";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Advanced Wound-Healing Technology in NYC",
  description:
    "The advanced modalities Apollo Wound Care brings to the bedside for complex and non-healing wounds: non-contact UltraMIST® ultrasound, amniotic allografts, and antimicrobial silver matrix — with the science behind each.",
  alternates: { canonical: "/technology" },
};

const headline = [
  { value: "40 kHz", label: "non-contact ultrasound to the wound bed" },
  { value: "25+", label: "growth factors in placental allografts" },
  { value: "99.99%", label: "antimicrobial matrix kill efficacy" },
  { value: "91%", label: "refractory wounds healed or improved at 12 weeks" },
];

export default function TechnologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Advanced Wound-Healing Technology",
    description:
      "Advanced wound-healing modalities for complex and non-healing wounds, delivered in the home across NYC.",
    about: {
      "@type": "MedicalTherapy",
      name: "Advanced wound-healing technology",
    },
    provider: { "@id": `${site.url}/#organization` },
    reviewedBy: { "@id": `${site.url}/about#provider` },
    isPartOf: { "@id": `${site.url}/#website` },
    inLanguage: "en-US",
    url: `${site.url}/technology`,
    significantLink: technologies.map((t) => `${site.url}/technology/${t.slug}`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Technology</span>
          </nav>
          <span className="eyebrow">Advanced modalities</span>
          <h1>Hospital-grade wound technology, carried to your door.</h1>
          <p className="section-lede">
            When a wound refuses to close, the answer is rarely more of the same dressing.
            Apollo Wound Care brings the advanced modalities usually reserved for
            outpatient wound centers into the home — and matches each one to the specific
            reason your wound has stalled.
          </p>
        </div>
      </section>

      {/* headline results band */}
      <section className="section section-night results-band">
        <div className="container">
          <Reveal>
            <span className="eyebrow">By the numbers</span>
            <h2 className="section-title">The science, quantified.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rstat-grid">
              {headline.map((s) => (
                <ResultStat key={s.label} stat={s} />
              ))}
            </div>
          </Reveal>
          <p className="results-note">
            Figures reflect manufacturer and published clinical data for each modality;
            individual candidacy and coverage are determined at clinical assessment.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">The toolkit</span>
            <h2 className="section-title">Three platforms, three failure points.</h2>
          </Reveal>
          <div className="tech-list">
            {technologies.map((t, i) => (
              <Reveal key={t.slug} delay={Math.min(i * 0.08, 0.3)}>
                <Link href={`/technology/${t.slug}`} className="tech-row">
                  <span className="tech-row-cat">{t.category}</span>
                  <div className="tech-row-main">
                    <h3>{t.name}</h3>
                    <p>{t.teaser}</p>
                  </div>
                  <span className="tech-row-go" aria-hidden="true">
                    Explore →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Not sure which of these your wound needs?"
        copy={`That's exactly what the first visit answers. ${site.provider.fullTitle} assesses the wound, identifies why it stalled, and builds the plan around it — technology included only where it genuinely helps.`}
      />
    </>
  );
}
