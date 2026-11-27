import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock, Flag, BadgeCheck, ShieldCheck, Baby, Waves, HeartHandshake, KeyRound } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ProductGrid } from "@/components/product-grid";
import { CtaBand } from "@/components/cta-band";
import { benefits, brandImages, getProduct, money } from "@/lib/site";

const trust = [
  { icon: Flag, label: "Made & certified in the USA" },
  { icon: Lock, label: "U.S. Patented automatic lock" },
  { icon: ShieldCheck, label: "3x stronger than steel" },
  { icon: BadgeCheck, label: "BPA-free Code 5 plastic" },
];

const benefitIcons = [Baby, Waves, HeartHandshake];

export default function Home() {
  const hero = getProduct("barium-blue")!;
  const heroAlt = getProduct("cornet")!;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-brand-600/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -top-32 h-[420px] w-[420px] rounded-full bg-gold-500/15 blur-3xl" />
        <Container className="relative grid items-center gap-14 py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/10 px-4 py-1.5 text-xs font-bold text-gold-400">
              <KeyRound size={14} /> World&rsquo;s First Automatic Lockable Faucets
            </p>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              The Only Precision Safety <span className="text-brand-400">Cutting Edge Plastic Faucets</span> in the World
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              Proteger &lsquo;Protect&rsquo;. Next-generation faucets made and certified in the USA, with a patented Automatic Lockable handle that stops little hands turning on the water.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">Shop faucets <ArrowRight size={17} /></Link>
              <Link href="/how-it-works" className="btn-ghost">How the lock works</Link>
            </div>
            <p className="mt-8 text-sm font-semibold text-white/60">New lower prices &mdash; faucets from <span className="text-white">{money(29)}</span></p>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="group relative z-10 overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl shadow-black/40">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-white">
                <Image src={hero.image} alt={`${hero.name} kitchen faucet`} fill priority sizes="(max-width:1024px) 90vw, 420px" className="product-shot object-contain p-6" />
              </div>
              <div className="flex items-center justify-between px-3 pb-2 pt-3 text-ink">
                <div>
                  <p className="font-display text-lg font-extrabold">{hero.name}</p>
                  <p className="text-xs text-steel">Kitchen mixer</p>
                </div>
                <p className="text-right"><span className="block text-xl font-extrabold">{money(hero.price)}</span><del className="text-xs text-slate-400">{money(hero.wasPrice!)}</del></p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 z-20 hidden w-40 overflow-hidden rounded-3xl bg-white p-2 shadow-xl sm:block">
              <div className="relative aspect-square"><Image src={heroAlt.image} alt={`${heroAlt.name} faucet`} fill sizes="160px" className="product-shot object-contain p-2" /></div>
            </div>
            <div className="absolute -right-4 top-8 z-20 flex items-center gap-2 rounded-2xl bg-gold-500 px-4 py-3 text-ink shadow-xl">
              <Lock size={20} strokeWidth={2.6} />
              <span className="text-xs font-extrabold leading-tight">U.S.<br />Patented</span>
            </div>
          </div>
        </Container>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-slate-200 bg-white">
        <Container className="grid grid-cols-2 gap-4 py-6 lg:grid-cols-4">
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-sm font-bold text-ink">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon size={19} /></span>
              {label}
            </div>
          ))}
        </Container>
      </section>

      {/* MATERIAL STORY (Craig's homepage copy) */}
      <section className="py-20 lg:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Next generation breakthrough material" title="Code 5 plastic. Three times stronger than steel." />
            <div className="prose-craig max-w-xl">
              <p>
                New U.S. Certified Next Generation Breakthrough Polyethylene Code 5 Base and Spout, with an accommodating Ultra-High-Molecular-Weight Polyethylene Plastic Faucet Stem and Handle, taking the strength to 3 times stronger than steel.
              </p>
              <p>
                The nonmetallic Code 5 plastic is BPA free &mdash; the same plastic baby bottles, cups and plastic faucet cartridges are made from. Our faucets are manufactured inside the United States of America, complying with U.S. Standards, under a new Patent Pending filed via a U.S. Patent Law Firm.
              </p>
              <p className="font-semibold text-ink underline decoration-gold-500 decoration-2 underline-offset-4">
                Existing brass faucets contain lead, a known cause of cancers, and stainless steel faucets contain chromium, which can also be known to cause cancers.
              </p>
              <p className="font-bold text-ink">The World&rsquo;s First Automatic Lockable is an existing U.S. Patented product.</p>
            </div>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-brand-700">Read the fact sheet <ArrowRight size={16} /></Link>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-mist p-8 shadow-card">
            <Image src={brandImages.diagram} alt="Proteger faucet diagram: UHMW polyethylene stem, Code 5 plastic body and handle" width={546} height={478} className="mx-auto h-auto w-full max-w-md mix-blend-multiply" />
            <p className="mt-4 text-center text-xs font-semibold text-steel">Faucet stem: Ultra-High-Molecular-Weight PE &middot; Body: Code 5 plastic</p>
          </div>
        </Container>
      </section>

      {/* BENEFITS */}
      <section className="bg-ink py-20 text-white lg:py-24">
        <Container>
          <SectionHeading light center eyebrow="Why Proteger" title="The benefits of this product are endless" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {benefits.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <div key={b.title} className="rounded-3xl border border-white/10 bg-white/[.04] p-8">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-500 text-ink"><Icon size={22} /></span>
                  <h3 className="mt-6 font-display text-xl font-extrabold">{b.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{b.text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* TWO HANDLES */}
      <section className="py-20 lg:py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-card">
            <Image src={brandImages.handles} alt="Proteger standard handle and Automatic Lockable handle" width={600} height={760} className="product-shot h-auto w-full" />
          </div>
          <div>
            <SectionHeading eyebrow="Two handles in every box" title="Everyday use or locked — you choose." text="All Proteger faucets come with one standard handle for everyday operation, plus Proteger's Automatic Lockable handle. Change over in moments whenever young children, elderly relatives or guests need protecting." />
            <ul className="mt-8 space-y-3 text-sm font-semibold">
              {["Standard handle for normal everyday operation", "Automatic Lockable handle with a completed existing U.S. Patent", "Easy change-over to suit your needs"].map((t) => (
                <li key={t} className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-white"><Lock size={12} /></span>{t}</li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-steel"><span className="font-bold text-red-600">Warning:</span> Proteger&rsquo;s accessories must only be used with Proteger&rsquo;s products.</p>
          </div>
        </Container>
      </section>

      {/* PRODUCTS */}
      <section className="bg-mist py-20 lg:py-24">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Shop the collection" title="New lower prices across the range" />
            <Link href="/products" className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-700">View all faucets <ArrowRight size={16} /></Link>
          </div>
          <ProductGrid limit={8} />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
