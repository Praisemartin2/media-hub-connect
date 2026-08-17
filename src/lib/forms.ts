/**
 * Form delivery for a static site: submissions are relayed to COFY's
 * inbox (cofyincorporated@gmail.com) by FormSubmit.co, so no server is
 * needed. The AJAX endpoint keeps visitors on the page.
 *
 * One-time setup: FormSubmit emails an activation link to the inbox on
 * the first-ever submission; after COFY clicks it once, every
 * submission arrives as a formatted email.
 */
import { site } from "@/data/site";

const ENDPOINT = `https://formsubmit.co/ajax/${site.email}`;

export async function submitForm(
  subject: string,
  data: Record<string, string>,
): Promise<boolean> {
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
    if (!res.ok) return false;
    const json = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
    return json ? json.success === "true" || json.success === true : true;
  } catch {
    return false;
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
