import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "./container";
import { navigation } from "@/lib/site";

export function Footer() {
  return <footer className="bg-[#061321] text-white">
    <Container className="py-16 lg:py-20">
      <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.3fr_.7fr_.7fr]">
        <div className="max-w-md">
          <div className="mb-6 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl border border-blue/50 bg-blue/10 text-lg font-black text-blue">P.</span><span className="font-display text-lg font-extrabold">PROTEGER<span className="text-blue">.</span></span></div>
          <p className="text-sm leading-7 text-white/55">Thoughtful safety innovation, integrated into everyday tapware. Designed to help reduce the risks associated with unsupervised water use.</p>
        </div>
        <div><p className="eyebrow mb-5">Explore</p><div className="grid gap-3">{navigation.slice(1, 6).map(n => <Link key={n.href} href={n.href} className="text-sm text-white/65 transition hover:text-blue">{n.label}</Link>)}</div></div>
        <div><p className="eyebrow mb-5">Start a conversation</p><p className="mb-5 text-sm leading-7 text-white/55">For product enquiries, compatibility questions or commercial applications, get in touch with our team.</p><Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-blue hover:text-white">Contact Proteger <ArrowUpRight size={16}/></Link></div>
      </div>
      <div className="flex flex-col gap-3 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Proteger Faucets. All rights reserved.</span><span>Safety-minded design for everyday spaces.</span></div>
    </Container>
  </footer>;
}
