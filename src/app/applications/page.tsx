import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { image } from "@/lib/site";

export const metadata: Metadata = { title: "Applications", description: "Explore the residential and commercial settings where Proteger safety-focused tapware may be relevant." };

const uses = [
  { n: "01", title: "Family homes", text: "Bathrooms, showers, bathtubs, kitchen sinks and laundries are among the everyday locations highlighted by Proteger.", img: image.bathroom },
  { n: "02", title: "Accommodation", text: "The company identifies apartments and hotel accommodation as settings where reducing the risk of bath and sink overfilling can matter.", img: image.interior },
  { n: "03", title: "Care environments", text: "Proteger specifically discusses older people and people living with dementia in relation to scald-risk reduction.", img: image.shower }
];

export default function ApplicationsPage() {
  return <><PageHero eyebrow="Where it belongs" title="Designed for the spaces people rely on." intro="Proteger's safety concept speaks to residential and commercial environments where accessible water and everyday tap use can create avoidable risks."/>
    <section className="py-20 lg:py-28"><Container><SectionHeading eyebrow="Applications" title="One safety consideration. Many everyday settings." text="The examples below are based on the use cases described by Proteger, not a claim of suitability for every installation."/><div className="mt-14 grid gap-6 lg:grid-cols-3">{uses.map(u=><article key={u.n} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="relative h-64 overflow-hidden"><Image src={u.img} alt={`${u.title} interior`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105"/></div><div className="p-7"><p className="eyebrow text-blue-700">{u.n} / application</p><h3 className="mt-3 font-display text-2xl font-semibold">{u.title}</h3><p className="mt-4 text-sm leading-7 text-steel">{u.text}</p></div></article>)}</div></Container></section>
    <section className="bg-mist py-20"><Container><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow text-blue-700">Project conversations</p><h2 className="mt-4 font-display text-4xl font-semibold tracking-tight">The right application starts with the right questions.</h2></div><div className="space-y-4 text-base leading-8 text-steel"><p>What faucet type is installed? Who uses the space? Is the project residential, hospitality or care-related? These details help establish whether a Proteger product may be appropriate.</p><p>Contact the team with your project context to discuss compatibility and available product information.</p></div></div></Container></section><CtaBand/></>;
}
