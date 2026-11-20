# Apollo Wound Care — Website

Marketing site for **Apollo Wound Care**, the mobile wound care practice of
**Timothy Donoho, PA** (NPI 1407323421), serving all five boroughs of New York City.

**Live at https://www.apollowoundcare.com** (Vercel; apex redirects to www).

Built with Next.js (App Router) + hand-crafted CSS. No UI framework — the design
system, logo and every illustration are bespoke to this brand.

## Editing the site (start here)

Everything is done in your browser on GitHub. There's nothing to install.

### Before your first edit

Accept the GitHub invitation email (it expires after 7 days) and sign in. When you open
a file and click the **pencil icon**, the editor should open right away. If GitHub asks
you to fork the repository instead, either your invitation hasn't been accepted yet or
you're signed in with a different GitHub account than the one invited. Edits made in a
fork never reach the live site.

### Making a change

1. Open the file you want (see the table below) and click the **pencil icon**.
2. Make your change, then click **Commit changes…**.
3. In the box that opens, leave **Commit directly to the `main` branch** selected and
   click **Commit changes**. If you choose "Create a new branch" instead, the live site
   won't change.
4. On the repository's front page, the latest commit shows a yellow dot while the update
   builds, then a green check once the change is live, usually in about a minute. Open the
   page on the site and check your change.
5. A red ✕ means the update didn't go live, and the site stays exactly as it was. Fix
   your edit and commit again before making other changes, or send Gabe the link to the
   commit.

### Where everything lives

| To change… | Where to edit |
|---|---|
| Phone, email, hours, tagline, and site-wide description | `lib/site.ts` |
| Google Analytics ID | `lib/site.ts` (`googleAnalyticsId`) |
| Home page text | `app/page.tsx` |
| Home page title and the default title for every page | `app/layout.tsx` (the `metadata` block near the top) |
| About, Contact, FAQ, For Referrers, Services, Service Areas, Technology, "Is my wound infected?", and "Non-healing wounds" pages | `page.tsx` inside the matching folder: `app/about/`, `app/contact/`, `app/faq/`, `app/for-referrers/`, `app/services/`, `app/service-areas/`, `app/technology/`, `app/is-my-wound-infected/`, or `app/non-healing-wounds/`. Each page's title and meta description are in the `metadata` block near the top. |
| Individual service pages | Text: `lib/services.ts`. Title and description: one shared pattern in `app/services/[slug]/page.tsx`, or set `seoTitle` / `seoDescription` on a single page (see "Adding content, SEO titles and related cards"). |
| Borough pages | Text: `lib/boroughs.ts`. Title and description: one shared pattern in `app/service-areas/[borough]/page.tsx`, or set `seoTitle` / `seoDescription` on a single page. |
| Service + borough pages (e.g., a service in Brooklyn) | `lib/comboPages.ts`, including each page's own `title` and `metaDescription` |
| Technology pages | Text: `lib/technology.ts`. Title and description: one shared pattern in `app/technology/[slug]/page.tsx`, or set `seoTitle` / `seoDescription` on a single page. |
| FAQ questions and answers | `lib/faqs.ts` |
| Menu and footer | `components/Nav.tsx` and `components/Footer.tsx` |
| Images and other files | `public/` (see "Images and other files" below) |

Square brackets in folder names, as in `[slug]`, are part of the name. A shared pattern
builds the title and description for every page of that type from the page's own text,
so changing the pattern changes all of them.

Pages added through the `lib/` files (services, boroughs, technologies, and service +
borough pages) appear in `sitemap.xml` automatically. A brand-new page under `app/` also
needs a line in `app/sitemap.ts` and a link from the menu or another page.

### Adding content, SEO titles and related cards

Every page entry in `lib/services.ts`, `lib/boroughs.ts` and `lib/technology.ts` accepts
a few optional fields. A page that doesn't use them looks exactly as it did before. Add
them inside the page's entry, on new lines before the closing `},` of that entry. Make
sure the line above your addition ends with a comma, and copy the commas and brackets in
the examples exactly.

**Custom title tag and meta description**

```ts
    seoTitle: "Pressure Injury Treatment at Home in NYC | Apollo Wound Care",
    seoDescription: "Stage I–IV bedsore care at the bedside across NYC and New Jersey. Original Medicare Part B accepted.",
```

`seoTitle` replaces the whole title tag exactly as typed. Nothing is added to it, so
include `| Apollo Wound Care` yourself if you want it there. `seoDescription` replaces
the meta description. Neither one changes anything visible on the page, including the
H1. Delete the line, or leave the quotes empty (`""`), to go back to the automatic
version.

**Extra content sections**

```ts
    contentSections: [
      {
        heading: "How pressure injuries are staged",
        paragraphs: [
          "First paragraph. A link looks like this: [diabetic foot ulcer care](/services/diabetic-foot-ulcers).",
          "Second paragraph, with **a few bold words**.",
        ],
        bullets: [
          "First bullet",
          "Second bullet, with a link to [Brooklyn](/service-areas/brooklyn)",
        ],
        closing: ["An optional paragraph after the list."],
      },
      {
        heading: "A second section",
        paragraphs: ["Add as many sections as the page needs."],
      },
    ],
```

- Each `{ ... }` block is one section with its own H2. Only `heading` is required;
  leave out `paragraphs`, `bullets` or `closing` when a section doesn't need them. An
  optional `eyebrow: "Small label"` prints a small label above the heading.
- Links are written `[words to click](/page-address)`. For pages on this site, use the
  address after `apollowoundcare.com`, starting with `/`. Links to other sites start
  with `https://` and open in a new tab. Don't put spaces, quotes or brackets inside the
  round brackets. Bold and links can be combined: `**[words](/page-address)**`.
- Where the sections appear: on service pages after "Who this is for"; on borough pages
  after "Complex & non-healing wounds"; on technology pages after "In plain language" /
  "At a glance", before the footnote.
- The site checks every on-site link when it builds. A link to a page that doesn't exist
  gives a red ✕ instead of going live, and the error names the bad link. So does a link
  or bold that was left unfinished. Links to other sites are not checked, so test those
  yourself.
- The ground rules for a medical site (below) and the sourcing note at the top of
  `lib/technology.ts` apply to this content too.

**Choosing the related cards**

Service pages show three cards under "Often paired with", and borough pages show four
under "Common reasons neighbors call us". To choose them (in `lib/services.ts` and
`lib/boroughs.ts` only), add `relatedCards`. This example would suit the venous leg
ulcers page:

```ts
    relatedCards: [
      { service: "pressure-injuries" },
      { service: "diabetic-foot-ulcers", borough: "the-bronx" },
      {
        service: "wound-debridement",
        heading: "Optional custom heading",
        description: "Optional custom description for this card.",
      },
    ],
```

- `service` is a `slug` from `lib/services.ts`. Add `borough` (a `slug` from
  `lib/boroughs.ts`) to send the card to that service + borough page instead.
- The heading and description come from the destination page automatically. Add
  `heading` or `description` only to replace one of them on that card.
- Cards appear in the order listed. If you list fewer than the section holds (three or
  four), the remaining places are filled with default cards for services you haven't
  already listed.
- A service page can't list itself, so leave out the page you are editing. A card with a
  `borough` can point to any borough's page, so check it suits the page it sits on.
- Only service + borough pages that exist in `lib/comboPages.ts` can be used. A pair
  with no page, a misspelled slug, the same card twice, too many cards, or a service
  page pointing to itself gives a red ✕ instead of going live, and the error says which
  entry to fix.

To read the error behind a red ✕, click the ✕ next to the commit, then **Details**.

### Tips that prevent most mistakes

- **Text inside double quotes** (`"Like this."`, used in the `lib/` files and in lists
  at the top of some pages): apostrophes are fine. For quotation marks inside the text,
  use curly quotes (“ ”), because a straight `"` ends the text early. Keep each quoted
  text on one line (don't press Enter inside the quotes), and don't type a backslash
  (`\`).
- **Text between tags** (`<p>Like this.</p>`): don't type `{`, `}`, `<`, or `>` in the
  text itself.
- **Text inside backticks**: leave anything written as `${...}` alone. It pulls in a
  value, such as the practice name.
- Don't change any `slug` value. Slugs are the page addresses, and changing one breaks
  every link and search result that points to that page.
- If you change the phone number, email, or hours, update Google Business Profile and the
  directory listings to match.

### Images and other files

1. Open the `public` folder first, then click **Add file → Upload files** and commit the
   same way as above. Each file must be under 25 MB. Use lowercase names with hyphens,
   such as `house-call-brooklyn.jpg`.
2. A file in `public/` is served from the site root, so `public/house-call-brooklyn.jpg`
   appears at `/house-call-brooklyn.jpg`.
3. Uploading a file doesn't place it on a page. To show an image on one of the
   standalone pages (home, About, Contact, and the others listed in the table), add a
   line like this between existing tags in that page's `page.tsx`, not inside quotes or
   `{ }`:

   `<img src="/house-call-brooklyn.jpg" alt="Describe the image" />`

   Service, borough, technology, and service + borough pages share one layout per type,
   so an image added there appears on every page of that type. Ask Gabe first.

Everything in this repository is public. Never upload patient photos, documents, or names,
and keep them out of file names and commit messages too.

### Google Search Console and Google Analytics

- **Google Search Console:** add a *URL prefix* property for
  `https://www.apollowoundcare.com/` (the site's main address) and choose the **HTML
  file** method. Upload Google's file to `public/` as described above. Once that commit
  shows the green check (see step 4 under "Making a change"), click **Verify**. Leave the file in place permanently, because deleting
  it removes the verification. Then submit `https://www.apollowoundcare.com/sitemap.xml`
  under **Sitemaps**.
- **Google Analytics:** paste your GA4 Measurement ID between the quotes after
  `googleAnalyticsId` in `lib/site.ts`, for example
  `googleAnalyticsId: "G-ABC123XYZ" as string,`. The tag then loads on every page. Keep
  patient information out of Analytics, and check with Gabe before adding any other
  tracking, such as ad pixels or session recording.

### Ground rules for a medical site

The full list is in [`SEO.md`](SEO.md), section 6. The short version:

- Don't add outcome numbers or statistics without a cited source.
- Use each product's exact FDA status. "Cleared" and "approved" mean different things.
  Avoid cure or guarantee language.
- Don't post patient reviews or photos without a signed HIPAA authorization from the
  patient.
- Keep the "not medical advice / call 911" disclaimer in the footer.

[`SEO.md`](SEO.md) also has the keyword map and the off-site checklist (Google Business
Profile, directories).

## Deploying to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import this repository.
2. Vercel auto-detects Next.js — no configuration needed. Click **Deploy**.
3. Add the production domain under **Settings → Domains** once purchased
   (e.g. `apollowoundcare.com`).

## ⚠️ Before going live — replace the placeholders

All editable business facts live in **`lib/site.ts`**:

| Field | Current value | Action |
|---|---|---|
| `phone` / `phoneHref` | `(929) 555-0134` | **Placeholder — replace** with the real practice number |
| `email` | `care@apollowoundcare.com` | **Placeholder — replace** with the real inbox |
| `url` | `https://www.apollowoundcare.com` | Set to the real production domain (drives canonical URLs, sitemap and JSON-LD) |
| `hours` | Mon–Sat, 8am–6pm | Confirm with Tim |

Also review before launch:

- **Copy claims** — statements like "Medicare & major plans" and scheduling
  turnaround live in `lib/faqs.ts`, `app/page.tsx` and `lib/services.ts`.
  Have Tim confirm each one.
- **Provider portrait** — the About/home pages currently use a styled "TD"
  monogram. Swap in a professional photo of Tim when available
  (`.provider-portrait` in `app/about/page.tsx` and `app/page.tsx`).
- **Testimonials** — intentionally **not** included. Never publish patient
  reviews without written consent; when you have consented reviews, add a
  section to the home page.
- **Contact form** — submits via the visitor's email client (`mailto:`), so no
  PHI is stored anywhere. To capture requests server-side instead, replace
  `handleSubmit` in `components/ContactForm.tsx` with a POST to a form service
  or an API route wired to a HIPAA-appropriate inbox.

## SEO features included

- Unique metadata + canonical URL on every page
- JSON-LD structured data: `MedicalBusiness` (site-wide), `Person` w/ NPI,
  `MedicalProcedure` (each service), `FAQPage`, `BreadcrumbList`, `ContactPage`
- Dedicated, uniquely-written landing pages per borough (`/service-areas/*`)
  and per service (`/services/*`) — 19 indexable pages total
- `sitemap.xml`, `robots.txt`, web manifest, OG/Twitter cards with a generated
  Open Graph image
- Fully static output (every page pre-rendered), semantic HTML, accessible
  interactive components, `prefers-reduced-motion` support

## Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```
