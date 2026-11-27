import type { Metadata } from "next";
import Image from "next/image";
import { Lock, RefreshCw, ShieldCheck } from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { brandImages } from "@/lib/site";

export const metadata: Metadata = {
  title: "How It Works",
  description: "How Proteger's patented Automatic Lockable handle stops children turning on hot or cold water.",
};

const steps = [
  { icon: RefreshCw, title: "Fit the handle you need", text: "Every Proteger faucet comes with two handles. Use the standard handle for everyday operation, or change over to the Automatic Lockable handle in moments." },
  { icon: Lock, title: "It locks automatically", text: "With the Automatic Lockable handle fitted, the faucet locks itself after use, so young children can't activate the water flow." },
  { icon: ShieldCheck, title: "Protection, every time", text: "Hot and cold water stay off until an adult deliberately operates the faucet, helping to prevent scalding, flooding and drowning risks." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero eyebrow="How it works" title="STOP ‘AND THINK’: the world’s first automatic lockable faucet" intro="Proteger’s patented Automatic Lockable handle stops a safety problem in its tracks, before it happens." />
      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-3xl border border-slate-200 p-8 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 text-white"><s.icon size={22} /></span>
                  <span className="font-display text-4xl font-extrabold text-slate-200">0{i + 1}</span>
                </div>
                <h2 className="mt-6 font-display text-xl font-extrabold">{s.title}</h2>
                <p className="mt-3 text-sm leading-7 text-steel">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <div className="mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-card">
              <Image src={brandImages.handles} alt="Standard handle and Automatic Lockable handle" width={380} height={503} sizes="(max-width:1024px) 90vw, 420px" className="framed-shot h-auto w-full" />
            </div>
            <div>
              <p className="eyebrow text-brand-600">Who it protects</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold">Designed for homes, hotels and care settings</h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-steel">
                <li><strong className="text-ink">Families:</strong> prevent children turning on hot or cold water in showers, bathtubs, basins, kitchen sinks and laundries.</li>
                <li><strong className="text-ink">Aged care:</strong> minimise the risk of aged and dementia sufferers scalding themselves.</li>
                <li><strong className="text-ink">Hotels &amp; resorts:</strong> concealed bath/shower mixer diverters with the automatic safety lock incorporated.</li>
              </ul>
              <p className="mt-6 text-xs text-steel"><span className="font-bold text-red-600">Warning:</span> Proteger&rsquo;s accessories must only be used with Proteger&rsquo;s products.</p>
            </div>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
