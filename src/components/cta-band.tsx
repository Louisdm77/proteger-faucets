import { Container } from "./container";
import { ButtonLink } from "./button-link";

export function CtaBand() {
  return <section className="bg-ink py-16 text-white lg:py-20"><Container><div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"><div className="max-w-2xl"><p className="eyebrow mb-4 text-blue">Let’s talk safety</p><h2 className="font-display text-4xl font-semibold tracking-[-.04em] sm:text-5xl">A safer detail can make a meaningful difference.</h2><p className="mt-5 text-base leading-7 text-white/60">Talk with Proteger about the right product range and faucet configuration for your project.</p></div><ButtonLink href="/contact" light>Discuss your project</ButtonLink></div></Container></section>;
}
