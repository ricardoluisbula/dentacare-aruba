"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Reports one `view_treatment` per visit to a treatment page.
 *
 * Renders nothing. The ref guard keeps React's development double-invoke of
 * effects from counting a view twice; a genuine new visit (including the same
 * page in another language, which is a new route) mounts a new instance.
 * Consent and parameter rules are enforced by `trackEvent` itself.
 */
export function TrackTreatmentView({ slug }: { slug: string }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackEvent("view_treatment", { treatment_slug: slug, placement: "treatment_page" });
  }, [slug]);
  return null;
}
