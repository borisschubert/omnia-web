# Omnia design tokens

## Color

| Token | Value | Usage |
|--------|--------|--------|
| `--primary-gold` | `#ffd700` | Brand gold (Ocenenia spotlight, stats, badges, CTAs) |
| `--accent` | `var(--primary-gold)` | Tailwind `accent`, `text-accent`, `bg-accent`, `border-accent` |

All interactive gold UI should use `accent` / `primary-gold` — not legacy dark gold (`#b8860b`).

## Typography

- **Family:** Work Sans (Google), loaded in `app/layout.tsx` with weights **400, 500, 600**.
- **Body:** default `font-weight: 400` on `body`.
- **Major headings (`h1`–`h3` in page content):** `font-semibold` (600) via Tailwind classes — not `font-bold`.

## Reference

The Ocenenia intro (“spotlight” section) defines the premium bar for gold and heading treatment.
