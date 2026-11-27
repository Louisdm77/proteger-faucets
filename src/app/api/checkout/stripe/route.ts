import { NextResponse } from "next/server";
import { cleanNote, priceCart, shippingCountries, siteOrigin, stripeEnabled, stripeRequest } from "@/lib/server/commerce";

export async function POST(req: Request) {
  if (!stripeEnabled()) return NextResponse.json({ error: "Card payments are not available yet." }, { status: 503 });
  try {
    const body = await req.json();
    const cart = priceCart(body.items);
    const note = cleanNote(body.note, 450);
    const origin = siteOrigin(req);

    const f = new URLSearchParams();
    f.set("mode", "payment");
    cart.lines.forEach((l, i) => {
      f.set(`line_items[${i}][quantity]`, String(l.quantity));
      f.set(`line_items[${i}][price_data][currency]`, "usd");
      f.set(`line_items[${i}][price_data][unit_amount]`, String(Math.round(l.product.price * 100)));
      f.set(`line_items[${i}][price_data][product_data][name]`, `${l.product.name} faucet`);
      f.set(`line_items[${i}][price_data][product_data][description]`, "Includes standard handle + Automatic Lockable handle");
      f.set(`line_items[${i}][price_data][product_data][images][0]`, l.product.image);
    });
    shippingCountries().forEach((c, i) => f.set(`shipping_address_collection[allowed_countries][${i}]`, c));
    f.set("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
    f.set("shipping_options[0][shipping_rate_data][display_name]", cart.shipping > 0 ? "Standard shipping" : "Shipping included");
    f.set("shipping_options[0][shipping_rate_data][fixed_amount][amount]", String(Math.round(cart.shipping * 100)));
    f.set("shipping_options[0][shipping_rate_data][fixed_amount][currency]", "usd");
    f.set("phone_number_collection[enabled]", "true");
    f.set("billing_address_collection", "auto");
    f.set("custom_fields[0][key]", "finish");
    f.set("custom_fields[0][label][type]", "custom");
    f.set("custom_fields[0][label][custom]", "Finish (Brushed Nickel or Chrome)");
    f.set("custom_fields[0][type]", "text");
    f.set("custom_fields[0][optional]", "true");
    f.set("metadata[cart]", cart.lines.map((l) => `${l.product.slug}x${l.quantity}`).join(",").slice(0, 490));
    if (note) f.set("metadata[note]", note);
    f.set("success_url", `${origin}/checkout/success?provider=stripe&session_id={CHECKOUT_SESSION_ID}`);
    f.set("cancel_url", `${origin}/checkout?cancelled=1`);

    const session = await stripeRequest<{ url: string }>("/checkout/sessions", { form: f });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[stripe] create session", e);
    return NextResponse.json({ error: e instanceof Error ? e.message : "Could not start card checkout." }, { status: 400 });
  }
}
