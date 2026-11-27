import "server-only";
import { getProduct, type Product } from "@/lib/site";

export type CartItemInput = { slug: string; quantity: number };
export type PricedLine = { product: Product; quantity: number; lineTotal: number };
export type PricedCart = { lines: PricedLine[]; subtotal: number; shipping: number; total: number };

const MAX_QTY = 20;

export function shippingFlat(): number {
  const n = Number(process.env.SHIPPING_FLAT_USD ?? "0");
  return Number.isFinite(n) && n > 0 ? Math.round(n * 100) / 100 : 0;
}

export function shippingCountries(): string[] {
  return (process.env.SHIPPING_COUNTRIES || "US")
    .split(",")
    .map((c) => c.trim().toUpperCase())
    .filter((c) => /^[A-Z]{2}$/.test(c));
}

/** Re-price the cart on the server from the catalogue. Never trust client prices. */
export function priceCart(items: unknown): PricedCart {
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) throw new Error("Your cart is empty.");
  const merged = new Map<string, number>();
  for (const raw of items) {
    const item = raw as Partial<CartItemInput>;
    const slug = String(item?.slug ?? "");
    const qty = Number(item?.quantity);
    if (!getProduct(slug) || !Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) throw new Error("Your cart contains an invalid item.");
    merged.set(slug, Math.min(MAX_QTY, (merged.get(slug) ?? 0) + qty));
  }
  const lines = [...merged].map(([slug, quantity]) => {
    const product = getProduct(slug)!;
    return { product, quantity, lineTotal: round(product.price * quantity) };
  });
  const subtotal = round(lines.reduce((t, l) => t + l.lineTotal, 0));
  const shipping = shippingFlat();
  return { lines, subtotal, shipping, total: round(subtotal + shipping) };
}

export function round(n: number) {
  return Math.round(n * 100) / 100;
}

export function cleanNote(v: unknown, max = 300) {
  return String(v ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);
}

export function siteOrigin(req: Request) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;
  const h = req.headers;
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  return host ? `${proto}://${host}` : new URL(req.url).origin;
}

/* ---------------- Stripe ---------------- */

export const stripeEnabled = () => Boolean(process.env.STRIPE_SECRET_KEY);

export async function stripeRequest<T = Record<string, unknown>>(path: string, init: { method?: string; form?: URLSearchParams } = {}): Promise<T> {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method: init.method ?? (init.form ? "POST" : "GET"),
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      ...(init.form ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
    },
    body: init.form?.toString(),
    cache: "no-store",
  });
  const data = (await res.json()) as T & { error?: { message?: string } };
  if (!res.ok) throw new Error(data.error?.message ?? `Stripe error ${res.status}`);
  return data;
}

/* ---------------- PayPal ---------------- */

export const paypalEnabled = () => Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
export const paypalBase = () => (process.env.PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com");

async function paypalAccess(): Promise<string> {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64");
  const res = await fetch(`${paypalBase()}/v1/oauth2/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  const data = (await res.json()) as { access_token?: string };
  if (!res.ok || !data.access_token) throw new Error("PayPal authentication failed.");
  return data.access_token;
}

export async function paypalRequest<T = Record<string, unknown>>(path: string, body?: unknown, method = body === undefined ? "GET" : "POST"): Promise<T> {
  const access = await paypalAccess();
  const res = await fetch(`${paypalBase()}${path}`, {
    method,
    headers: { Authorization: `Bearer ${access}`, "Content-Type": "application/json", Prefer: "return=representation" },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as T & { message?: string; details?: { description?: string }[] };
  if (!res.ok) throw new Error(data.details?.[0]?.description ?? data.message ?? `PayPal error ${res.status}`);
  return data;
}

/* ---------------- Order notification email (optional, via Resend) ---------------- */

export async function notifyOrder(subject: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL || process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.info("[order]", subject, "\n" + text);
    return;
  }
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: to.split(",").map((s) => s.trim()), subject, text }),
    });
  } catch (e) {
    console.error("[order] notification failed", e);
  }
}
