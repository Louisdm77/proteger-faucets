"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 text-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="Proteger Faucets home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-blue/60 bg-blue/10 text-blue">
            <span className="text-lg font-black tracking-tighter">P.</span>
          </span>
          <span className="font-display text-[17px] font-extrabold tracking-tight">PROTEGER<span className="text-blue">.</span><span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[.28em] text-white/55">Safety Faucets</span></span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={`text-[13px] font-medium transition hover:text-blue ${pathname === item.href ? "text-blue" : "text-white/75"}`}>{item.label}</Link>
          ))}
        </nav>
        <Link href="/contact" className="hidden items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-xs font-semibold transition hover:border-blue hover:bg-blue hover:text-ink lg:inline-flex">Talk to our team <ArrowUpRight size={15} /></Link>
        <button className="grid h-11 w-11 place-items-center rounded-full border border-white/20 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="border-t border-white/10 bg-ink px-5 py-5 lg:hidden" aria-label="Mobile navigation">
        <div className="mx-auto grid max-w-[1280px] gap-1">{navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`rounded-lg px-4 py-3 text-sm ${pathname === item.href ? "bg-white/10 text-blue" : "text-white/80 hover:bg-white/5"}`}>{item.label}</Link>)}</div>
      </nav>}
    </header>
  );
}
