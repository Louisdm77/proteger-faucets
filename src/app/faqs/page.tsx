import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = { title: "FAQs", description: "Answers to common questions about Proteger Faucets, product ranges and compatibility." };

const faqs = [
  ["What is Proteger Faucets?", "Proteger describes its product as a built-in safety device for selected faucet types, designed to help minimise risks such as scalding, drowning and overfilling."],
  ["Which faucet types are listed as compatible?", "The website names flick mixer faucets, ceramic cartridge rotary faucets and USA ceramic-type basin sets manufactured as complete units. Confirm the exact faucet model with the Proteger team."],
  ["What risks is the product designed to help reduce?", "The company identifies children independently operating taps, potential drowning in accessible or unsupervised bathrooms, scalding risks for older people and people living with dementia, and overfilling of baths and sinks."],
  ["Which product ranges are available?", "The website features Barium Burgundy, Barium Blue, Barium Yellow, Barium Green, Barium Red, Semblance, Populace and Cornet. Contact Proteger for current availability and product details."],
  ["Can Proteger be used in commercial settings?", "The company describes residential and commercial applications, including apartments and hotel accommodation. Suitability should be confirmed for each project and faucet configuration."],
  ["Does the website publish detailed installation instructions?", "The current public website does not provide enough technical detail to reproduce installation steps. Please request the relevant product and installation documentation directly from Proteger."],
  ["What warranty is stated by Proteger?", "The original website states a two-year warranty. Confirm the current warranty terms, exclusions and regional applicability with the company before purchase."],
  ["What warranty, licensing and certification information does Proteger publish?", "The current public website states a two-year warranty, describes licensed faucets in the USA, Canada and EU, and says the safety tapware design has been certified by a consulting engineer. It does not identify the engineer or provide supporting documents on the homepage. Confirm current terms, regional availability and documentation directly with Proteger."],
  ["How can I enquire about a product?", "Use the contact form on this website to share the faucet type, intended setting and product range you are interested in. The form requires email-service configuration to deliver messages."]
];

export default function FAQsPage() {
  return <><PageHero eyebrow="Questions, answered" title="Clear information before you specify." intro="A practical starting point for understanding Proteger, its stated product ranges and the faucet formats described on the company website."/>
    <section className="py-20 lg:py-28"><Container><div className="mx-auto max-w-4xl"><p className="eyebrow text-blue-700">Frequently asked questions</p><h2 className="mt-4 font-display text-4xl font-semibold tracking-tight">What you need to know.</h2><div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">{faqs.map(([q,a],i)=><details key={q} className="group py-6" open={i===0}><summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-semibold text-ink marker:hidden"><span>{q}</span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 text-blue transition group-open:rotate-45 group-open:bg-ice">+</span></summary><p className="max-w-3xl pt-4 pr-10 text-sm leading-7 text-steel">{a}</p></details>)}</div><p className="mt-8 text-xs leading-6 text-slate-400">Information is based on the public Proteger website. Product details, compatibility and warranty terms should be confirmed directly with the company before specification or purchase.</p></div></Container></section><CtaBand/></>;
}
