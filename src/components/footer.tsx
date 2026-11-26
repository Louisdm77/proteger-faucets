import Link from "next/link";
import { ArrowUpRight, Droplet } from "lucide-react";
import { Container } from "./container";
import { navigation } from "@/lib/site";
export function Footer() {
 return <footer className="bg-[#070d16] text-white"><Container className="py-12 lg:py-14">
  <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.2fr_.8fr_.9fr]">
   <div className="max-w-sm"><Link href="/" className="mb-5 inline-flex items-center gap-2.5"><Droplet size={34} className="fill-blue text-blue"/><span className="font-display text-lg font-extrabold leading-none">PROTEGER<span className="block pt-1 text-[8px] tracking-[.34em] text-white/70">FAUCETS</span></span></Link><p className="text-sm leading-7 text-white/55">An integrated faucet safety concept designed to help reduce everyday water-related risks.</p></div>
   <div><p className="eyebrow mb-5 text-sky-400">Explore</p><div className="grid gap-3">{navigation.map(n=><Link key={n.href} href={n.href} className="text-sm text-white/65 transition hover:text-blue">{n.label}</Link>)}</div></div>
   <div><p className="eyebrow mb-5 text-sky-400">Get in touch</p><p className="mb-5 text-sm leading-7 text-white/55">For product enquiries, compatibility questions or commercial applications, start a conversation with our team.</p><Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-blue hover:text-white">Contact Proteger <ArrowUpRight size={16}/></Link></div>
  </div><div className="flex flex-col gap-3 pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Proteger Faucets. All rights reserved.</span><span>Safety-minded tapware for everyday spaces.</span></div>
 </Container></footer>;
}
