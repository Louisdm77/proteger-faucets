import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function ButtonLink({ href, children, light = false, className = "" }: {
  href: string; children: ReactNode; light?: boolean; className?: string;
}) {
  return (
    <Link href={href} className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${light ? "bg-white text-ink hover:bg-blue-50" : "bg-blue text-ink hover:bg-white"} ${className}`}>
      {children}<ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
