import Link from "next/link";
import { Lock, Flag, BadgeCheck } from "lucide-react";
import { Logo } from "@/components/logo";
import { navigation, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-mist text-ink">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-12">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-7 text-steel">
            {site.headline}. Precision safety faucets made and certified in the USA from next-generation Code 5 plastic.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-bold">
            <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5"><Lock size={13} className="text-brand-600" />U.S. Patented lock</span>
            <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5"><Flag size={13} className="text-brand-600" />Made in USA</span>
            <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5"><BadgeCheck size={13} className="text-brand-600" />BPA free</span>
          </div>
        </div>
        <div>
          <p className="eyebrow text-slate-400">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navigation.map((n) => (
              <li key={n.href}><Link href={n.href} className="text-steel hover:text-brand-700">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-slate-400">Shop</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/products?category=Kitchen" className="text-steel hover:text-brand-700">Kitchen mixers</Link></li>
            <li><Link href="/products?category=Basin" className="text-steel hover:text-brand-700">Basin mixers</Link></li>
            <li><Link href="/products?category=Shower%20%26%20Bath" className="text-steel hover:text-brand-700">Shower &amp; bath</Link></li>
            <li><Link href="/cart" className="text-steel hover:text-brand-700">Your cart</Link></li>
          </ul>
          <p className="mt-6 text-xs leading-6 text-slate-500">Secure checkout by Stripe and PayPal. Prices in USD.</p>
        </div>
      </div>
      <div className="border-t border-slate-200 px-5 py-6 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} {site.name}. All rights reserved. Proteger Accessories must only be used with Proteger products.
      </div>
    </footer>
  );
}
