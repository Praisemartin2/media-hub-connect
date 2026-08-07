/**
 * PayPal donation configuration.
 *
 * Donations run entirely through PayPal's own hosted flow, so the site
 * never handles card data and no backend is required — which is what
 * lets this work on static hosting.
 *
 * Fill in ONE of these (see docs/paypal-donations.md):
 *  - hostedButtonId: the ID of a Donate button created in PayPal. Opens
 *    PayPal's donation lightbox over the page; supports monthly giving
 *    when the button is configured for it. Recommended.
 *  - businessId: your PayPal account email or merchant ID. Used to build
 *    a donate link with the chosen amount pre-filled.
 *
 * While both are empty the donate card stays in preview mode and points
 * donors at the office email instead of a broken payment button.
 */
export const paypal = {
  hostedButtonId: "",
  businessId: "",
  currency: "USD",
  itemName: "Donation to Creating Opportunities for Youth Inc.",
};

export const donationsLive = () =>
  Boolean(paypal.hostedButtonId || paypal.businessId);

/** PayPal donate link with the donor's chosen amount pre-filled. */
export function donateUrl(amount: number): string {
  const url = new URL("https://www.paypal.com/donate/");
  if (paypal.hostedButtonId) {
    url.searchParams.set("hosted_button_id", paypal.hostedButtonId);
  } else {
    url.searchParams.set("business", paypal.businessId);
    url.searchParams.set("item_name", paypal.itemName);
    url.searchParams.set("no_recurring", "0");
  }
  url.searchParams.set("currency_code", paypal.currency);
  if (amount > 0) url.searchParams.set("amount", amount.toFixed(2));
  return url.toString();
}

let sdkPromise: Promise<void> | null = null;

/** Load PayPal's Donate SDK once, on demand. */
export function loadDonateSdk(): Promise<void> {
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-paypal-donate]");
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("PayPal SDK failed")));
      return;
    }
    const s = document.createElement("script");
    s.src = "https://www.paypalobjects.com/donate/sdk/donate-sdk.js";
    s.charset = "UTF-8";
    s.dataset.paypalDonate = "true";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("PayPal SDK failed to load"));
    document.head.appendChild(s);
  });
  return sdkPromise;
}
