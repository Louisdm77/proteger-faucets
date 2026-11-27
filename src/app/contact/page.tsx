import type { Metadata } from "next";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact", description: "Contact Proteger Faucets about products, compatibility and project enquiries." };

export default function ContactPage() {
  return <><PageHero eyebrow="Get in touch" title="Talk to Proteger" intro="Questions about a faucet, your order, finishes or a hotel and commercial project? Send us a message and we'll get back to you."/>
    <section className="py-20 lg:py-28"><Container><div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow text-brand-600">Contact Proteger</p><h2 className="mt-4 font-display text-4xl font-semibold tracking-tight">Tell us what you have in mind.</h2><p className="mt-5 text-sm leading-7 text-steel">Share a few details about your faucet type, project or question. The team can help you identify the next step.</p><div className="mt-10 space-y-6"><div className="flex gap-4"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600"><Mail size={19}/></span><div><p className="text-sm font-bold">Email</p><p className="mt-1 text-sm text-steel">Use the enquiry form to reach the team.</p></div></div><div className="flex gap-4"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600"><MessageCircle size={19}/></span><div><p className="text-sm font-bold">Product & project enquiries</p><p className="mt-1 text-sm text-steel">Include your faucet type and intended application.</p></div></div><div className="flex gap-4"><span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600"><MapPin size={19}/></span><div><p className="text-sm font-bold">Regional information</p><p className="mt-1 text-sm text-steel">Ask about availability and regional terms.</p></div></div></div></div><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft sm:p-10"><ContactForm/></div></div></Container></section></>;
}
