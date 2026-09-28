import type { Metadata, Viewport } from "next";
import "../globals.css";
import { fontVariables, siteViewport } from "@/lib/fonts";

/**
 * Root layout for the private editor. Separate from the public site's
 * `[locale]` layout: no navigation, footer, analytics or language routing,
 * and never indexed (robots.txt and the X-Robots-Tag header also cover it).
 */
export const metadata: Metadata = {
  title: "Aruba dates · Dentacare Aruba",
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = siteViewport;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-dvh bg-ivory-100 font-sans text-ink-900 antialiased">{children}</body>
    </html>
  );
}
