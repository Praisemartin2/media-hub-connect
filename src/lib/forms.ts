/**
 * Form delivery for a static site: submissions are relayed to COFY's
 * inbox (cofyincorporated@gmail.com) by FormSubmit.co, so no server is
 * needed. The AJAX endpoint keeps visitors on the page.
 *
 * One-time setup: the relay must be activated once for this email —
 * open /activate-forms.html and follow the two steps there.
 *
 * If the relay fails for ANY reason (not yet activated, ad blocker,
 * network, service down), the caller falls back to opening the
 * visitor's own email app with the message pre-filled, so nothing a
 * visitor writes can be lost.
 */
import { site } from "@/data/site";

const ENDPOINT = `https://formsubmit.co/ajax/${site.email}`;

export type FormResult = "sent" | "failed";

export async function submitForm(
  subject: string,
  data: Record<string, string>,
): Promise<FormResult> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...data,
        _subject: `[cofyouth.org] ${subject}`,
        _template: "table",
        _captcha: "false",
      }),
    });
    const json = (await res.json().catch(() => null)) as
      | { success?: string | boolean; message?: string }
      | null;
    const ok =
      res.ok && (json ? json.success === "true" || json.success === true : true);
    return ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}

/** Pull named fields out of a form element into a plain object. */
export function formValues(form: HTMLFormElement): Record<string, string> {
  const out: Record<string, string> = {};
  new FormData(form).forEach((v, k) => {
    if (typeof v === "string" && !k.startsWith("_")) out[k] = v;
  });
  return out;
}

/**
 * Guaranteed-delivery fallback: open the visitor's email app with the
 * whole message pre-filled and addressed to the COFY inbox.
 */
export function openMailFallback(subject: string, data: Record<string, string>): void {
  const body = Object.entries(data)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  const url = `mailto:${site.email}?subject=${encodeURIComponent(
    `[cofyouth.org] ${subject}`,
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
}
