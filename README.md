# Logo Pack Studio V5

Static PWA for GitHub Pages. No build system or server required.

## Deploy
Upload **all five files** (`index.html`, `app.js`, `icon.svg`, `manifest.webmanifest`, `sw.js`) to the root of the `main` branch. Enable GitHub Pages in Settings > Pages > Deploy from branch > main / root.

## Workflow
Brand & Assets (original/white/black required, symbol optional) > Colors > Export. Choose Auto Generate or Customize.

## Exports
PNG/JPG/WebP multiple sizes, original SVG when provided, favicon.ico, icons, social templates, three illustrated applications, palette JSON and an 18-page landscape PDF guideline. ZIP with JSZip and PDF with jsPDF loaded from cdnjs. An internet connection is needed to load these libraries; the app itself is installable as PWA.

## Limitations
- No vectorization of raster inputs; no EPS or color-managed CMYK.
- JPG is exported with white background; transparency is maintained only if source supports it.
- The guidelines contain recommended rules requiring professional review, not verified specifications.
- Social assets are branded logo placements, not a full social design system.
- Mockups are illustrations, not photorealistic renders.
- SVGs should be trusted files: do not upload untrusted SVG content.
