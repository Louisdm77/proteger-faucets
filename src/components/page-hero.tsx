export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div className="pointer-events-none absolute -right-32 -top-40 h-[460px] w-[460px] rounded-full bg-brand-200/50 blur-3xl" />
      <div className="relative mx-auto max-w-[1280px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <p className="eyebrow text-brand-600">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-base leading-8 text-steel">{intro}</p>}
      </div>
    </section>
  );
}
