# Apollo Wound Care — SEO Playbook

Goal: rank for, and convert, patients (and their families and referrers) searching for help
with **complex, chronic, and non-healing wounds and ulcers** across NYC's five boroughs.

Everything below is either already built into the site or is a prioritized next step.

---

## 1. What's already in place (built)

**Technical foundation**
- Fully static Next.js render; fast first load; semantic HTML; mobile-first.
- Per-page unique `<title>`, meta description, and canonical URL (canonical origin =
  `https://www.apollowoundcare.com`, set in `lib/site.ts`).
- `sitemap.xml` (all ~26 URLs) and `robots.txt` auto-generated.
- OG/Twitter cards + branded 1200×630 OG image; PNG + SVG favicons.
- Structured data (JSON-LD):
  - `MedicalBusiness` / `MedicalClinic` site-wide, with `areaServed` = 5 boroughs,
    `availableService`, and a `Person` (Timothy Donoho, PA) carrying the NPI identifier.
  - `MedicalWebPage` (Technology, Non-Healing Wounds), `MedicalTherapy` (each modality),
    `MedicalCondition` (chronic wound), `FAQPage`, `BreadcrumbList`, `ContactPage`.

**Content architecture (topical authority for wound care)**
- **Pillar page:** `/non-healing-wounds` — the high-intent hub for "wound won't heal" /
  "chronic ulcer" / "complex wound" queries.
- **Service cluster:** 8 condition/procedure pages (`/services/*`) — diabetic foot ulcers,
  pressure injuries, venous & arterial ulcers, surgical wounds, trauma, debridement, NPWT.
- **Local cluster:** 5 borough pages (`/service-areas/*`) with unique local copy +
  neighborhood lists.
- **Technology cluster:** `/technology` + 4 modality pages (UltraMIST®, amniotic allografts,
  antimicrobial matrix, collagen) — differentiators competitors rarely explain.
- Dense internal linking: pillar → technology → borough → service and back.

---

## 2. Off-site setup — do these first (highest ROI, ~1 hour total)

These are the things only the practice owner can do, and they drive most local-medical
organic traffic:

1. **Google Business Profile (GBP).** Create/claim it. Category: *Wound care center* (plus
   *Home health care service*). Because this is mobile, set it up as a **service-area
   business** (hide the address, list the 5 boroughs as service areas). Add the logo, hours,
   phone, the website URL, and 10+ photos. GBP is the single biggest local-search lever.
2. **Google Search Console.** Verify the domain, submit
   `https://www.apollowoundcare.com/sitemap.xml`. Watch "wound won't heal / non-healing"
   queries and the Pages report for indexing.
3. **Bing Webmaster Tools.** Same sitemap; ~5 minutes; non-trivial older-patient share.
4. **NAP consistency.** Pick one exact Name / Address-or-service-area / Phone and use it
   identically on the site, GBP, and every directory below.
5. **Health directories & citations:** Healthgrades, Vitals, WebMD Care, Zocdoc, U.S. News
   Doctors, the NPI registry record, and the Yext/Apple/Bing local ecosystems. Consistent
   citations build local trust signals.

---

## 3. Keyword map (already targeted / to expand)

| Intent | Example queries | Page |
|---|---|---|
| Core problem (highest value) | "wound that won't heal", "non healing wound treatment", "chronic ulcer specialist nyc" | `/non-healing-wounds` |
| Condition + non-healing | "non healing diabetic foot ulcer", "venous leg ulcer won't heal" | `/services/*` + link from pillar |
| Modality | "ultramist therapy near me", "non contact ultrasound wound therapy" | `/technology/ultramist-...` |
| Local + service | "mobile wound care brooklyn", "home wound care queens" | `/service-areas/*` |
| Reassurance / how | "does medicare cover wound care at home", "what to do for a wound that won't heal" | `/faq`, pillar |

**Next content to add (each = a new indexable page, more long-tail capture):**
- Borough × condition combos where volume justifies it (e.g. *Diabetic foot ulcer care in
  the Bronx*) — the Bronx/Brooklyn diabetic-ulcer burden is real search demand.
- A "How do I know if my wound is infected / not healing?" symptom-checker style guide
  (captures pre-diagnosis searches; links into the pillar).
- Referrer-facing page ("For physicians & home-health agencies") — captures B2B referral
  searches and earns links.

---

## 4. Reviews, E-E-A-T, and links

- **Reviews:** after consented, successful cases, ask for Google reviews (they influence
  both ranking and click-through). Never publish patient details without written consent.
- **Author authority (E-E-A-T):** the About page already ties content to a named, licensed
  PA with a verifiable NPI. Keep clinical pages reviewed/attributable to Tim.
- **Backlinks:** local press, borough business associations, diabetes/senior-care orgs,
  home-health partners, and the manufacturer/partner (Albacete MedDev / Sanuwave) are
  natural, credible link sources. Quality > quantity.

---

## 5. Measurement

- Search Console: impressions/clicks for non-healing & modality queries; Pages indexed.
- GBP Insights: calls, direction requests, "how customers find you".
- On-site: track calls (the `tel:` CTAs) and visit-request submissions as conversions.

---

## 6. Compliance guardrails (non-negotiable on a medical site)

- Every clinical statistic on the site is attributed to its source and kept adjunctive/
  candidacy-qualified (see footnotes on the technology pages). Do not add outcome numbers
  without a citation.
- No patient reviews/photos without written consent.
- Keep the "not medical advice / call 911" disclaimer sitewide (already in the footer).
