import Link from "next/link";
import { Lock } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Proteger Faucets home">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-600/30">
        <Lock size={21} strokeWidth={2.6} />
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[19px] font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}>
          Protéger<span className="text-brand-600"> Faucets</span>
        </span>
        <span className={`mt-1 block text-[10px] font-semibold tracking-[.18em] ${light ? "text-white/60" : "text-steel"}`}>
          PROTEGER &lsquo;PROTECT&rsquo;<sup className="ml-0.5">®</sup>
        </span>
      </span>
    </Link>
  );
}
