import Image from "next/image";

/** Shows a product photo at its natural aspect ratio, trimming the thin frame baked into the original site's photos. */
export function ProductImage({ src, alt, w, h, sizes, priority = false, className = "", pad = "p-5" }: { src: string; alt: string; w: number; h: number; sizes: string; priority?: boolean; className?: string; pad?: string }) {
  return (
    <div className={`flex items-center justify-center overflow-hidden bg-white ${pad} ${className}`}>
      <Image src={src} alt={alt} width={w} height={h} sizes={sizes} priority={priority} className="framed-shot max-h-full max-w-full transition duration-500 group-hover:scale-[1.09]" style={{ width: "auto", height: "auto", ...(w < 250 ? { clipPath: "inset(5.5%)", transform: "scale(1.12)" } : {}) }} />
    </div>
  );
}
