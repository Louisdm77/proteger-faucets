import { money } from "@/lib/site";

export function Price({ price, wasPrice, large = false }: { price: number; wasPrice?: number; large?: boolean }) {
  return (
    <span className="flex items-baseline gap-2">
      <strong className={`${large ? "text-3xl" : "text-lg"} font-extrabold text-ink`}>{money(price)}</strong>
      {wasPrice && <del className={`${large ? "text-lg" : "text-sm"} font-semibold text-slate-400`}>{money(wasPrice)}</del>}
    </span>
  );
}
