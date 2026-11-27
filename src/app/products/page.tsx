import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/container";
import { ProductGrid } from "@/components/product-grid";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Shop Faucets",
  description: "Shop Proteger automatic lockable kitchen, basin and shower faucets. New lower prices from $29.",
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  return (
    <>
      <PageHero eyebrow="The Proteger range" title="Shop automatic lockable faucets" intro="Kitchen, basin and shower mixers in Brushed Nickel or Chrome. Every faucet comes with one standard handle and one patented Automatic Lockable handle." />
      <section className="bg-mist py-14 lg:py-20">
        <Container>
          <ProductGrid key={category ?? "All"} initialCategory={category ?? "All"} />
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
