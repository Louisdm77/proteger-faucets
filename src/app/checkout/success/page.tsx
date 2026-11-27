import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { paypalEnabled, paypalRequest, stripeEnabled, stripeRequest } from "@/lib/server/commerce";
import { ClearCart } from "./clear-cart";

export const metadata: Metadata = { title: "Order confirmed", robots: { index: false } };
export const dynamic = "force-dynamic";

async function lookup(provider?: string, sessionId?: string, order?: string) {
  try {
    if (provider === "stripe" && sessionId && stripeEnabled() && /^cs_[A-Za-z0-9_]+$/.test(sessionId)) {
      const s = await stripeRequest<{ payment_status: string; amount_total: number; customer_details?: { email?: string } }>(`/checkout/sessions/${sessionId}`);
      return { paid: s.payment_status === "paid", ref: sessionId.slice(-10).toUpperCase(), amount: s.amount_total / 100, email: s.customer_details?.email };
    }
    if (provider === "paypal" && order && paypalEnabled() && /^[A-Z0-9]{5,40}$/.test(order)) {
      const o = await paypalRequest<{ status: string; payer?: { email_address?: string }; purchase_units?: { amount?: { value: string } }[] }>(`/v2/checkout/orders/${order}`);
      return { paid: o.status === "COMPLETED", ref: order, amount: Number(o.purchase_units?.[0]?.amount?.value ?? 0), email: o.payer?.email_address };
    }
  } catch (e) {
    console.error("[success] lookup", e);
  }
  return null;
}

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ provider?: string; session_id?: string; order?: string }> }) {
  const { provider, session_id, order } = await searchParams;
  const result = await lookup(provider, session_id, order);

  if (!result?.paid) {
    return (
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <Clock className="mx-auto text-amber-500" size={56} />
        <h1 className="mt-5 font-display text-3xl font-extrabold">We&rsquo;re confirming your payment</h1>
        <p className="mt-3 text-sm leading-7 text-steel">If you completed payment, you&rsquo;ll receive a receipt by email shortly. If anything looks wrong, please contact us.</p>
        <div className="mt-8 flex justify-center gap-3"><Link href="/cart" className="btn-primary">Back to cart</Link><Link href="/contact" className="rounded-full border border-slate-300 px-6 py-3.5 text-sm font-bold">Contact us</Link></div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <ClearCart />
      <CheckCircle2 className="mx-auto text-emerald-500" size={60} />
      <h1 className="mt-5 font-display text-4xl font-extrabold">Thank you for your order!</h1>
      <p className="mt-4 text-base leading-8 text-steel">
        Your payment of <strong className="text-ink">${result.amount.toFixed(2)} USD</strong> was successful.
        {result.email && <> A receipt has been sent to <strong className="text-ink">{result.email}</strong>.</>}
      </p>
      <p className="mt-2 text-sm text-steel">Order reference: <strong className="text-ink">{result.ref}</strong></p>
      <Link href="/products" className="btn-primary mt-8">Continue shopping</Link>
    </section>
  );
}
