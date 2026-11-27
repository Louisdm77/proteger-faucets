"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, products, type Product } from "@/lib/site";
import { ProductImage } from "@/components/product-image";
import { Price } from "@/components/price";
import { AddToCart } from "@/components/add-to-cart";

export function ProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  const saving = p.wasPrice ? Math.round((1 - p.price / p.wasPrice) * 100) : 0;
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/products/${p.slug}`} className="relative block">
        <ProductImage src={p.image} w={p.w} h={p.h} alt={`${p.name} faucet`} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" className="aspect-[4/5]" priority={priority} />
        <span className="absolute left-4 top-4 rounded-full bg-mist px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-steel">{p.category}</span>
        {saving > 0 && <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-extrabold text-white">Save {saving}%</span>}
      </Link>
      <div className="flex flex-1 flex-col border-t border-slate-100 p-5">
        <Link href={`/products/${p.slug}`}>
          <h3 className="font-display text-lg font-extrabold text-ink group-hover:text-brand-700">{p.name}</h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-6 text-steel">{p.summary}</p>
        <div className="mt-auto pt-4">
          <Price price={p.price} wasPrice={p.wasPrice} />
          <div className="mt-4"><AddToCart slug={p.slug} /></div>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ initialCategory = "All", limit }: { initialCategory?: string; limit?: number }) {
  const [cat, setCat] = useState<string>(categories.includes(initialCategory as never) ? initialCategory : "All");
  const list = useMemo(() => {
    const filtered = cat === "All" ? products : products.filter((p) => p.category === cat);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [cat, limit]);
  return (
    <div>
      {!limit && (
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {["All", ...categories].map((c) => {
            const n = c === "All" ? products.length : products.filter((p) => p.category === c).length;
            return (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${cat === c ? "bg-brand-600 text-white shadow-md shadow-brand-600/25" : "bg-white text-steel ring-1 ring-slate-200 hover:text-brand-700"}`}>
                {c} <span className="ml-1 opacity-60">{n}</span>
              </button>
            );
          })}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p, i) => <ProductCard key={p.slug} p={p} priority={i < 4} />)}
      </div>
    </div>
  );
}
