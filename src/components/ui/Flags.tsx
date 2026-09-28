import type { SVGProps } from "react";

/**
 * Hand-authored flag SVGs (not emoji) for the "Languages We Speak" section.
 * All share a 3:2 (60x40) viewBox so they drop into a uniform card slot.
 * Purely decorative next to a text language label, so callers should keep
 * them aria-hidden and let the label carry the accessible name.
 */

export function FlagNL(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="60" height="40" fill="#21468B" />
      <rect width="60" height="13.33" fill="#AE1C28" />
      <rect width="60" height="13.33" y="13.33" fill="#FFFFFF" />
    </svg>
  );
}

export function FlagGB(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" {...props}>
      <clipPath id="gb-clip">
        <rect width="60" height="40" />
      </clipPath>
      <g clipPath="url(#gb-clip)">
        <rect width="60" height="40" fill="#00247D" />
        <line x1="0" y1="0" x2="60" y2="40" stroke="#FFFFFF" strokeWidth="9" />
        <line x1="60" y1="0" x2="0" y2="40" stroke="#FFFFFF" strokeWidth="9" />
        <line x1="0" y1="0" x2="60" y2="40" stroke="#CF142B" strokeWidth="3" />
        <line x1="60" y1="0" x2="0" y2="40" stroke="#CF142B" strokeWidth="3" />
        <rect x="0" y="15" width="60" height="10" fill="#FFFFFF" />
        <rect x="22.5" y="0" width="15" height="40" fill="#FFFFFF" />
        <rect x="0" y="17" width="60" height="6" fill="#CF142B" />
        <rect x="25" y="0" width="10" height="40" fill="#CF142B" />
      </g>
    </svg>
  );
}

export function FlagES(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="60" height="40" fill="#AA151B" />
      <rect width="60" height="20" y="10" fill="#F1BF00" />
    </svg>
  );
}

export function FlagIT(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="20" height="40" fill="#009246" />
      <rect width="20" height="40" x="20" fill="#FFFFFF" />
      <rect width="20" height="40" x="40" fill="#CE2B37" />
    </svg>
  );
}
