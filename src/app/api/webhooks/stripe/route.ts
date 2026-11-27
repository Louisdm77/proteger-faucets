import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { notifyOrder, stripeRequest } from "@/lib/server/commerce";

export const runtime = "nodejs";

function verify(payload: string, header: string | null, secret: string) {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=") as [string, string]));
  const t = Number(parts.t);
  const sigs = header.split(",").filter((p) => p.startsWith("v1=")).map((p) => p.slice(3));
  if (!t || !sigs.length || Math.abs(Date.now() / 1000 - t) > 300) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex");
  return sigs.some((s) => s.length === expected.length && crypto.timingSafeEqual(Buffer.from(s), Buffer.from(expected)));
}

type Session = {
  id: string;
  amount_total: number;
  currency: string;
  payment_status: string;
  customer_details?: { name?: string; email?: string; phone?: string };
  shipping_details?: { name?: string; address?: Record<string, string | null> };
  collected_information?: { shipping_details?: { name?: string; address?: Record<string, string | null> } };
  custom_fields?: { key: string; text?: { value?: string | null } }[];
  metadata?: Record<string, string>;
};

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  const payload = await req.text();
  if (!verify(payload, req.headers.get("stripe-signature"), secret)) return NextResponse.json({ error: "Bad signature." }, { status: 400 });

  const event = JSON.parse(payload) as { type: string; data: { object: Session } };
  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const s = event.data.object;
    if (s.payment_status === "paid") {
      let items: string[] = [];
      try {
        const li = await stripeRequest<{ data: { description: string; quantity: number }[] }>(`/checkout/sessions/${s.id}/line_items?limit=50`);
        items = li.data.map((i) => `  ${i.quantity} x ${i.description}`);
      } catch {
        items = [`  ${s.metadata?.cart ?? ""}`];
      }
      const ship = s.collected_information?.shipping_details ?? s.shipping_details;
      const finish = s.custom_fields?.find((f) => f.key === "finish")?.text?.value;
      await notifyOrder(
        `New card order — $${(s.amount_total / 100).toFixed(2)}`,
        [
          `Stripe session: ${s.id}`,
          `Amount: ${(s.amount_total / 100).toFixed(2)} ${s.currency.toUpperCase()}`,
          `Customer: ${s.customer_details?.name ?? ""} <${s.customer_details?.email ?? ""}> ${s.customer_details?.phone ?? ""}`,
          `Ship to: ${ship?.name ?? ""}, ${Object.values(ship?.address ?? {}).filter(Boolean).join(", ")}`,
          `Finish: ${finish || "—"}`,
          `Notes: ${s.metadata?.note || "—"}`,
          "",
          "Items:",
          ...items,
        ].join("\n")
      );
    }
  }
  return NextResponse.json({ received: true });
}
