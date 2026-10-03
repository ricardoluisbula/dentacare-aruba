import { treatments } from "@/data/treatments";
import { beforeAfterCases } from "@/data/beforeAfterCases";
import type { SharedContent } from "../types";

/**
 * English shared text, derived from the source data (src/data/) -- the
 * reference every translation in src/content/<locale>/shared.ts mirrors.
 */
const en: SharedContent = {
  treatments: Object.fromEntries(
    treatments.map(({ slug, name, summary, description, whoFor, expandedDescription }) => [
      slug,
      expandedDescription === undefined ? { name, summary, description, whoFor } : { name, summary, description, whoFor, expandedDescription },
    ])
  ),
  cases: Object.fromEntries(
    beforeAfterCases.map(({ id, title, description, beforeAlt, afterAlt }) => [id, { title, description, beforeAlt, afterAlt }])
  ),
};

export default en;
