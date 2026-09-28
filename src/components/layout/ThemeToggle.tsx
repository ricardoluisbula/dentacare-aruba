"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n/LanguageProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? t.header.switchToLight : t.header.switchToDark}
      className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-border text-fg transition-colors hover:border-accent/50 hover:text-accent-deep dark:hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
        ) : (
          <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />
        )
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
