import { Container } from "./container";
import { image } from "@/lib/site";

export function PageHero({ eyebrow, title, intro, imageUrl = image.interior }: { eyebrow: string; title: string; intro: string; imageUrl?: string }) {
  return <section className="relative flex min-h-[560px] items-end overflow-hidden bg-ink pt-36 text-white">
    <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url("${imageUrl}")` }} />
    <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
    <Container className="relative z-10 pb-16 pt-20 lg:pb-24">
      <p className="eyebrow mb-5 text-blue">{eyebrow}</p>
      <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.04] tracking-[-.045em] sm:text-6xl lg:text-7xl">{title}</h1>
      <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">{intro}</p>
    </Container>
  </section>;
}
