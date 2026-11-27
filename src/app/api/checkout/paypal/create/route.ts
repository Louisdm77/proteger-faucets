import { NextResponse } from "next/server";
import { cleanNote, paypalEnabled, paypalRequest, priceCart } from "@/lib/server/commerce";

const v = (n: number) => n.toFixed(2);

export async function POST(req: Request) {
  if (!paypalEnabled()) return NextResponse.json({ error: "PayPal is not available yet." }, { status: 503 });
  try {
    const body = await req.json();
    const cart = priceCart(body.items);
    const note = cleanNote(body.note, 120);
    const order = await paypalRequest<{ id: string }>("/v2/checkout/orders", {
      intent: "CAPTURE",
      purchase_units: [
        {
          description: "Proteger Faucets order",
          custom_id: note || undefined,
          amount: {
            currency_code: "USD",
            value: v(cart.total),
            breakdown: { item_total: { currency_code: "USD", value: v(cart.subtotal) }, shipping: { currency_code: "USD", value: v(cart.shipping) } },
          },
          items: cart.lines.map((l) => ({
            name: `${l.product.name} faucet`.slice(0, 127),
            sku: l.product.slug,
            quantity: String(l.quantity),
            category: "PHYSICAL_GOODS",
            unit_amount: { currency_code: "USD", value: v(l.product.price) },
          })),
        },
      ],
      payment_source: {
        paypal: {
          experience_context: { brand_name: "Proteger Faucets", shipping_preference: "GET_FROM_FILE", user_action: "PAY_NOW" },
        },
      },
    });
    return NextResponse.json({ id: order.id });
  } catch (e) {
    console.error("[paypal] create", e);
    return NextResponse.json({ error: e instanceof Error ? e.message : "Could not start PayPal checkout." }, { status: 400 });
  }
}
