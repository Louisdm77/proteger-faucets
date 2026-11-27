import Link from "next/link";
import { Lock, Flag, BadgeCheck } from "lucide-react";
import { Logo } from "@/components/logo";
import { navigation, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-12">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
            {site.headline}. Precision safety faucets made and certified in the USA from next-generation Code 5 plastic.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-bold">
            <span className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5"><Lock size={13} className="text-gold-400" />U.S. Patented lock</span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5"><Flag size={13} className="text-gold-400" />Made in USA</span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5"><BadgeCheck size={13} className="text-gold-400" />BPA free</span>
          </div>
        </div>
        <div>
          <p className="eyebrow text-white/40">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navigation.map((n) => (
              <li key={n.href}><Link href={n.href} className="text-white/70 hover:text-white">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-white/40">Shop</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/products?category=Kitchen" className="text-white/70 hover:text-white">Kitchen mixers</Link></li>
            <li><Link href="/products?category=Basin" className="text-white/70 hover:text-white">Basin mixers</Link></li>
            <li><Link href="/products?category=Shower%20%26%20Bath" className="text-white/70 hover:text-white">Shower &amp; bath</Link></li>
            <li><Link href="/cart" className="text-white/70 hover:text-white">Your cart</Link></li>
          </ul>
          <p className="mt-6 text-xs leading-6 text-white/45">Secure checkout by Stripe and PayPal. Prices in USD.</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-6 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} {site.name}. All rights reserved. Proteger Accessories must only be used with Proteger products.
      </div>
    </footer>
  );
}
