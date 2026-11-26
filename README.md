# Proteger Faucets — standalone online store

A Next.js ecommerce storefront. It does not use WordPress or WooCommerce.

## Included
- Eight products from Proteger's listed collection.
- Product detail pages, Add to Cart, persistent browser cart and quantity controls.
- Checkout with simulated PayPal and credit/debit card choices.
- Server-side demo order validation. No payment is processed.

## Run
```bash
npm install
npm run dev
```

## Test checkout
Add an item, open Cart, proceed to Checkout, enter sample delivery details and choose card or PayPal. A DEMO order reference is returned. No Stripe or PayPal API is called, no money is charged, and no card details are collected. Do not enter real payment details.

## Before going live
Confirm all prices, stock, product specifications, compatibility, shipping, tax and return policies. Implement Stripe and PayPal server-side sessions and signed webhook verification; add persistent order/customer/inventory storage and admin management. Replace low-resolution product thumbnails with approved high-resolution brand photography.

All current prices are demonstration placeholders, not confirmed retail prices. Test checkout is simulated only.