# Content and deployment

## Content (file-based)

- **Location:** `content/sk/` and `content/en/` with identical structure (news, events, achievements, gallery, about).
- **Editing:** Add or edit files in the repo; loaders read at build time. For SK/EN pairs use the same `slug` or `id` in frontmatter.
- **Media:** Store under `public/images/` or `public/gallery/[album-slug]/`; reference by path in content (e.g. `/images/hero.jpg`). No external CMS required for static deploy.

A visual CMS (e.g. Tina) can be added later; it would write to the same `content/` paths.

## Static export

- **Config:** `next.config.ts` has `output: "export"`. No Node server; no middleware.
- **Build:** `npm run build` produces the `out/` directory with static HTML and assets.
- **Deploy:** Upload `out/` to any static host. No server-only or runtime-only APIs are used.
