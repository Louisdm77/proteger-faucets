"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { products } from "@/lib/site";

export type ProductSlug = (typeof products)[number]["slug"];
export type CartLine = { slug: ProductSlug; quantity: number };
type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: ProductSlug) => void;
  setQty: (slug: ProductSlug, quantity: number) => void;
  remove: (slug: ProductSlug) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [cartNotice, setCartNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("proteger-cart");
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter(
            (item): item is CartLine =>
              item !== null &&
              typeof item === "object" &&
              products.some((product) => product.slug === item.slug) &&
              Number.isInteger(item.quantity) &&
              item.quantity > 0
          );
          setLines(valid);
        }
      }
    } catch {
      // Ignore invalid or unavailable browser storage.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("proteger-cart", JSON.stringify(lines));
    } catch {
      // Cart remains usable for this session if storage is unavailable.
    }
  }, [lines]);

  useEffect(() => {
    if (!cartNotice) return;
    const timeout = window.setTimeout(() => setCartNotice(null), 4500);
    return () => window.clearTimeout(timeout);
  }, [cartNotice]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((total, line) => total + line.quantity, 0),
      subtotal: lines.reduce(
        (total, line) =>
          total +
          (products.find((product) => product.slug === line.slug)?.price ?? 0) *
            line.quantity,
        0
      ),
      add: (slug) => {
        setLines((current) =>
          current.some((line) => line.slug === slug)
            ? current.map((line) =>
                line.slug === slug
                  ? { ...line, quantity: line.quantity + 1 }
                  : line
              )
            : [...current, { slug, quantity: 1 }]
        );
        const product = products.find((item) => item.slug === slug);
        setCartNotice(`${product?.name ?? "Product"} added to your cart`);
      },
      setQty: (slug, quantity) =>
        setLines((current) =>
          quantity < 1
            ? current.filter((line) => line.slug !== slug)
            : current.map((line) =>
                line.slug === slug ? { ...line, quantity } : line
              )
        ),
      remove: (slug) =>
        setLines((current) => current.filter((line) => line.slug !== slug)),
      clear: () => setLines([]),
    }),
    [lines]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      {cartNotice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-[100] flex w-[min( calc(100vw-2.5rem), 390px)] items-center gap-3 rounded-2xl border border-emerald-200 bg-white p-4 text-slate-900 shadow-2xl"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Check size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-extrabold">Added to cart</p>
            <p className="mt-0.5 truncate text-xs text-slate-600">{cartNotice}</p>
            <Link href="/cart" className="mt-1 inline-block text-xs font-bold text-blue-700 underline underline-offset-2">
              View cart
            </Link>
          </div>
          <button type="button" onClick={() => setCartNotice(null)} aria-label="Dismiss cart confirmation" className="rounded-full p-1 text-slate-400 hover:bg-slate-100">
            <X size={17} />
          </button>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
