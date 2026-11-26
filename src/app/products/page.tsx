import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { products } from "@/lib/site";

export const metadata: Metadata = { title: "Products", description: "Explore Proteger Faucets product ranges, including the Barium collection, Semblance, Populace and Cornet." };

export default function ProductsPage() {
  return <><PageHero eyebrow="The collection" title="Safety-minded tapware, thoughtfully presented." intro="Explore the product names featured by Proteger. For detailed specifications, finish options and current availability, speak with our team."/>
    <section className="py-20 lg:py-28"><Container><SectionHeading eyebrow="Proteger ranges" title="Find the range that fits your project." text="Product names and groupings below reflect the current Proteger website. Individual dimensions, materials and configurations are not published here; please enquire for confirmed details."/><div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map((p,i)=><ProductCard key={p.name} product={p} index={i}/>)}</div></Container></section>
    <section className="bg-mist py-20"><Container><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="eyebrow text-blue-700">Need help choosing?</p><h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">Start with the faucet format and application.</h2></div><p className="max-w-2xl text-base leading-8 text-steel">Compatibility depends on the faucet type and installation context. Share your project details with Proteger before specifying a product, and the team can help clarify the appropriate range.</p></div></Container></section><CtaBand/></>;
}
