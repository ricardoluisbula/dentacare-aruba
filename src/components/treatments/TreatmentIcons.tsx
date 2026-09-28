import type { SVGProps } from "react";
import { Crown, Layers, Paintbrush, Smile, Sparkles } from "lucide-react";

/**
 * Hand-drawn dental icons for the treatments Lucide has no accurate
 * equivalent for (aligners, implants, root canal). Same viewBox, stroke API
 * (currentColor, round caps/joins) and default strokeWidth as every Lucide
 * icon they sit alongside on the treatments hub, so they read as part of the
 * same icon system rather than a mismatched add-on.
 */

/** Two overlapping curved aligner trays, the upper one segmented to read as a tray rather than a bare smile-curve. */
export function AlignerIcon({ strokeWidth = 2, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3.5 8.5c2.8 3 5.6 4.3 8.5 4.3s5.7-1.3 8.5-4.3" />
      <path d="M8 9.6v1.4M12 10.4v1.6M16 9.6v1.4" />
      <path d="M5.5 13c2.2 2.6 4.4 3.7 6.5 3.7s4.3-1.1 6.5-3.7" />
    </svg>
  );
}

/** A crown seated on a tapered, threaded implant post. */
export function ImplantIcon({ strokeWidth = 2, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 7c0-2.2 1.8-4 4-4s4 1.8 4 4" />
      <path d="M7.5 7h9" />
      <path d="M12 7v13" />
      <path d="M9.2 10.5h5.6" />
      <path d="M9.6 13.5h4.8" />
      <path d="M10 16.5h4" />
    </svg>
  );
}

/** A molar with two roots, one root's canal traced to its tip -- the detail the treatment is named for. */
export function RootCanalIcon({ strokeWidth = 2, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 10V7c0-1.7 1.8-3 4-3s4 1.3 4 4v3" />
      <path d="M8 10c-1.6 0-3 1.2-3 3 0 3 1.5 6.5 2.7 6.5.9 0 1.3-2 1.3-4.5v-2" />
      <path d="M16 10c1.6 0 3 1.2 3 3 0 3-1.5 6.5-2.7 6.5-.9 0-1.3-2-1.3-4.5v-2" />
      <path d="M12 10v9" />
    </svg>
  );
}

/** A single front tooth with a mended crack -- a jagged break down the middle crossed by two small repair "stitches", reading as fixed rather than merely damaged. */
export function RepairedToothIcon({ strokeWidth = 2, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7.5 4c0-.8.7-1.5 1.5-1.5h6c.8 0 1.5.7 1.5 1.5v5.2c0 1.8-.5 3.5-1.5 5l-1.3 2c-.6.9-1.9.9-2.4 0l-1.3-2c-1-1.5-1.5-3.2-1.5-5V4z" />
      <path d="M10.8 5.5l1.2 2-1.3 1.8 1.3 1.8-1.2 2" />
      <path d="M9.7 7.2l1.8.9M9.7 11.7l1.8.9" />
    </svg>
  );
}

/** A tooth beneath a separate protective guard arch, with a small crescent moon for "worn at night". */
export function NightGuardIcon({ strokeWidth = 2, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 15.5v-1.2C5 10.9 8.1 9.2 12 9.2s7 1.7 7 5.1v1.2" />
      <path d="M8.2 14.6c0-1.5 1.7-2.3 3.8-2.3s3.8.8 3.8 2.3c0 2-.7 2.9-1.1 4.7-.3 1.1-.6 1.8-1.1 1.8-.8 0-.7-2.3-1.6-2.3s-.8 2.3-1.6 2.3c-.5 0-.8-.7-1.1-1.8-.4-1.8-1.1-2.7-1.1-4.7z" />
      <path d="M19.5 2.2a2 2 0 0 0 2.9 2.9 2.9 2.9 0 1 1-2.9-2.9z" />
    </svg>
  );
}

/**
 * Single source of truth for `Treatment.icon` -> icon component, shared by
 * every place that renders a treatment card (the hub on /treatments,
 * ServicesPreview on the homepage) so a given treatment always shows the
 * same icon no matter where it's featured.
 */
export const treatmentIcons = {
  veneers: Layers,
  smile: Smile,
  implant: ImplantIcon,
  paintbrush: Paintbrush,
  aligner: AlignerIcon,
  crown: Crown,
  rootcanal: RootCanalIcon,
  hygiene: Sparkles,
  repairedtooth: RepairedToothIcon,
  nightguard: NightGuardIcon,
};
