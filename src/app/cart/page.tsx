"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, Lock, ArrowRight } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { getProduct, money } from "@/lib/site";

export default function CartPage() {
  const { lines, subtotal, setQty, remove } = useCart();
  return (
    <section className="mx-auto max-w-[1120px] px-5 py-14 sm:px-8 lg:px-12">
      <p className="eyebrow text-brand-600">Your bag</p>
      <h1 className="mt-3 font-display text-4xl font-extrabold">Shopping cart</h1>
      {!lines.length ? (
        <div className="mt-10 rounded-3xl border border-dashed border-slate-300 py-20 text-center">
          <ShoppingBag className="mx-auto text-slate-300" size={44} />
          <h2 className="mt-4 text-xl font-extrabold">Your cart is empty</h2>
          <Link href="/products" className="btn-primary mt-6">Shop faucets <ArrowRight size={16} /></Link>
        </div>
      ) : (
        <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 px-5">
            {lines.map((l) => {
              const p = getProduct(l.slug);
              if (!p) return null;
              return (
                <div key={p.slug} className="flex gap-4 py-5">
                  <Link href={`/products/${p.slug}`} className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-white p-1.5">
                    <Image src={p.image} alt={p.name} width={p.w} height={p.h} sizes="96px" className="framed-shot max-h-full max-w-full" style={{ width: "auto", height: "auto" }} />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/products/${p.slug}`} className="font-extrabold hover:text-brand-700">{p.name}</Link>
                    <p className="text-sm text-steel">{money(p.price)} each</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center rounded-full border border-slate-200">
                        <button onClick={() => setQty(p.slug, l.quantity - 1)} aria-label="Decrease quantity" className="p-2"><Minus size={14} /></button>
                        <span className="w-7 text-center text-sm font-bold">{l.quantity}</span>
                        <button onClick={() => setQty(p.slug, Math.min(20, l.quantity + 1))} aria-label="Increase quantity" className="p-2"><Plus size={14} /></button>
                      </div>
                      <button onClick={() => remove(p.slug)} className="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-rose-600"><Trash2 size={13} />Remove</button>
                    </div>
                  </div>
                  <strong>{money(p.price * l.quantity)}</strong>
                </div>
              );
            })}
          </div>
          <aside className="h-fit rounded-3xl bg-mist p-6">
            <h2 className="text-lg font-extrabold">Order summary</h2>
            <div className="mt-5 flex justify-between text-sm"><span>Subtotal</span><span className="font-bold">{money(subtotal)}</span></div>
            <div className="mt-3 flex justify-between text-sm"><span>Shipping</span><span className="text-steel">At checkout</span></div>
            <hr className="my-5 border-slate-200" />
            <div className="flex justify-between text-lg font-extrabold"><span>Total</span><span>{money(subtotal)} <span className="text-xs text-steel">USD</span></span></div>
            <Link href="/checkout" className="btn-primary mt-6 w-full">Checkout securely <Lock size={15} /></Link>
            <p className="mt-4 text-center text-xs text-steel">Pay by card (Stripe) or PayPal</p>
          </aside>
        </div>
      )}
    </section>
  );
}
