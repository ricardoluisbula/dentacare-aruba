import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Guards the keyboard focus indicator's contrast (WCAG 1.4.11: 3:1 against
 * adjacent colours). Reads the real tokens from globals.css, so recolouring
 * the ring or a surface to something too faint fails the build.
 */

const css = fs.readFileSync(path.resolve(__dirname, "../app/globals.css"), "utf8");

function palette(name: string): string {
  const match = new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`).exec(css);
  if (!match) throw new Error(`no --color-${name} in globals.css`);
  return match[1];
}

/** The palette entry a token block assigns to --ring. */
function ringIn(block: RegExp): string {
  const body = block.exec(css)?.[1] ?? "";
  const ref = /--ring:\s*var\(--color-([a-z0-9-]+)\)/.exec(body)?.[1];
  if (!ref) throw new Error("no --ring in block");
  return palette(ref);
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) =>
    v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe("focus ring contrast", () => {
  it("is at least 3:1 on every light and gold-tinted surface", () => {
    const ring = ringIn(/:root\s*{([^}]*)}/);
    for (const surface of ["ivory-50", "ivory-100", "gold-50", "gold-100", "gold-200"]) {
      expect(contrast(ring, palette(surface)), `ring on ${surface}`).toBeGreaterThanOrEqual(3);
    }
    expect(contrast(ring, "#ffffff"), "ring on white").toBeGreaterThanOrEqual(3);
  });

  it("is at least 3:1 on the dark theme's surfaces", () => {
    const ring = ringIn(/\.dark\s*{([^}]*)}/);
    for (const surface of ["ink-950", "ink-900"]) {
      expect(contrast(ring, palette(surface)), `dark ring on ${surface}`).toBeGreaterThanOrEqual(3);
    }
  });

  it("switches to a ring that stays visible on the dark espresso panels", () => {
    const ring = ringIn(/\.focus-on-dark\s*{([^}]*)}/);
    for (const surface of ["espresso-700", "espresso-800", "espresso-900"]) {
      expect(contrast(ring, palette(surface)), `ring on ${surface}`).toBeGreaterThanOrEqual(3);
    }
  });
});
