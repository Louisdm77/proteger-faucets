import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBand() {
  return (
    <section className="bg-brand-600 text-white">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6 px-5 py-14 sm:px-8 lg:px-12">
        <div>
          <p className="eyebrow text-white/70">Protect what matters</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold">Every faucet comes with the patented Automatic Lockable handle.</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-brand-700">Shop the range <ArrowRight size={16} /></Link>
          <Link href="/contact" className="btn-ghost">Ask a question</Link>
        </div>
      </div>
    </section>
  );
}
