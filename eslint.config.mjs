import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Legacy design-canvas static site, kept as-is at repo root and mirrored into
    // public/ for the untouched Bordsbon/Bordssamtal/Samtalskort pages — not part
    // of the Next.js app, not meant to pass this project's lint rules.
    "public/support.js",
    "public/image-slot.js",
    "public/calendar.js",
    "support.js",
    "image-slot.js",
    "calendar.js",
  ]),
]);

export default eslintConfig;
