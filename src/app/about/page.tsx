import type { Metadata } from "next";
import Image from "next/image";
import { Flag, Lock, Sparkles } from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { brandImages } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — Made and Certified in USA",
  description: "Proteger: precision safety faucets in next-gen Code 5 plastic, made and certified in the USA, with the U.S. Patented Automatic Lockable handle.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Proteger" title="The Only Precision Safety Cutting Edge Plastic Faucets in The World" intro="The name Proteger speaks for itself: ‘Protect’." />

      <section className="py-20 lg:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <h2 className="font-display text-3xl font-extrabold underline decoration-brand-400 decoration-4 underline-offset-8">MADE AND CERTIFIED IN USA</h2>
            <div className="prose-craig mt-4 max-w-2xl text-[17px]">
              <p>Nex-Gen in High Performance Cutting Edge Breakthrough Plastics, Patent Pending. All faucets come with one standard handle and one Automatic Lockable Handle with a completed existing U.S. Patent.</p>
              <p>Coated Brushed Nickel finish (Brushed Stainless Steel look) or Chrome finish, light weight faucets.</p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                [Flag, "Made in USA", "Manufactured to U.S. Standards"],
                [Lock, "U.S. Patented", "Automatic Lockable handle"],
                [Sparkles, "Patent Pending", "Breakthrough Code 5 material"],
              ].map(([Icon, t, s]) => {
                const I = Icon as typeof Flag;
                return (
                  <div key={t as string} className="rounded-2xl bg-mist p-5">
                    <I className="text-brand-600" size={22} />
                    <p className="mt-3 font-extrabold">{t as string}</p>
                    <p className="mt-1 text-xs text-steel">{s as string}</p>
                  </div>
                );
              })}
            </div>

            <h2 className="mt-16 font-display text-3xl font-extrabold underline decoration-brand-400 decoration-4 underline-offset-8">FACT SHEET</h2>
            <div className="prose-craig mt-4 max-w-2xl text-[17px]">
              <p className="font-bold text-ink">PEX (cross-linked polyethylene) is widely replacing copper for residential water supply lines because it is cheaper, faster to install, resists corrosion and is lead free.</p>
              <p className="font-bold text-ink underline underline-offset-4">Pure copper pipes do not contain lead, though lead can still be found on or connected to copper plumbing systems.</p>
              <div className="mt-6 grid gap-3 text-sm">
                <p className="font-semibold text-ink">Brass Faucet Facts</p>
                <a className="break-all text-brand-700 underline" href="https://share.google/aimode/ceD8vxdC9EHqOvvju" target="_blank" rel="noopener noreferrer">https://share.google/aimode/ceD8vxdC9EHqOvvju</a>
                <p className="mt-2 font-semibold text-ink">Stainless Steel Facts</p>
                <a className="break-all text-brand-700 underline" href="https://share.google/aimode/T2UqTTH83UVwZJCtG" target="_blank" rel="noopener noreferrer">https://share.google/aimode/T2UqTTH83UVwZJCtG</a>
                <a className="break-all text-brand-700 underline" href="https://share.google/aimode/fPL2OkEJI6Eqtr7Ey" target="_blank" rel="noopener noreferrer">https://share.google/aimode/fPL2OkEJI6Eqtr7Ey</a>
              </div>
              <p>Existing brass faucets contain lead, and stainless steel faucets contain chromium. Proteger&rsquo;s nonmetallic Code 5 plastic is BPA free &mdash; the same plastic baby bottles, cups and plastic faucet cartridges are made from.</p>
            </div>
          </div>
          <aside className="h-fit rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card lg:sticky lg:top-32">
            <Image src={brandImages.diagram} alt="Proteger faucet diagram: faucet stem in Ultra-High-Molecular-Weight polyethylene, body in Code 5 plastic, and handle" width={546} height={478} className="h-auto w-full" />
            <p className="mt-4 text-center text-xs font-semibold text-steel">Faucet stem: Ultra-High-Molecular-Weight PE &middot; Faucet body: PP, Code 5 plastic &middot; Faucet handle</p>
          </aside>
        </Container>
      </section>

      <section className="bg-brand-50/70 py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-brand-600">Our story</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-ink">Perfection in the engineering from the word go.</h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-steel">
            <p>With the backbone of this company coming from the building and engineering industry for over 25 years, we believe our experience and expertise are invaluable. We are committed to the excellence and reliability of our product and the satisfaction of our customers.</p>
            <p>We believe in stopping a safety problem in its tracks &mdash; not just lessening the outcome after it happens &mdash; and our advanced technology lets us do exactly that.</p>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
