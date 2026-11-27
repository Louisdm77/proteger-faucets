import { NextResponse } from "next/server";
import { notifyOrder, paypalEnabled, paypalRequest } from "@/lib/server/commerce";

type Capture = {
  id: string;
  status: string;
  payer?: { email_address?: string; name?: { given_name?: string; surname?: string } };
  purchase_units?: {
    custom_id?: string;
    items?: { name: string; quantity: string }[];
    shipping?: { name?: { full_name?: string }; address?: Record<string, string> };
    payments?: { captures?: { id: string; status: string; amount: { value: string; currency_code: string } }[] };
  }[];
};

export async function POST(req: Request) {
  if (!paypalEnabled()) return NextResponse.json({ error: "PayPal is not available yet." }, { status: 503 });
  try {
    const { orderId } = await req.json();
    if (typeof orderId !== "string" || !/^[A-Z0-9]{5,40}$/.test(orderId)) return NextResponse.json({ error: "Invalid order." }, { status: 400 });
    const data = await paypalRequest<Capture>(`/v2/checkout/orders/${orderId}/capture`, {});
    const unit = data.purchase_units?.[0];
    const cap = unit?.payments?.captures?.[0];
    if (data.status !== "COMPLETED" || cap?.status !== "COMPLETED") {
      return NextResponse.json({ error: "The payment was not completed. Please try again." }, { status: 402 });
    }
    const addr = unit?.shipping?.address ?? {};
    await notifyOrder(
      `New PayPal order ${data.id} — $${cap.amount.value}`,
      [
        `PayPal order: ${data.id} (capture ${cap.id})`,
        `Amount: ${cap.amount.value} ${cap.amount.currency_code}`,
        `Customer: ${data.payer?.name?.given_name ?? ""} ${data.payer?.name?.surname ?? ""} <${data.payer?.email_address ?? ""}>`,
        `Ship to: ${unit?.shipping?.name?.full_name ?? ""}, ${Object.values(addr).join(", ")}`,
        `Notes / finish: ${unit?.custom_id ?? "—"}`,
        "",
        "Items:",
        ...(unit?.items ?? []).map((i) => `  ${i.quantity} x ${i.name}`),
      ].join("\n")
    );
    return NextResponse.json({ ok: true, id: data.id });
  } catch (e) {
    console.error("[paypal] capture", e);
    return NextResponse.json({ error: e instanceof Error ? e.message : "Could not complete PayPal payment." }, { status: 400 });
  }
}
