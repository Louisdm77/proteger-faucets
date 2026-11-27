"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";

export function AddToCart({ slug, full = true, quantity = 1 }: { slug: string; full?: boolean; quantity?: number }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        for (let i = 0; i < quantity; i++) add(slug);
        setDone(true);
        window.setTimeout(() => setDone(false), 1800);
      }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold text-white transition ${full ? "w-full" : ""} ${done ? "bg-emerald-600" : "bg-brand-600 hover:bg-brand-700"}`}
    >
      {done ? <><Check size={16} /> Added</> : <><ShoppingBag size={16} /> Add to cart</>}
    </button>
  );
}
