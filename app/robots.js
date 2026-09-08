import { siteUrl } from "./seo.mjs";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
