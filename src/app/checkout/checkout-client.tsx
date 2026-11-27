"use client";

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { CreditCard, Lock, LoaderCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { getProduct, money } from "@/lib/site";

type PayPalButtons = { render: (el: HTMLElement) => Promise<void>; close?: () => void };
declare global {
  interface Window {
    paypal?: { Buttons: (opts: Record<string, unknown>) => PayPalButtons };
  }
}

export function CheckoutClient({ stripe, paypalClientId, shipping, cancelled }: { stripe: boolean; paypalClientId: string | null; shipping: number; cancelled: boolean }) {
  const { lines, subtotal } = useCart();
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(cancelled ? "Payment was cancelled. Your cart is still saved." : "");
  const [ppReady, setPpReady] = useState(false);
  const ppRef = useRef<HTMLDivElement>(null);
  const state = useRef({ lines, note });
  state.current = { lines, note };

  const items = () => state.current.lines.map((l) => ({ slug: l.slug, quantity: l.quantity }));

  async function payByCard() {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/checkout/stripe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: items(), note }) });
      const d = await r.json();
      if (!r.ok || !d.url) throw new Error(d.error || "Could not start checkout.");
      window.location.href = d.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start checkout.");
      setBusy(false);
    }
  }

  useEffect(() => {
    if (!ppReady || !window.paypal || !ppRef.current || !lines.length) return;
    ppRef.current.innerHTML = "";
    const buttons = window.paypal.Buttons({
      style: { layout: "vertical", shape: "pill", label: "paypal", height: 48 },
      createOrder: async () => {
        setError("");
        const r = await fetch("/api/checkout/paypal/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: items(), note: state.current.note }) });
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || "Could not start PayPal.");
        return d.id;
      },
      onApprove: async (data: { orderID: string }) => {
        setBusy(true);
        const r = await fetch("/api/checkout/paypal/capture", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId: data.orderID }) });
        const d = await r.json();
        if (!r.ok) {
          setBusy(false);
          setError(d.error || "PayPal payment failed.");
          return;
        }
        window.location.href = `/checkout/success?provider=paypal&order=${encodeURIComponent(d.id)}`;
      },
      onCancel: () => setError("PayPal payment was cancelled."),
      onError: (err: unknown) => setError(err instanceof Error ? err.message : "PayPal payment failed. Please try again."),
    });
    buttons.render(ppRef.current).catch(() => {});
    return () => buttons.close?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ppReady, lines.length]);

  if (!lines.length) {
    return (
      <section className="px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-extrabold">Your cart is empty</h1>
        <Link href="/products" className="btn-primary mt-6">Shop faucets</Link>
      </section>
    );
  }

  const total = subtotal + shipping;
  const none = !stripe && !paypalClientId;

  return (
    <section className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 lg:px-12">
      {paypalClientId && (
        <Script src={`https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(paypalClientId)}&currency=USD&intent=capture&components=buttons`} onReady={() => setPpReady(true)} />
      )}
      <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel hover:text-ink"><ArrowLeft size={15} />Back to cart</Link>
      <h1 className="mt-4 font-display text-4xl font-extrabold">Secure checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          {error && (
            <div role="alert" className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />{error}
            </div>
          )}
          <label className="form-label">
            Order notes <span className="font-normal text-steel">(finish choice, hose colour, delivery instructions)</span>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={300} rows={3} className="form-input" placeholder="e.g. Brushed Nickel finish" />
          </label>

          <h2 className="mt-9 text-lg font-extrabold">Choose how to pay</h2>
          {none && (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              Online payment is being set up. To order now, please <Link href="/contact" className="font-bold underline">contact us</Link> and we&rsquo;ll arrange payment with you directly.
            </div>
          )}
          {stripe && (
            <div className="mt-4 rounded-3xl border border-slate-200 p-6">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 font-extrabold"><CreditCard size={20} className="text-brand-600" />Credit or debit card</p>
                <span className="text-xs font-semibold text-steel">Visa · Mastercard · Amex · Apple Pay · Google Pay</span>
              </div>
              <p className="mt-2 text-sm text-steel">You&rsquo;ll enter your card and shipping address on Stripe&rsquo;s secure payment page.</p>
              <button onClick={payByCard} disabled={busy} className="btn-primary mt-5 w-full">
                {busy ? <><LoaderCircle className="animate-spin" size={17} />Redirecting…</> : <>Pay {money(total)} by card <Lock size={15} /></>}
              </button>
            </div>
          )}
          {paypalClientId && (
            <div className="mt-4 rounded-3xl border border-slate-200 p-6">
              <p className="font-extrabold">PayPal</p>
              <p className="mt-2 text-sm text-steel">Pay with your PayPal account. Your shipping address comes from PayPal.</p>
              <div ref={ppRef} className="mt-5 min-h-[50px]">{!ppReady && <p className="text-xs text-steel">Loading PayPal…</p>}</div>
            </div>
          )}
          <p className="mt-6 flex items-center gap-2 text-xs text-steel"><Lock size={13} />Payments are processed securely by Stripe and PayPal. We never see or store your card details.</p>
        </div>

        <aside className="h-fit rounded-3xl bg-mist p-6 lg:sticky lg:top-32">
          <h2 className="font-extrabold">Order summary</h2>
          <div className="mt-4 space-y-4">
            {lines.map((l) => {
              const p = getProduct(l.slug);
              if (!p) return null;
              return (
                <div key={l.slug} className="flex items-center gap-3 text-sm">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white"><Image src={p.image} alt="" fill sizes="56px" className="product-shot object-contain p-1" /></div>
                  <span className="flex-1">{p.name} <span className="text-steel">× {l.quantity}</span></span>
                  <strong>{money(p.price * l.quantity)}</strong>
                </div>
              );
            })}
          </div>
          <hr className="my-5 border-slate-200" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping > 0 ? money(shipping) : "Included"}</span></div>
          </div>
          <div className="mt-4 flex justify-between text-lg font-extrabold"><span>Total</span><span>{money(total)} <span className="text-xs text-steel">USD</span></span></div>
        </aside>
      </div>
    </section>
  );
}
