"use client";

import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import { ANALYTICS_CONFIGURED, openCookieSettings, trackEvent } from "@/lib/analytics";
import { CalendarDays, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { navLabel } from "@/lib/navKeys";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { useWhatsAppHref } from "@/components/availability/WhatsAppEnquiry";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

const LINK_CLASS =
  "-mx-1 rounded-sm px-1 transition-colors duration-200 hover:text-accent-deep dark:hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function Footer() {
  const { t } = useTranslation();
  const whatsappHref = useWhatsAppHref();
  const iconClass = "mt-0.5 h-4 w-4 shrink-0 text-accent";

  // Confirmed details only: address, WhatsApp (messages) and Instagram. Phone
  // and email rows are not shown until the practice supplies them. There are
  // no fixed opening hours: the column links to the dates in Aruba instead.

  return (
    <footer className="relative mt-32 border-t border-surface-border bg-bg-elevated">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center self-start">
            <Logo className="h-10 w-auto" />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-fg-muted">{t.footer.description}</p>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.header.instagramLabel}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-surface-border text-fg-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent-deep dark:hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <InstagramIcon className="h-[18px] w-[18px]" />
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-fg">{t.footer.exploreHeading}</h3>
          <ul className="flex flex-col gap-3 text-sm text-fg-muted">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={LINK_CLASS}>
                  {navLabel(t, item.href)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-fg">{t.footer.visitHeading}</h3>
          <ul className="flex flex-col gap-3.5 text-sm text-fg-muted">
            <li className="flex items-start gap-3">
              <MapPin className={iconClass} strokeWidth={1.75} aria-hidden="true" />
              <span>
                <span className="block text-fg">{t.footer.addressLabel}</span>
                <a
                  href={siteConfig.address.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("click_maps", { placement: "footer" })}
                  className={LINK_CLASS}
                >
                  <address className="inline not-italic">{siteConfig.address.full}</address>
                  <span className="sr-only"> {t.a11y.opensInNewTab}</span>
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <WhatsAppIcon className={iconClass} aria-hidden="true" />
              <span>
                <span className="block text-fg">{t.footer.whatsappLabel}</span>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("click_whatsapp", { placement: "footer" })}
                  className={LINK_CLASS}
                >
                  {siteConfig.whatsappDisplay}
                  <span className="sr-only"> {t.a11y.opensInNewTab}</span>
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CalendarDays className={iconClass} strokeWidth={1.75} aria-hidden="true" />
              <span>
                <span className="block text-fg">{t.footer.datesLabel}</span>
                <Link href="/contact#aruba-dates" className={LINK_CLASS}>
                  {t.footer.datesLink}
                </Link>
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-surface-border py-6">
        <Container className="flex flex-col items-center gap-4">
          <nav aria-label={t.footer.legalNavLabel} className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-fg-muted">
            <Link href="/privacy" className={LINK_CLASS}>
              {t.footer.privacyPolicyLink}
            </Link>
            <Link href="/cookies" className={LINK_CLASS}>
              {t.footer.cookiePolicyLink}
            </Link>
            {/* Reopens the consent banner so the analytics choice can be changed
                or withdrawn at any time. Only present when the build has GA
                configured -- without it there is nothing to consent to. */}
            {ANALYTICS_CONFIGURED && (
              <button type="button" onClick={openCookieSettings} className={LINK_CLASS}>
                {t.common.cookieSettings}
              </button>
            )}
          </nav>

          <p className="text-center text-xs text-fg-muted">
            © {new Date().getFullYear()} {siteConfig.name}. {t.footer.rightsReserved}
          </p>
        </Container>
      </div>
    </footer>
  );
}
