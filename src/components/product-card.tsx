import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { products } from "@/lib/site";
import { image } from "@/lib/site";

type Product = (typeof products)[number];

const toneStyles: Record<string, string> = {
  burgundy: "from-[#8e334b]/65",
  blue: "from-[#367ebc]/65",
  yellow: "from-[#d9a83b]/60",
  green: "from-[#568a73]/65",
  red: "from-[#d15d58]/65",
  silver: "from-[#718697]/65"
};

const editorialImages = [image.basin, image.detail, image.bathroom, image.interior];

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const photo = editorialImages[index % editorialImages.length];
  return (
    <Link href="/contact" className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-500 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[1.15/1] overflow-hidden bg-slate-200">
        <Image src={photo} alt="Contemporary bathroom basin and faucet detail" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
        <div className={`absolute inset-0 bg-gradient-to-br ${toneStyles[product.tone]} via-transparent to-ink/35 mix-blend-multiply`} />
        <span className="absolute left-5 top-5 text-[10px] font-semibold uppercase tracking-[.2em] text-white">{String(index + 1).padStart(2, "0")}</span>
        <span className="absolute bottom-5 left-5 rounded-full border border-white/45 bg-ink/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.16em] text-white backdrop-blur">{product.family}</span>
        <span className="absolute bottom-5 right-5 grid h-10 w-10 place-items-center rounded-full border border-white/55 text-white transition group-hover:bg-white group-hover:text-ink"><ArrowUpRight size={17}/></span>
      </div>
      <div className="p-6">
        <p className="eyebrow text-blue-700">{product.family}</p>
        <h3 className="mt-2 font-display text-xl font-semibold text-ink">{product.name}</h3>
        <p className="mt-3 text-sm leading-6 text-steel">{product.description}</p>
      </div>
    </Link>
  );
}
