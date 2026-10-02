import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { cookiePolicy, privacyPolicy, type Policy } from "@/data/policies";
import { SESSION_COOKIE, SESSION_HOURS, LOCKOUT_SECONDS } from "@/lib/admin/auth";
import { siteConfig } from "@/lib/site";

/**
 * The policies must describe the site's actual behaviour and must not invent
 * facts: no registration details, retention periods, legal claims or
 * compliance guarantees (see the REVIEW notes in src/data/policies.ts).
 */
/** The visible text of a policy (intro, headings, list items, paragraphs). */
const text = (p: Policy) =>
  [...p.intro, ...p.sections.flatMap((s) => [s.heading, ...(s.lead ?? []), ...(s.items ?? []), ...(s.paragraphs ?? [])])].join(" | ");
const both = text(privacyPolicy) + text(cookiePolicy);

describe("privacy and cookie policies", () => {
  it("make no compliance claims, guarantees or invented legal facts", () => {
    for (const pattern of [/complian/i, /guarantee/i, /\bGDPR\b/, /\bAVG\b/, /legal basis/i, /lawful/i, /registration number/i, /chamber of commerce/i, /\bKvK\b/i, /certified/i, /fully secure/i]) {
      expect(both, String(pattern)).not.toMatch(pattern);
    }
  });

  it("state no retention periods other than the site's own coded limits", () => {
    const durations = both.match(/\b\d+\s*(minutes?|hours?|days?|weeks?|months?|years?)\b/gi) ?? [];
    expect(durations.sort()).toEqual([`${LOCKOUT_SECONDS / 60} minutes`, `${SESSION_HOURS} hours`].sort());
  });

  it("describe the staff cookie as the code sets it", () => {
    expect(text(cookiePolicy)).toContain(SESSION_COOKIE);
    expect(text(cookiePolicy)).toContain(`${SESSION_HOURS} hours`);
  });

  it("say analytics is not used -- which must stay true", () => {
    expect(text(privacyPolicy)).toMatch(/does not use analytics, advertising or tracking tools/);
    expect(text(cookiePolicy)).toMatch(/does not use analytics, advertising or tracking cookies/);
    // Analytics only loads when NEXT_PUBLIC_GA_MEASUREMENT_ID is set; the
    // example environment keeps it empty.
    const example = fs.readFileSync(path.resolve(__dirname, "../../.env.example"), "utf8");
    expect(example).toMatch(/^NEXT_PUBLIC_GA_MEASUREMENT_ID=\s*$/m);
  });

  it("use the email only as the privacy contact", () => {
    expect(siteConfig.privacyEmail).toBe("Dentacare@hotmail.com");
    expect(both).toContain("{email}");
    expect(both).toMatch(/privacy questions only/);
    expect(both).not.toMatch(/(book|appointment)[^.]*\{email\}/i);
  });

  it("contain no draft or placeholder wording", () => {
    for (const pattern of [/draft/i, /to be confirmed/i, /placeholder/i, /\[[^\]]*\]/, /TBD|TODO/]) {
      expect(both, String(pattern)).not.toMatch(pattern);
    }
  });
});
