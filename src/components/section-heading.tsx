export function SectionHeading({ eyebrow, title, text, light = false, center = false }: { eyebrow: string; title: string; text?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow mb-4 ${light ? "text-gold-400" : "text-brand-600"}`}>{eyebrow}</p>
      <h2 className={`font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-[44px] ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {text && <p className={`mt-5 text-base leading-8 ${center ? "mx-auto" : ""} max-w-2xl ${light ? "text-white/65" : "text-steel"}`}>{text}</p>}
    </div>
  );
}
