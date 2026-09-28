import type { MetadataRoute } from "next";
import { SITE_IS_DRAFT, siteConfig } from "@/lib/site";

/**
 * ARUBA DRAFT: while SITE_IS_DRAFT is on, every crawler is asked to stay out
 * of the whole site and no sitemap is advertised. After launch this allows
 * everything and points at the sitemap on the site's own URL.
 */
export default function robots(): MetadataRoute.Robots {
  if (SITE_IS_DRAFT) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
