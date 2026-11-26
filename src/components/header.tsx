"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight, Droplet } from "lucide-react";
import { navigation } from "@/lib/site";
export function Header() {
  const pathname=usePathname(); const [open,setOpen]=useState(false);
  return <header className="relative z-50 border-b border-white/10 bg-[#080e18] text-white">
    <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3 sm:px-8 lg:px-12">
      <Link href="/" aria-label="Proteger Faucets home" className="flex items-center gap-2.5" onClick={()=>setOpen(false)}><Droplet size={34} strokeWidth={2.6} className="fill-blue text-blue"/><span className="font-display text-[17px] font-extrabold leading-none tracking-tight">PROTEGER<span className="block pt-1 text-[8px] font-bold tracking-[.34em] text-white/75">FAUCETS</span></span></Link>
      <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">{navigation.map(item=><Link key={item.href} href={item.href} className={`border-b-2 py-2 text-[13px] font-semibold transition hover:border-blue hover:text-blue ${pathname===item.href?"border-blue text-blue":"border-transparent text-white/85"}`}>{item.label}</Link>)}</nav>
      <Link href="/contact" className="hidden items-center gap-2 rounded-full bg-blue px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue/20 transition hover:bg-sky-400 lg:inline-flex">Get a Quote <ArrowUpRight size={15}/></Link>
      <button className="grid h-10 w-10 place-items-center rounded-full border border-white/20 lg:hidden" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </div>
    {open&&<nav className="border-t border-white/10 bg-[#080e18] px-5 py-4 lg:hidden" aria-label="Mobile navigation"><div className="mx-auto grid max-w-[1280px] gap-1">{navigation.map(item=><Link key={item.href} href={item.href} onClick={()=>setOpen(false)} className={`rounded-lg px-4 py-3 text-sm ${pathname===item.href?"bg-white/10 text-blue":"text-white/85 hover:bg-white/5"}`}>{item.label}</Link>)}<Link href="/contact" onClick={()=>setOpen(false)} className="mt-2 rounded-full bg-blue px-4 py-3 text-center text-sm font-bold text-white">Get a Quote</Link></div></nav>}
  </header>;
}
