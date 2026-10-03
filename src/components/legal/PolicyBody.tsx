import type { ReactNode } from "react";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { siteConfig } from "@/lib/site";
import type { Policy } from "@/data/policies";

/**
 * Renders a policy from src/data/policies.ts. "{email}" in the text becomes a
 * link to the privacy contact (siteConfig.privacyEmail) -- the only place on
 * the site where that address appears.
 */
export function PolicyBody({ title, policy }: { title: string; policy: Policy }) {
  return (
    <LegalPageLayout title={title}>
      {policy.intro.map((text) => (
        <p key={text} className="text-base text-fg">
          {withEmail(text)}
        </p>
      ))}
      {policy.sections.map((section) => (
        <section key={section.heading} className="flex flex-col gap-3">
          <h2>{section.heading}</h2>
          {section.lead?.map((text) => (
            <p key={text}>{withEmail(text)}</p>
          ))}
          {section.items && (
            <ul>
              {section.items.map((item) => (
                <li key={item}>{withEmail(item)}</li>
              ))}
            </ul>
          )}
          {section.paragraphs?.map((text) => (
            <p key={text}>{withEmail(text)}</p>
          ))}
        </section>
      ))}
    </LegalPageLayout>
  );
}

function withEmail(text: string): ReactNode {
  const parts = text.split("{email}");
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && (
        <a
          href={`mailto:${siteConfig.privacyEmail}`}
          className="font-medium text-accent-deep underline underline-offset-4 dark:text-accent"
        >
          {siteConfig.privacyEmail}
        </a>
      )}
    </span>
  ));
}
