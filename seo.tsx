import { useEffect } from "react";

type SeoProps = { title: string; description: string; image?: string };

export function Seo({ title, description, image }: SeoProps) {
  useEffect(() => {
    document.title = `${title} — The Curated Renter`;
    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(property ? "property" : "name", name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };
    setMeta("description", description);
    setMeta("og:title", `${title} — The Curated Renter`, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    if (image) setMeta("og:image", image, true);
  }, [title, description, image]);
  return null;
}