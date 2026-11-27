import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = { title: "FAQs", description: "Answers to common questions about Proteger automatic lockable faucets, materials, ordering and payment." };

const faqs = [
  ["What makes Proteger different?", "Proteger makes the world's first automatic lockable faucets. Each faucet comes with a standard handle and a U.S. Patented Automatic Lockable handle that stops young children turning on the water."],
  ["What are the faucets made from?", "A U.S. certified next-generation Polyethylene Code 5 base and spout, with an Ultra-High-Molecular-Weight Polyethylene stem and handle — three times stronger than steel. The Code 5 plastic is BPA free."],
  ["Where are they made?", "Proteger faucets are manufactured in the United States of America, complying with U.S. Standards."],
  ["Which finishes are available?", "Coated Brushed Nickel (brushed stainless steel look) or Chrome on most models. Barium and Spartus kitchen mixers come with a coloured flexible hose. Add your finish choice in the order notes at checkout."],
  ["Which handles come in the box?", "Every faucet includes one standard handle for everyday operation and one Automatic Lockable handle. You can change between them easily to suit your needs."],
  ["How do I pay?", "Pay securely by credit or debit card through Stripe, or with your PayPal account. We never see or store your card details."],
  ["Can I use Proteger accessories with other brands?", "No. Proteger's accessories must only be used with Proteger's products."],
];

export default function FaqsPage() {
  return (
    <>
      <PageHero eyebrow="FAQs" title="Questions, answered" />
      <section className="py-20">
        <Container className="max-w-3xl">
          <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200">
            {faqs.map(([q, a]) => (
              <details key={q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-lg font-extrabold">
                  {q}<span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mist text-brand-600 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-steel">{a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
