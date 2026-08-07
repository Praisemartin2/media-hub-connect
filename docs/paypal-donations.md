# Accepting donations through PayPal

The donate card on **Support Us** (`/get-involved#donate`) is wired to PayPal.
Everything runs through PayPal's own hosted checkout, so:

- the website never touches card numbers (no PCI burden on COFY),
- no server or database is needed — it works on the current static hosting,
- donors can pay by **card without having a PayPal account**.

## What's left to do (one value)

Open `src/lib/paypal.ts` and fill in **one** of the two fields. Until one is
set, the donate button honestly says giving isn't live yet and points donors
to the office email — it never shows a broken payment button.

### Option A — Hosted Donate button (recommended)

Supports **monthly giving** and keeps donors on the site: clicking opens
PayPal's donation window over the page.

1. Sign in at [paypal.com](https://www.paypal.com) with the COFY account.
2. Go to **Pay & Get Paid → PayPal buttons** (or visit
   <https://www.paypal.com/buttons/>) and create a **Donate** button.
3. Under the button's options, tick **"Let donors choose to make this a
   monthly donation"** if you want recurring gifts, and optionally set
   suggested amounts ($25 / $50 / $100 / $250 to match the website).
4. Save, then copy the **hosted button ID** — the `hosted_button_id` value in
   the generated code (a string like `ABCD1234EFGH5`).
5. Put it in `src/lib/paypal.ts`:
   ```ts
   hostedButtonId: "ABCD1234EFGH5",
   ```

### Option B — Business ID / account email

Simpler, and the amount chosen on the website is pre-filled on PayPal's page,
but recurring giving depends on PayPal's own checkbox.

```ts
businessId: "cofyincorporated@gmail.com",   // or the merchant ID
```

Using the **merchant ID** instead of the email is slightly better — it keeps
the email address out of the page source. Find it in PayPal under
**Account Settings → Business information → PayPal merchant ID**.

## Two things worth doing at the PayPal end

1. **Confirm the nonprofit rate.** PayPal charges registered 501(c)(3)
   organizations a reduced rate on donations rather than the standard
   commercial rate. Apply through PayPal's nonprofit verification with COFY's
   IRS determination letter — on a $100 gift the difference is real money,
   and it applies to every donation afterwards.
2. **Turn on donation receipts.** In the button/account settings, enable the
   automatic email receipt so donors get the record they need for taxes
   without anyone at COFY sending it by hand.

## Testing before announcing it

1. Set the value, push, wait for the deploy.
2. Open <https://www.cofyouth.org/get-involved#donate> and give **$1** with a
   real card.
3. Check it lands in the PayPal account, then refund it from PayPal.
4. If you enabled monthly, repeat with the monthly option and cancel the
   subscription afterwards.

Only after a real transaction succeeds should the donate link be shared
publicly.

## How it behaves in code

`src/lib/paypal.ts` holds the config and builds the donate URL.
`src/components/donate/DonateButton.tsx` picks the right path:

| Config | What donors see |
|---|---|
| `hostedButtonId` set | PayPal's own Donate button; checkout opens in a lightbox over the page |
| `businessId` set | Branded COFY button opening PayPal's donate page with the amount pre-filled |
| neither set | "Online giving isn't live yet" + the office email |

If PayPal's script is ever blocked (some ad blockers do this), the component
automatically falls back to the plain donate link, so the button always works.
