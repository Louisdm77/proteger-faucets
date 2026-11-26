"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowRight, Check } from "lucide-react";
import { products } from "@/lib/site";
import { useCart } from "@/components/cart-provider";

export function StoreProducts() {
  const { add, count } = useCart();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  function addProduct(slug: (typeof products)[number]["slug"]) {
    add(slug);
    setAddedSlug(slug);
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p) => (
        <article key={p.slug} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
          <Link href={`/products/${p.slug}`}>
            <div className="relative flex h-56 items-center justify-center bg-[#f2f5f8] p-5">
              <Image src={p.image} alt={p.name} width={400} height={320} unoptimized className="h-full w-full object-contain transition group-hover:scale-105" />
              <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase text-slate-600">{p.family}</span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-extrabold text-[#091a2d]">{p.name}</h3>
              <p className="mt-2 text-xs text-slate-500">Proteger faucet product</p>
              <div className="mt-4 flex items-center justify-between">
                <strong className="text-lg">${p.price.toFixed(2)}</strong>
                <span className="text-xs font-bold text-blue-600">Details <ArrowRight size={13} className="inline" /></span>
              </div>
            </div>
          </Link>
          <div className="px-5 pb-5">
            <button onClick={() => addProduct(p.slug)} aria-live="polite" className={`flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white transition ${addedSlug === p.slug ? "bg-emerald-600" : "bg-[#087cf0] hover:bg-[#0667c9]"}`}>
              {addedSlug === p.slug ? <><Check size={16} /> Added to Cart</> : <><ShoppingBag size={16} /> Add to Cart</>}
            </button>
            {addedSlug === p.slug && (
              <div role="status" className="mt-3 rounded-xl bg-emerald-50 px-3 py-3 text-center text-xs font-semibold text-emerald-800">
                Added successfully. Your cart has {count} {count === 1 ? "item" : "items"}. <Link href="/cart" className="underline underline-offset-2">View cart</Link>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
