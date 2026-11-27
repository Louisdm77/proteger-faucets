import type { Metadata } from "next";
import { CheckoutClient } from "./checkout-client";
import { paypalEnabled, shippingFlat, stripeEnabled } from "@/lib/server/commerce";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ cancelled?: string }> }) {
  const { cancelled } = await searchParams;
  return (
    <CheckoutClient
      stripe={stripeEnabled()}
      paypalClientId={paypalEnabled() ? process.env.PAYPAL_CLIENT_ID! : null}
      shipping={shippingFlat()}
      cancelled={cancelled === "1"}
    />
  );
}
