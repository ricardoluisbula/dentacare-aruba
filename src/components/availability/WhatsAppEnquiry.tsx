"use client";

import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/lib/site";
import { trackEvent, type AnalyticsPlacement } from "@/lib/analytics";
import { useTranslation } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/** wa.me link with an editable, non-committal pre-filled message. */
export function useWhatsAppHref(): string {
  const { t } = useTranslation();
  return `${siteConfig.whatsappUrl}?text=${encodeURIComponent(t.whatsapp.prefill)}`;
}

const VARIANTS = {
  primary:
    "bg-accent text-accent-contrast shadow-[0_8px_30px_-8px_var(--accent)] hover:shadow-[0_12px_36px_-6px_var(--accent)]",
  onDark:
    "border border-gold-300 bg-ivory-50 text-espresso-900 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] hover:bg-gold-100",
} as const;

/**
 * The site's one appointment action: a WhatsApp MESSAGE link (never a tel:
 * link), always accompanied by the note that a message is an enquiry and
 * does not confirm an appointment.
 */
export function WhatsAppEnquiry({
  placement,
  variant = "primary",
  showNote = true,
  className,
  noteClassName,
}: {
  placement: AnalyticsPlacement;
  variant?: keyof typeof VARIANTS;
  showNote?: boolean;
  className?: string;
  noteClassName?: string;
}) {
  const { t } = useTranslation();
  const href = useWhatsAppHref();

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("click_whatsapp", { placement })}
        className={cn(
          "inline-flex items-center justify-center gap-2.5 self-center rounded-full px-7 py-4 text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 lg:self-auto",
          VARIANTS[variant]
        )}
      >
        <WhatsAppIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
        {t.whatsapp.cta}
        <span className="sr-only"> {t.a11y.opensInNewTab}</span>
      </a>
      {showNote && <p className={cn("max-w-md text-xs leading-relaxed text-fg-muted sm:text-sm", noteClassName)}>{t.whatsapp.enquiryNote}</p>}
    </div>
  );
}
