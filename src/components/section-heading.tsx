export function SectionHeading({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className="max-w-3xl"><p className={`eyebrow mb-4 ${light ? "text-blue" : "text-blue-700"}`}>{eyebrow}</p><h2 className={`font-display text-4xl font-semibold leading-[1.08] tracking-[-.04em] sm:text-5xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>{text && <p className={`mt-5 max-w-2xl text-base leading-8 ${light ? "text-white/60" : "text-steel"}`}>{text}</p>}</div>;
}
