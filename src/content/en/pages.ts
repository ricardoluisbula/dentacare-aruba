import { treatmentPages } from "@/data/treatmentPages";
import { preventiveCare } from "@/data/treatmentPages/preventiveCare";
import { cookiePolicy, privacyPolicy } from "@/data/policies";
import type { PageContent } from "../types";

/**
 * English long-form text, derived from the source data (src/data/) -- the
 * reference every translation in src/content/<locale>/pages.ts mirrors.
 */
const en: PageContent = {
  treatmentPages,
  preventiveCare,
  policies: { privacy: privacyPolicy, cookies: cookiePolicy },
};

export default en;
