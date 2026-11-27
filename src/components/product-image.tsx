import Image from "next/image";

export function ProductImage({ src, alt, sizes, priority = false, className = "" }: { src: string; alt: string; sizes: string; priority?: boolean; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-white ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="product-shot object-contain p-4 transition duration-500 group-hover:scale-[1.09]" />
    </div>
  );
}
