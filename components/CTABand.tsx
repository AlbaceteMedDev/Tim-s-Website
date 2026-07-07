import Link from "next/link";
import Emblem from "./Emblem";
import Reveal from "./Reveal";
import { site } from "@/lib/site";

export default function CTABand({
  title = "Your wound won't wait. Neither do we.",
  copy = `One phone call covers everything: the wound, your insurance, and the first visit date. Family members and referring providers are welcome to call on a patient's behalf.`,
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="section section-night cta-band">
      <div className="container cta-inner">
        <Reveal>
          <Emblem size={72} strand="#F7F4EC" accent="#D8B96E" casing="#0B2E1F" />
          <h2 className="cta-title">{title}</h2>
          <p className="cta-copy">{copy}</p>
          <div className="cta-actions">
            <a href={`tel:${site.phoneHref}`} className="btn btn-gold btn-lg">
              Call {site.phone}
            </a>
            <Link href="/contact" className="btn btn-ghost btn-lg">
              Request a Visit Online
            </Link>
          </div>
          <p className="cta-hours">{site.hours} · {site.serviceArea}</p>
        </Reveal>
      </div>
    </section>
  );
}
