import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Lock, Flag, ShieldCheck, Droplets, Truck, CreditCard } from "lucide-react";
import { Container } from "@/components/container";
import { ProductImage } from "@/components/product-image";
import { Price } from "@/components/price";
import { AddToCart } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-grid";
import { getProduct, products, site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: `${p.name} ${p.category} Faucet`, description: p.summary, openGraph: { images: [p.image] } };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: p.image,
    description: p.summary,
    brand: { "@type": "Brand", name: site.name },
    offers: { "@type": "Offer", priceCurrency: "USD", price: p.price.toFixed(2), availability: "https://schema.org/InStock", url: `${site.url}/products/${p.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="py-6">
        <nav className="flex items-center gap-1 text-xs font-semibold text-steel" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink">Home</Link><ChevronRight size={13} />
          <Link href="/products" className="hover:text-ink">Shop</Link><ChevronRight size={13} />
          <span className="text-ink">{p.name}</span>
        </nav>
      </Container>
      <section className="pb-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="group rounded-[2rem] border border-slate-200 bg-white p-4 shadow-card">
              <ProductImage src={p.image} alt={`${p.name} faucet`} sizes="(max-width:1024px) 100vw, 50vw" priority className="aspect-square rounded-3xl" />
            </div>
            <div className="lg:pt-6">
              <p className="eyebrow text-brand-600">{p.category} faucet</p>
              <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{p.name}</h1>
              <div className="mt-5 flex items-center gap-3">
                <Price price={p.price} wasPrice={p.wasPrice} large />
                {p.wasPrice && <span className="rounded-full bg-gold-500/15 px-3 py-1 text-xs font-extrabold text-gold-600">New lower price</span>}
              </div>
              <p className="mt-6 text-base leading-8 text-steel">{p.summary}</p>
              <dl className="mt-6 grid gap-3 rounded-2xl bg-mist p-5 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-steel">Finish</dt><dd className="text-right font-bold">{p.finishes}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-steel">In the box</dt><dd className="text-right font-bold">Faucet, standard handle + Automatic Lockable handle</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-steel">Material</dt><dd className="text-right font-bold">Code 5 plastic body, UHMW stem &amp; handle</dd></div>
              </dl>
              <div className="mt-6 max-w-sm"><AddToCart slug={p.slug} /></div>
              <p className="mt-3 text-xs text-steel">Tell us your finish (Brushed Nickel or Chrome) in the order notes at checkout.</p>
              <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
                {[
                  [Lock, "U.S. Patented automatic lock"],
                  [Flag, "Made & certified in the USA"],
                  [Droplets, "BPA-free Code 5 plastic"],
                  [ShieldCheck, "3x stronger than steel"],
                  [CreditCard, "Secure Stripe & PayPal checkout"],
                  [Truck, "Shipping calculated at checkout"],
                ].map(([Icon, label]) => {
                  const I = Icon as typeof Lock;
                  return <li key={label as string} className="flex items-center gap-2.5 font-semibold"><I size={17} className="text-brand-600" />{label as string}</li>;
                })}
              </ul>
            </div>
          </div>
        </Container>
      </section>
      {related.length > 0 && (
        <section className="bg-mist py-16">
          <Container>
            <h2 className="font-display text-3xl font-extrabold">More {p.category.toLowerCase()} faucets</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
          </Container>
        </section>
      )}
    </>
  );
}
