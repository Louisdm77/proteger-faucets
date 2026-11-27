"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { navigation, site } from "@/lib/site";
import { Logo } from "@/components/logo";

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-brand-600 px-4 py-2 text-center text-[12px] font-semibold text-white">
        <ShieldCheck size={14} className="mr-1.5 inline -mt-0.5" />
        {site.headline} &middot; Every faucet comes with the patented Automatic Lockable handle
      </div>
      <div className="border-b border-slate-200/80 bg-white/90 text-ink backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-5 py-3.5 sm:px-8 lg:px-12">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active(item.href) ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:text-ink"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700" aria-label={`Cart, ${count} items`}>
              <ShoppingBag size={17} />
              <span className="hidden sm:inline">Cart</span>
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1.5 text-[11px] font-extrabold text-brand-700">{count}</span>
            </Link>
            <button onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open} className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 lg:hidden">
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="grid gap-1 border-t border-slate-200 p-4 lg:hidden" aria-label="Mobile">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`rounded-xl px-4 py-3 text-sm font-semibold ${active(item.href) ? "bg-brand-50 text-brand-700" : "hover:bg-slate-50"}`}>
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
