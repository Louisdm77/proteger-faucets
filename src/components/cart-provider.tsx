"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
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
      add: (slug) =>
        setLines((current) =>
          current.some((line) => line.slug === slug)
            ? current.map((line) =>
                line.slug === slug
                  ? { ...line, quantity: line.quantity + 1 }
                  : line
              )
            : [...current, { slug, quantity: 1 }]
        ),
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

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
