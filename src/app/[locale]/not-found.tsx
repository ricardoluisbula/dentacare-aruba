import { NotFoundContent } from "@/components/layout/NotFoundContent";

/**
 * Shown when a page calls `notFound()` during a client-side navigation.
 *
 * A URL that does not resolve on a full page load is answered by
 * `app/global-not-found.tsx` instead: this layout is the app's root layout,
 * and Next.js cannot server-render a root layout's own not-found boundary,
 * so that request used to fall through to the framework's bare, English-only
 * 404 without `<html lang>`. Both render the same localized content.
 *
 * No `metadata` export: the 404 status itself keeps the page out of the index.
 */
export default function NotFound() {
  return <NotFoundContent />;
}
