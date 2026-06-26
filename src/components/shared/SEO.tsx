import { useEffect } from "react";

type SEOProps = {
  title: string;
  description?: string;
};

/** Tiny document-head manager — sets title + meta description per page. */
export function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
}
