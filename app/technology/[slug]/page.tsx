import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ResultStat from "@/components/ResultStat";
import DeviceShowcase from "@/components/DeviceShowcase";
import MistDemo from "@/components/MistDemo";
import CTABand from "@/components/CTABand";
import StitchDivider from "@/components/StitchDivider";
import { technologies, getTechnology } from "@/lib/technology";
import { site } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return technologies.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTechnology(slug);
  if (!t) return {};
  return {
    title: `${t.name} at Home in NYC`,
    description: `${t.teaser} Delivered in the home across all five NYC boroughs by ${site.provider.fullTitle}.`,
    alternates: { canonical: `/technology/${t.slug}` },
  };
}

export default async function TechnologyDetail({ params }: Props) {
  const { slug } = await params;
  const t = getTechnology(slug);
  if (!t) notFound();

  const isUltra = t.slug === "ultramist-ultrasound-therapy";
  const hasHeroMedia = Boolean(t.video || t.image);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    name: t.name,
    description: t.teaser,
    url: `${site.url}/technology/${t.slug}`,
    provider: { "@id": `${site.url}/#organization` },
    relevantSpecialty: { "@type": "MedicalSpecialty", name: "WoundCare" },
    ...(isUltra ? { howPerformed: "Non-contact low-frequency (40 kHz) ultrasound delivered through a saline mist." } : {}),
    indication: [
      "Diabetic foot ulcer",
      "Venous leg ulcer",
      "Pressure injury",
      "Non-healing wound",
      "Chronic wound",
    ].map((name) => ({ "@type": "MedicalIndication", name })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Technology", item: `${site.url}/technology` },
      { "@type": "ListItem", position: 3, name: t.name },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbLd]) }}
      />

      {/* ===== Hero ===== */}
      <section className={`tech-hero ${hasHeroMedia ? "tech-hero-dark" : ""}`}>
        <div className="container tech-hero-inner">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/technology">Technology</Link>
              <span aria-hidden="true">/</span>
              <span>{t.shortName}</span>
            </nav>
            <span className="eyebrow">{t.category}</span>
            <h1>{t.name}</h1>
            <p className="tech-attr">{t.attribution}</p>
            <p className="section-lede">{t.intro}</p>
            <div className="hero-actions">
              <a href={`tel:${site.phoneHref}`} className="btn btn-gold btn-lg">
                Call {site.phone}
              </a>
              <Link href="/contact" className="btn btn-ghost btn-lg">
                Ask if it's right for you
              </Link>
            </div>
          </div>
          {isUltra && (
            <div className="tech-hero-figure">
              <DeviceShowcase hasVideo={Boolean(t.video)} />
            </div>
          )}
          {!isUltra && t.video && (
            <div className="tech-hero-figure">
              <figure className="mech-video">
                <video autoPlay muted loop playsInline preload="metadata" poster={t.poster}>
                  <source src={t.video} type="video/webm" />
                  {t.videoFallback && (
                    <source src={t.videoFallback} type="video/mp4" />
                  )}
                </video>
                <figcaption>Illustrative mechanism animation</figcaption>
              </figure>
            </div>
          )}
        </div>
      </section>

      {/* ===== Effects (UltraMIST) ===== */}
      {t.effects && (
        <section className="section">
          <div className="container">
            <Reveal>
              <span className="eyebrow">How it works</span>
              <h2 className="section-title">Three measurable effects on the wound.</h2>
            </Reveal>
            <div className="effects-grid">
              {t.effects.map((e, i) => (
                <Reveal key={e.title} delay={i * 0.08} className="effect">
                  <span className="effect-label">{e.label}</span>
                  <h3>{e.title}</h3>
                  <p>{e.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== Virtual demo (UltraMIST) ===== */}
      {isUltra && (
        <section className="section section-tint">
          <div className="container">
            <Reveal>
              <span className="eyebrow">Virtual demo</span>
              <h2 className="section-title">See a treatment, start to finish.</h2>
              <p className="section-lede">
                A simplified cross-section of what non-contact ultrasound does at the
                wound bed. It loops automatically — or step through it yourself.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <MistDemo />
            </Reveal>
          </div>
        </section>
      )}

      {/* ===== Results ===== */}
      {t.stats && t.stats.length > 0 && (
        <section className="section section-night results-band">
          <div className="container">
            <Reveal>
              <span className="eyebrow">Clinical evidence</span>
              <h2 className="section-title">What the data shows.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rstat-grid">
                {t.stats.map((s) => (
                  <ResultStat key={s.label} stat={s} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ===== Specs + patient meaning ===== */}
      <section className="section">
        <div className="container detail-grid">
          <div>
            {t.patient && (
              <Reveal>
                <span className="eyebrow">What it means for you</span>
                <h2 className="section-title">In plain language.</h2>
                <ul className="detail-list">
                  {t.patient.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
          <Reveal delay={0.12}>
            <aside className="aside-card">
              {t.specs && (
                <>
                  <h3>At a glance</h3>
                  <dl className="facts" style={{ marginTop: "1.2rem" }}>
                    {t.specs.map((sp) => (
                      <div key={sp.k} className="fact">
                        <dt>{sp.k}</dt>
                        <dd>{sp.v}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}
              {!t.specs && <h3>Bring it to the bedside</h3>}
              <a href={`tel:${site.phoneHref}`} className="btn btn-primary">
                Call {site.phone}
              </a>
              <Link href="/contact" className="btn btn-ghost">
                Request a Visit
              </Link>
              <div className="aside-links">
                <Link href="/non-healing-wounds">
                  Have a wound that won&apos;t heal? →
                </Link>
                <Link href="/technology">All wound-healing technology →</Link>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {t.footnote && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <StitchDivider />
            <p className="tech-footnote">{t.footnote}</p>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
