import { LocaleLink as Link } from "@/components/ui/LocaleLink";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "border border-accent bg-accent text-accent-contrast px-7 py-3.5 shadow-[0_8px_30px_-8px_var(--accent)] hover:shadow-[0_12px_36px_-6px_var(--accent)] hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-surface-border text-fg px-7 py-3.5 hover:border-accent/60 hover:bg-surface-strong hover:text-accent hover:-translate-y-0.5 active:translate-y-0 glass",
  ghost: "text-fg px-4 py-3 hover:-translate-y-0.5 hover:text-accent active:translate-y-0",
} as const;

type Variant = keyof typeof variants;

type ButtonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
  | ({ href?: undefined } & Omit<ComponentProps<"button">, "className">)
);

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props as { href: string };
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
