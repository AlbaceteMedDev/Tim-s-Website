import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";
import StitchDivider from "@/components/StitchDivider";
import { comboPages, getCombo, comboNames } from "@/lib/comboPages";
import { site } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string; area: string }>;
}

export function generateStaticParams() {
  return comboPages.map((c) => ({ slug: c.serviceSlug, area: c.boroughSlug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, area } = await params;
  const combo = getCombo(slug, area);
  if (!combo) return {};
  return {
    title: combo.title,
    description: combo.metaDescription,
    alternates: { canonical: `/services/${slug}/${area}` },
  };
}

export default async function ComboPage({ params }: Props) {
  const { slug, area } = await params;
  const combo = getCombo(slug, area);
  if (!combo) notFound();
  const { service, borough } = comboNames(combo);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: combo.h1,
    description: combo.metaDescription,
    url: `${site.url}/services/${combo.serviceSlug}/${combo.boroughSlug}`,
    about: { "@type": "MedicalProcedure", name: service.name },
    provider: { "@id": `${site.url}/#organization` },
    reviewedBy: { "@id": `${site.url}/about#provider` },
    isPartOf: { "@id": `${site.url}/#website` },
    inLanguage: "en-US",
    areaServed: { "@type": "AdministrativeArea", name: borough.geoName },
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: combo.faq.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${site.url}/services/${service.slug}`,
      },
      { "@type": "ListItem", position: 4, name: borough.name },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([jsonLd, faqLd, breadcrumbLd]),
        }}
      />

      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/services/${service.slug}`}>{service.shortName}</Link>
            <span aria-hidden="true">/</span>
            <span>{borough.name}</span>
          </nav>
          <span className="eyebrow">
            {service.shortName} · {borough.name}
          </span>
          <h1>{combo.h1}</h1>
          <p className="section-lede">{combo.intro}</p>
          <div className="hero-actions">
            <a href={`tel:${site.phoneHref}`} className="btn btn-primary btn-lg">
              Call {site.phone}
            </a>
            <Link href="/contact" className="btn btn-ghost btn-lg">
              Request a Visit
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2 grid-2-top">
          <Reveal>
            <span className="eyebrow">Why here, why at home</span>
            <h2 className="section-title">
              {service.shortName} meets {borough.name} reality.
            </h2>
            <p className="section-lede">{combo.whyLocal}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <aside className="aside-card">
              <h3>House calls in {borough.name}</h3>
              <dl className="facts" style={{ marginTop: "1.2rem" }}>
                <div className="fact">
                  <dt>Coverage</dt>
                  <dd>
                    {borough.neighborhoods.slice(0, 4).join(", ")} &amp; beyond
                  </dd>
                </div>
                <div className="fact">
                  <dt>Provider</dt>
                  <dd>{site.provider.fullTitle}</dd>
                </div>
              </dl>
              <a href={`tel:${site.phoneHref}`} className="btn btn-primary">
                Call {site.phone}
              </a>
              <div className="aside-links">
                <Link href={`/services/${service.slug}`}>
                  All about {service.shortName.toLowerCase()} →
                </Link>
                <Link href={`/service-areas/${borough.slug}`}>
                  Wound care in {borough.name} →
                </Link>
                <Link href="/non-healing-wounds">
                  Have a wound that won&apos;t heal? →
                </Link>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <Reveal>
            <span className="eyebrow">What changes the outcome</span>
            <h2 className="section-title">The local factors we plan around.</h2>
          </Reveal>
          <div className="grid-cards">
            {combo.localFactors.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07} className="card">
                <span className="card-eyebrow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{f.title}</h3>
                <p>{f.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Common questions</span>
            <h2 className="section-title">
              {service.shortName} in {borough.name}, answered.
            </h2>
          </Reveal>
          <div className="grid-2" style={{ marginTop: "2rem" }}>
            {combo.faq.map((f) => (
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
        title={`${service.shortName} care in ${borough.name} this week?`}
        copy={`Call ${site.phone} or request a visit — ${site.provider.fullTitle} brings assessment and treatment to your door.`}
      />
    </>
  );
}
