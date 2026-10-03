import type { NextConfig } from "next";
import path from "node:path";
import { LEGACY_REDIRECTS } from "./src/lib/redirects";
import { SITE_IS_DRAFT } from "./src/lib/site";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  // Hides the `X-Powered-By: Next.js` response header -- no functional
  // benefit to advertising the framework, trivial info-leak otherwise.
  poweredByHeader: false,
  experimental: {
    // Rewrites deep imports for these large, many-export libraries so only
    // the specific icons/helpers actually used end up in each route's
    // bundle, instead of the whole package being pulled into the shared
    // chunk graph. Pure build-time optimization -- no behavior change.
    optimizePackageImports: ["framer-motion", "lucide-react"],
    // Serves src/app/global-not-found.tsx for URLs that match no page. The
    // root layout is [locale]/layout.tsx, whose own not-found boundary Next
    // cannot server-render, so without this every 404 was the framework's
    // bare English page with no <html lang>.
    globalNotFound: true,
  },
  images: {
    // Next.js already serves AVIF/WebP automatically based on the browser's
    // Accept header when possible; listing AVIF first means it's tried
    // before WebP for browsers that support both.
    formats: ["image/avif", "image/webp"],
    // Optimized image responses are already cache-busted by their query
    // string (width/quality), so it's safe to let them sit at the edge/in
    // the browser for a long time -- 30 days instead of the 60s default.
    minimumCacheTTL: 2592000,
  },
  async redirects() {
    return LEGACY_REDIRECTS;
  },
  async headers() {
    return [
      {
        // HTTPS only, for two years. ARUBA DRAFT: `includeSubDomains` and
        // `preload` are deliberately left off until the production domain is
        // chosen -- both are hard-to-reverse commitments for a whole domain.
        source: "/:path*",
        headers: [{ key: "Strict-Transport-Security", value: "max-age=63072000" }],
      },
      // ARUBA DRAFT: keeps every response -- pages, images, robots.txt, the
      // manifest -- out of search indexes, on top of the <meta name="robots">
      // tag. Drops away automatically when SITE_IS_DRAFT is switched off.
      ...(SITE_IS_DRAFT
        ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }]
        : []),
      {
        // Static brand assets (favicons, manifest icons, the OG share image)
        // that only ever change via a new deploy -- safe to cache for a
        // full year. Photographic content (smile gallery, team, treatment
        // images) is intentionally excluded here since it goes through the
        // Next.js image optimizer route, which already sets its own
        // appropriate cache headers based on `images.minimumCacheTTL` above.
        source: "/:file(favicon.ico|favicon-16x16.png|favicon-32x32.png|apple-touch-icon.png|android-chrome-192x192.png|android-chrome-512x512.png|og-image.jpg)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
