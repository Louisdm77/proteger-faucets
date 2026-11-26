import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ShieldCheck, Droplets, HeartHandshake, Waves } from "lucide-react";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { CtaBand } from "@/components/cta-band";
import { image, products } from "@/lib/site";

const benefits = [
  { icon: ShieldCheck, title: "Child safety", text: "Designed to help prevent children from independently operating hot or cold water taps." },
  { icon: Droplets, title: "Scald-risk reduction", text: "A safety-minded approach for environments used by older people and people living with dementia." },
  { icon: Waves, title: "Overflow awareness", text: "Designed to help minimise the risk of overflowing baths and sinks in residential and commercial settings." },
  { icon: HeartHandshake, title: "Everyday reassurance", text: "An integrated safety concept for bathrooms, kitchens, laundries and shared facilities." }
];

export default function HomePage() {
  return <>
    <section className="relative min-h-[760px] overflow-hidden bg-ink text-white lg:min-h-[850px]">
      <Image src={image.hero} alt="Contemporary bathroom with refined stone and water fixtures" fill priority sizes="100vw" className="object-cover object-center opacity-55"/>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/15"/>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-ink/20"/>
      <Container className="relative z-10 flex min-h-[760px] items-center pb-20 pt-36 lg:min-h-[850px]">
        <div className="max-w-3xl reveal">
          <p className="eyebrow mb-7 flex items-center gap-3 text-blue"><span className="h-px w-9 bg-blue"/>Safety, built into the everyday</p>
          <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-6xl lg:text-[82px]">A more considered approach to <span className="text-blue">water safety.</span></h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-white/70 sm:text-lg">Proteger brings an integrated safety device to everyday tapware — designed to help reduce the risks of scalding, unsupervised water use and overfilling.</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row"><ButtonLink href="/how-it-works">Explore the technology</ButtonLink><ButtonLink href="/products" light>Discover products</ButtonLink></div>
          <div className="mt-16 flex items-center gap-4 text-xs font-semibold uppercase tracking-[.18em] text-white/55"><span className="grid h-10 w-10 place-items-center rounded-full border border-white/25"><ArrowDown size={16}/></span>Designed around everyday peace of mind</div>
        </div>
      </Container>
      <div className="absolute bottom-0 right-0 hidden h-32 w-[38%] border-l border-t border-white/15 bg-ink/35 backdrop-blur-md lg:block"><div className="grid h-full grid-cols-2 divide-x divide-white/10"><div className="flex flex-col justify-center px-8"><span className="eyebrow text-blue">The idea</span><span className="mt-2 text-sm text-white/80">Safety integrated into tapware</span></div><div className="flex flex-col justify-center px-8"><span className="eyebrow text-blue">The focus</span><span className="mt-2 text-sm text-white/80">Reducing everyday water risks</span></div></div></div>
    </section>
    <section className="py-24 lg:py-32"><Container><div className="grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><SectionHeading eyebrow="The Proteger difference" title="Safety should feel like a natural part of good design."/><div><p className="text-lg leading-8 text-steel">Proteger is more than a faucet finish or fitting. It is a built-in safety device designed for popular faucet formats, bringing an additional layer of consideration to the places where water is used every day.</p><Link href="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-ink transition hover:text-blue">Get to know Proteger <ArrowUpRight size={17}/></Link></div></div><div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{benefits.map(({icon: Icon,title,text},i)=><div key={title} className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-soft"><span className="grid h-12 w-12 place-items-center rounded-xl bg-ice text-blue-700"><Icon size={22}/></span><p className="mt-8 text-xs font-bold text-blue-700">0{i+1}</p><h3 className="mt-2 font-display text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-steel">{text}</p></div>)}</div></Container></section>
    <section className="overflow-hidden bg-mist py-24 lg:py-28"><Container><div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><div><SectionHeading eyebrow="Designed for real life" title="Thoughtful protection, wherever water is part of the day." text="From family bathrooms to accommodation and care environments, Proteger's safety concept is intended for the spaces where people interact with taps and water."/><ButtonLink href="/applications" className="mt-8">Explore applications</ButtonLink></div><div className="relative min-h-[440px] overflow-hidden rounded-3xl bg-slate-200"><Image src={image.bathroom} alt="Calm, contemporary bathroom interior" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover"/><div className="absolute bottom-6 left-6 max-w-xs rounded-2xl border border-white/20 bg-ink/80 p-6 text-white backdrop-blur-md"><p className="eyebrow text-blue">One integrated idea</p><p className="mt-3 font-display text-xl font-semibold">A safer detail, built into the tapware.</p></div></div></div></Container></section>
    <section className="py-24 lg:py-32"><Container><div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><SectionHeading eyebrow="Product collection" title="Explore the Proteger ranges." text="Discover the product families currently featured by Proteger. Ask our team about configuration, compatibility and availability."/><Link href="/products" className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-ink hover:text-blue">View all products <ArrowUpRight size={17}/></Link></div><div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.slice(0,4).map((p,i)=><ProductCard key={p.name} product={p} index={i}/>)}</div></Container></section>
    <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-28"><div className="absolute -right-20 -top-28 h-96 w-96 rounded-full border border-white/10"/><div className="absolute -right-8 -top-16 h-72 w-72 rounded-full border border-blue/20"/><Container className="relative"><div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center"><div><SectionHeading light eyebrow="Compatibility" title="Designed around familiar faucet formats." text="The original Proteger site describes a built-in safety device for several widely used faucet types."/></div><div className="grid gap-4 sm:grid-cols-2"><div className="border-l border-blue pl-5 py-2"><h3 className="font-display text-lg font-semibold">Flick mixers</h3><p className="mt-2 text-sm leading-6 text-white/55">A listed compatible faucet format.</p></div><div className="border-l border-blue pl-5 py-2"><h3 className="font-display text-lg font-semibold">Ceramic cartridge rotary</h3><p className="mt-2 text-sm leading-6 text-white/55">A listed compatible faucet format.</p></div><div className="border-l border-blue pl-5 py-2 sm:col-span-2"><h3 className="font-display text-lg font-semibold">USA ceramic-type basin sets</h3><p className="mt-2 text-sm leading-6 text-white/55">Described by Proteger as complete-unit manufactured sets.</p></div><ButtonLink href="/how-it-works" light className="mt-3">Understand the technology</ButtonLink></div></div></Container></section>
    <CtaBand/>
  </>;
}
