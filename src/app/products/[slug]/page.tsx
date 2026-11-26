"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ShoppingBag, ArrowLeft, Check } from "lucide-react";
import { products } from "@/lib/site";
import { useCart } from "@/components/cart-provider";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const p = products.find((x) => x.slug === slug);
  const { add, count } = useCart();
  const [added, setAdded] = useState(false);

  if (!p) return <div className="px-6 py-24 text-center">Product not found. <Link href="/products">Back to shop</Link></div>;

  const productSlug = p.slug;

  function addToCart() {
    add(productSlug);
    setAdded(true);
  }

  return (
    <section className="mx-auto grid max-w-[1180px] gap-12 px-6 py-16 lg:grid-cols-2 lg:px-12">
      <div className="flex min-h-[420px] items-center justify-center rounded-3xl bg-[#f2f5f8] p-10">
        <Image src={p.image} alt={p.name} width={650} height={520} unoptimized className="max-h-[440px] w-full object-contain" />
      </div>
      <div className="py-4">
        <Link href="/products" className="text-xs font-bold text-blue-600"><ArrowLeft className="mr-1 inline" size={14} /> All products</Link>
        <p className="eyebrow mt-8 text-blue-600">{p.family}</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-[#081a2e]">{p.name}</h1>
        <p className="mt-4 text-3xl font-extrabold">${p.price.toFixed(2)} <span className="text-xs font-medium text-slate-400">sample price</span></p>
        <p className="mt-6 text-sm leading-8 text-slate-600">{p.description}</p>
        <div className="mt-7 rounded-2xl border bg-slate-50 p-5 text-sm leading-6 text-slate-600"><strong className="text-[#081a2e]">Compatibility</strong><p className="mt-2">Check faucet type before ordering. Contact Proteger if you need help confirming compatibility.</p></div>
        <button onClick={addToCart} aria-live="polite" className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-extrabold text-white transition sm:w-auto ${added ? "bg-emerald-600" : "bg-[#087cf0]"}`}>
          {added ? <><Check size={17} /> Added to Cart</> : <><ShoppingBag size={17} /> Add to Cart</>}
        </button>
        {added && <div role="status" className="mt-4 max-w-md rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">Added successfully. Your cart now has {count} {count === 1 ? "item" : "items"}. <Link href="/cart" className="ml-1 underline underline-offset-2">View cart</Link></div>}
        <p className="mt-4 text-xs text-slate-400">Demo store. No live payment is taken.</p>
      </div>
    </section>
  );
}
