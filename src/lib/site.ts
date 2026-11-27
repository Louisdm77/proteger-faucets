export const site = {
  name: "Proteger Faucets",
  tagline: "Proteger 'Protect'",
  headline: "The Only Automatic Lockable Faucets In The World",
  description:
    "Proteger Faucets: the world's first automatic lockable faucets, made and certified in the USA from next-generation Code 5 plastic. Shop kitchen, basin and shower mixers.",
  url: "https://protegerfaucets.com",
  currency: "USD",
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
] as const;

const wp = "https://protegerfaucets.com/wp-content/uploads";

export const categories = ["Kitchen", "Basin", "Shower & Bath"] as const;
export type Category = (typeof categories)[number];

type ProductInput = {
  slug: string;
  name: string;
  category: Category;
  image: string;
  w: number;
  h: number;
  price: number;
  wasPrice?: number;
  summary: string;
  finishes: string;
};

const nickelChrome = "Brushed Nickel or Chrome";

const barium = (colour: string, file: string): Omit<ProductInput, "w" | "h"> => ({
  slug: `barium-${colour.toLowerCase()}`,
  name: `Barium ${colour}`,
  category: "Kitchen",
  image: `${wp}/2020/03/${file}`,
  price: 39,
  wasPrice: 79,
  summary: `Pull-down kitchen mixer with a ${colour.toLowerCase()} flexible hose and chrome body. Supplied with a standard handle and Proteger's Automatic Lockable handle.`,
  finishes: `Chrome with ${colour.toLowerCase()} hose`,
});

const dims: Record<string, [number, number]> = {"sentry": [392, 640], "barium-black": [383, 529], "barium-blue": [362, 492], "barium-burgundy": [377, 505], "barium-green": [360, 475], "barium-red": [373, 480], "barium-yellow": [375, 489], "cosmos": [349, 350], "metropoliton-mk1": [380, 406], "metropoliton-mk2": [360, 396], "volute": [362, 555], "cornet": [333, 443], "populace": [543, 795], "semblance": [327, 490], "effrontery": [212, 301], "emanate": [162, 296], "skillion-t": [374, 400], "stealth": [402, 505], "skillion-s": [544, 473], "spartus": [360, 553]};

const productList: Omit<ProductInput, "w" | "h">[] = [
  barium("Black", "Barium-Black.jpg"),
  barium("Blue", "Barium-Blue.jpg"),
  barium("Burgundy", "Barium-Burgundy.jpg"),
  barium("Green", "Barium-Green.jpg"),
  barium("Red", "Barium-Red.jpg"),
  barium("Yellow", "Barium-Yellow.jpg"),
  {
    slug: "spartus",
    name: "Spartus",
    category: "Kitchen",
    image: `${wp}/2020/03/Spartus.jpg`,
    price: 39,
    wasPrice: 79,
    summary: "Tall pull-out kitchen mixer with a flexible coloured hose and a high-reach spout for deep sinks.",
    finishes: "Chrome with red, green, blue, yellow, burgundy or black hose",
  },
  {
    slug: "cornet",
    name: "Cornet",
    category: "Kitchen",
    image: `${wp}/2020/03/Cornet.jpg`,
    price: 39,
    wasPrice: 79,
    summary: "Classic gooseneck kitchen mixer with a pull-down spray head and a clean, single-lever design.",
    finishes: nickelChrome,
  },
  {
    slug: "populace",
    name: "Populace",
    category: "Kitchen",
    image: `${wp}/2020/03/Populace.jpg`,
    price: 39,
    wasPrice: 79,
    summary: "Professional-style spring kitchen mixer with a dual-function spray head and swivel spout.",
    finishes: nickelChrome,
  },
  {
    slug: "semblance",
    name: "Semblance",
    category: "Kitchen",
    image: `${wp}/2016/08/r3f32rf.jpg`,
    price: 39,
    wasPrice: 79,
    summary: "Modern pull-down kitchen mixer pairing a black flexible hose with a sculpted chrome spout.",
    finishes: nickelChrome,
  },
  {
    slug: "metropoliton-mk1",
    name: "Metropoliton Mk1",
    category: "Kitchen",
    image: `${wp}/2016/08/Metropoliton_Mk1.jpg`,
    price: 39,
    wasPrice: 69,
    summary: "Elegant high-arc sink mixer with a curved swivel spout and a side single lever.",
    finishes: "Chrome",
  },
  {
    slug: "metropoliton-mk2",
    name: "Metropoliton Mk2",
    category: "Kitchen",
    image: `${wp}/2016/08/Metropoliton_Mk2.jpg`,
    price: 39,
    wasPrice: 69,
    summary: "The Metropoliton's second generation: a sleek high-arc sink mixer with a smooth swivel spout.",
    finishes: "Chrome",
  },
  {
    slug: "stealth",
    name: "Stealth",
    category: "Kitchen",
    image: `${wp}/2020/03/Stealth.png`,
    price: 39,
    wasPrice: 59,
    summary: "Bold, minimalist kitchen mixer with a squared profile for contemporary kitchens.",
    finishes: "Chrome",
  },
  {
    slug: "sentry",
    name: "Sentry",
    category: "Kitchen",
    image: `${wp}/2020/03/Sentry.jpg`,
    price: 79,
    summary: "Commercial-style spring kitchen mixer with a pull-down spray and a pot-filler swing arm.",
    finishes: nickelChrome,
  },
  {
    slug: "volute",
    name: "Volute",
    category: "Kitchen",
    image: `${wp}/2016/08/Volute.jpg`,
    price: 79,
    summary: "Square-base spring kitchen mixer with a flexible hose and a fixed spout arm.",
    finishes: nickelChrome,
  },
  {
    slug: "cosmos",
    name: "Cosmos",
    category: "Basin",
    image: `${wp}/2016/08/Cosmos-1.jpg`,
    price: 29,
    wasPrice: 59,
    summary: "Compact single-lever basin mixer: an everyday bathroom essential with a soft, rounded profile.",
    finishes: nickelChrome,
  },
  {
    slug: "skillion-s",
    name: "Skillion S",
    category: "Basin",
    image: `${wp}/2020/03/Skillion-S.jpg`,
    price: 39,
    wasPrice: 49,
    summary: "Angular, architectural basin mixer with a flat-top lever and waterfall-style spout.",
    finishes: nickelChrome,
  },
  {
    slug: "skillion-t",
    name: "Skillion T",
    category: "Basin",
    image: `${wp}/2016/07/Skillion-T.jpg`,
    price: 39,
    wasPrice: 69,
    summary: "The tall Skillion: designed for vessel and above-counter basins.",
    finishes: nickelChrome,
  },
  {
    slug: "effrontery",
    name: "Effrontery",
    category: "Shower & Bath",
    image: `${wp}/2020/03/Effrontery.jpg`,
    price: 69,
    summary: "Wall-mounted single-lever shower mixer on a slim rounded-square plate.",
    finishes: nickelChrome,
  },
  {
    slug: "emanate",
    name: "Emanate",
    category: "Shower & Bath",
    image: `${wp}/2020/03/Emanate.jpg`,
    price: 89,
    summary: "Wall-mounted shower mixer with an integrated diverter to switch between outlets.",
    finishes: nickelChrome,
  },
];

export const products: ProductInput[] = productList.map((p) => ({ ...p, w: dims[p.slug]?.[0] ?? 400, h: dims[p.slug]?.[1] ?? 500 }));
export type Product = (typeof products)[number];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const brandImages = {
  handles: `${wp}/2020/03/Handles.jpg`,
  handlesSize: [380, 503] as const,
  diagram: "/faucet-diagram.png",
};

export const benefits = [
  {
    title: "Protect your children",
    text: "Prevent children from turning on the hot or cold water in showers, bathtubs, basins, kitchen sinks and laundries.",
  },
  {
    title: "Reduce drowning risk",
    text: "Minimise the risk of potential drownings in unsupervised or easily accessible bathrooms.",
  },
  {
    title: "Prevent scalding",
    text: "Minimise the risk of aged and dementia sufferers scalding themselves.",
  },
];

export function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}
