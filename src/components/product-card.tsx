import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { products } from "@/lib/site";
type Product=(typeof products)[number];
export function ProductCard({product,index}:{product:Product;index:number}) {
 return <Link href="/contact" className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
  <div className="relative flex aspect-[1.25/1] items-center justify-center overflow-hidden bg-[#f0f1f3] p-5"><Image src={product.image} alt={`${product.name} Proteger faucet product`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-contain p-3 transition duration-500 group-hover:scale-105"/><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[9px] font-bold uppercase tracking-[.16em] text-slate-500">{product.family}</span></div>
  <div className="flex items-center justify-between gap-3 p-4"><div><h3 className="font-display text-sm font-bold text-ink">{product.name}</h3><p className="mt-1 text-[11px] text-slate-500">Product enquiry</p></div><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 text-blue-700 transition group-hover:border-blue group-hover:bg-blue group-hover:text-white"><ArrowUpRight size={16}/></span></div>
 </Link>;
}
