# Proteger Faucets — Website Redesign

A seven-page, responsive Next.js App Router project built with TypeScript and Tailwind CSS.

## Pages

- `/` — Home
- `/products` — Products
- `/how-it-works` — How It Works / Technology
- `/applications` — Applications
- `/about` — About
- `/faqs` — FAQs
- `/contact` — Contact

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

## SEO

The project includes page metadata, an XML sitemap at `/sitemap.xml`, and crawler rules at `/robots.txt`.

## Contact form setup

The form is implemented using a Next.js route handler and Resend. It deliberately reports a clear configuration message until email delivery is configured.

1. Create a Resend account and verify a sending domain.
2. Copy `.env.example` to `.env.local`.
3. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`.
4. Restart the development server.

For Vercel, add the same variables in Project → Settings → Environment Variables, then redeploy.

## Deploy to Vercel

Import this repository into Vercel. Framework preset: Next.js. Build command: `next build` (default). Add the contact environment variables if you want the contact form to send email.

## Accuracy and content notes

Content is based on the public Proteger Faucets website reviewed for this concept redesign. Product names and compatibility categories reflect information published by Proteger. The source website also states a two-year warranty and describes licensing and consulting-engineer certification; confirm current terms and supporting documentation before publishing commercial claims.

This redesign intentionally does not add unsupported product dimensions, materials, installation instructions, named certification bodies, customer testimonials, performance statistics or contact details. Product cards now reference image assets hosted on the original Proteger website. The homepage hero uses editorial faucet photography as contextual imagery, not a verified photograph of a named Proteger model. Confirm that the original image URLs remain available and replace the hero with approved brand photography before launch.

## Image assets

The design uses remote Unsplash photography via image URLs in `src/lib/site.ts`. Replace with licensed, approved brand photography for production.
