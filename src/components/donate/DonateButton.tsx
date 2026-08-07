import { useEffect, useId, useRef, useState } from "react";
import { Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { site } from "@/data/site";
import { donateUrl, donationsLive, loadDonateSdk, paypal } from "@/lib/paypal";

/**
 * Sends the donor into PayPal's hosted checkout.
 *
 * With a hosted button ID we render PayPal's own Donate button, which
 * opens their lightbox over the page — donors can pay by card without a
 * PayPal account, and never leave the site. With only a business ID we
 * fall back to a branded button that opens PayPal's donate page with the
 * chosen amount already filled in. With neither configured the card
 * stays honest about not taking payments yet.
 */
export function DonateButton({
  amount,
  monthly,
}: {
  amount: number;
  monthly: boolean;
}) {
  const containerId = `paypal-donate-${useId().replace(/[:]/g, "")}`;
  const rendered = useRef(false);
  const [sdkFailed, setSdkFailed] = useState(false);

  const useSdk = Boolean(paypal.hostedButtonId);

  useEffect(() => {
    if (!useSdk || rendered.current) return;
    let cancelled = false;

    loadDonateSdk()
      .then(() => {
        if (cancelled || rendered.current) return;
        const PayPal = (window as unknown as { PayPal?: any }).PayPal;
        const host = document.getElementById(containerId);
        if (!PayPal?.Donation || !host) {
          setSdkFailed(true);
          return;
        }
        host.innerHTML = "";
        PayPal.Donation.Button({
          env: "production",
          hosted_button_id: paypal.hostedButtonId,
          image: {
            src: "https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif",
            alt: "Donate with PayPal",
            title: "Donate securely with PayPal",
          },
          onComplete: () => {
            toast.success("Thank you for your gift!", {
              description: "Your support creates opportunities for youth.",
            });
          },
        }).render(`#${containerId}`);
        rendered.current = true;
      })
      .catch(() => setSdkFailed(true));

    return () => {
      cancelled = true;
    };
  }, [containerId, useSdk]);

  // Donations not configured yet — say so plainly rather than pretend.
  if (!donationsLive()) {
    return (
      <>
        <Button
          size="lg"
          onClick={() =>
            toast.info("Online giving isn't live yet", {
              description: `To donate today, email ${site.email} or call ${site.phone}.`,
            })
          }
          className="mt-6 w-full rounded-none bg-secondary text-base font-bold text-secondary-foreground hover:bg-brand-yellow-light"
        >
          <Heart className="mr-1 h-5 w-5" />
          Donate ${amount || 0}
          {monthly ? "/mo" : ""}
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Online giving isn't live yet. To give today, email {site.email}.
        </p>
      </>
    );
  }

  // PayPal's own button, rendered in place (lightbox checkout).
  if (useSdk && !sdkFailed) {
    return (
      <>
        <div id={containerId} className="mt-6 flex justify-center [&_img]:mx-auto" />
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Secure checkout by PayPal — pay by card or PayPal balance, no
          account required. Choose your amount{monthly ? " and monthly giving" : ""}{" "}
          on the next step.
        </p>
      </>
    );
  }

  // Amount-prefilled donate link (also the fallback if the SDK is blocked).
  return (
    <>
      <Button
        asChild
        size="lg"
        className="mt-6 w-full rounded-none bg-secondary text-base font-bold text-secondary-foreground hover:bg-brand-yellow-light"
      >
        <a href={donateUrl(amount)} target="_blank" rel="noreferrer">
          <Heart className="mr-1 h-5 w-5" />
          Donate ${amount || 0}
          {monthly ? "/mo" : ""}
          <ExternalLink className="ml-1 h-4 w-4" />
        </a>
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Secure checkout by PayPal — pay by card or PayPal balance, no account
        required.{monthly && " Tick “Make this a monthly donation” on PayPal's page."}
      </p>
    </>
  );
}
