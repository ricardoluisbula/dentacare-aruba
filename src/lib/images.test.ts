import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * ARUBA DRAFT guard for the photos reused from the reference (Amsterdam)
 * practice's site: every image path the code references must exist, and the
 * photos that were deliberately NOT carried over (they show the reference
 * practice's premises or signage, carry its watermark, or were retired) must
 * never be referenced or copied into public/images.
 */

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");
const PUBLIC = path.join(ROOT, "public");
const THIS_FILE = path.join(SRC, "lib", "images.test.ts");

/** Excluded reference photos, matched against paths and file names. */
const EXCLUDED: RegExp[] = [
  /clinic\/lobby\.webp/,
  /homepage-smile-final\.png/,
  /about\/instruments\.webp/,
  /about\/dentist\.webp/,
  /about\/smile-transformation\.webp/,
  /case-(03|07|11|13|14)-[a-z0-9-]*\.webp/,
  /case-05-(before|after)\.webp/,
];

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const sourceFiles = walk(SRC).filter((file) => /\.(ts|tsx|css)$/.test(file) && file !== THIS_FILE);
const publicImages = walk(path.join(PUBLIC, "images")).map((file) => path.relative(PUBLIC, file).split(path.sep).join("/"));

/** Every "/images/..." path written in the source, with the file that references it. */
const references = sourceFiles.flatMap((file) => {
  const text = fs.readFileSync(file, "utf8");
  return [...text.matchAll(/["'`(](\/images\/[^"'`)\s]+)/g)].map((match) => ({ file: path.relative(ROOT, file), image: match[1] }));
});

describe("reused photos", () => {
  it("are referenced from the source at all (sanity check of the scan)", () => {
    expect(references.length).toBeGreaterThan(10);
  });

  it.each(references.map((ref) => [`${ref.image} (${ref.file})`, ref.image] as const))("%s exists in public/", (_, image) => {
    expect(fs.existsSync(path.join(PUBLIC, image))).toBe(true);
  });

  it("never references an excluded reference photo anywhere in src/", () => {
    const hits = sourceFiles.flatMap((file) => {
      const text = fs.readFileSync(file, "utf8");
      return EXCLUDED.filter((pattern) => pattern.test(text)).map((pattern) => `${path.relative(ROOT, file)}: ${pattern}`);
    });
    expect(hits).toEqual([]);
  });

  it("has no excluded reference photo in public/images", () => {
    const hits = publicImages.filter((image) => EXCLUDED.some((pattern) => pattern.test(image)));
    expect(hits).toEqual([]);
  });

  it("uses every photo copied into public/images", () => {
    const referenced = new Set(references.map((ref) => ref.image.replace(/^\//, "")));
    expect(publicImages.filter((image) => !referenced.has(image))).toEqual([]);
  });
});
