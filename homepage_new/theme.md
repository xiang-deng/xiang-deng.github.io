# Design Theme

A minimalist, elegant design system using the [Nord](https://www.nordtheme.com) light color palette, inspired by Notion, Apple, and LaTeX academic aesthetics.

---

## Design Principles

1. **Clean & Light** - Nord Snow Storm backgrounds, ample whitespace, no visual clutter
2. **Academic Elegance** - Geometric sans-serif headings (Raleway) provide distinctive hierarchy
3. **Readable** - Optimal line length, comfortable typography
4. **Subtle Hierarchy** - Use type weight and spacing, not heavy borders or colors
5. **Notion-like Simplicity** - Content-first, minimal chrome
6. **Arctic & Clean** - Nord Polar Night text, Frost accent, Snow Storm surfaces

---

## Colors

The palette is built on Nord's 16-color system. All Nord colors are imported via `css/nord.css` and referenced as `var(--nord0)` through `var(--nord15)` directly in the stylesheet.

### Nord Palette Reference

| Group | Variable | Hex | Role in light theme |
|-------|----------|-----|---------------------|
| Polar Night | `--nord0` | `#2e3440` | Primary text |
| | `--nord1` | `#3b4252` | — |
| | `--nord2` | `#434c5e` | — |
| | `--nord3` | `#4c566a` | Muted text, captions, markers |
| Snow Storm | `--nord4` | `#d8dee9` | Borders, code block borders |
| | `--nord5` | `#e5e9f0` | Subtle surfaces, light borders, hover states |
| | `--nord6` | `#eceff4` | Page background |
| Frost | `--nord7` | `#8fbcbb` | — |
| | `--nord8` | `#88c0d0` | Links, interactive accents |
| | `--nord9` | `#81a1c1` | — |
| | `--nord10` | `#5e81ac` | Link hover, deeper accent |
| Aurora | `--nord11`–`--nord15` | various | Status colors (reserved) |

One semantic token remains for text that falls between nord3 and nord4:

```css
:root {
  --color-text-faint: #7b88a1;   /* timestamps, metadata */
}
```

### Color Rationale

| Choice | Why |
|--------|-----|
| Nord Polar Night text (`--nord0`, `--nord3`) | Rich blue-gray hierarchy with strong contrast on light surfaces |
| Snow Storm surfaces (`--nord6`, `--nord5`, `--nord4`) | Three-tier lightness scale for bg → subtle → borders |
| Frost accent (`--nord8` / `--nord10`) | Cool cyan for links (restrained, not overly saturated) |
| Custom faint text (`#7b88a1`) | Nord lacks a mid-tone between nord3 and nord4; this fills the gap for metadata |

### Usage Guidelines

| Element | Color |
|---------|-------|
| Page background | `var(--nord6)` |
| Code blocks, subtle sections | `var(--nord5)` |
| Body text | `var(--nord0)` |
| Captions, dates, venues | `var(--nord3)` |
| Metadata, timestamps | `var(--color-text-faint)` |
| Links | `var(--nord8)` |
| Link hover | `var(--nord10)` |
| Horizontal rules, borders | `var(--nord4)` |
| Light borders, dividers | `var(--nord5)` |

---

## Typography

### Font Stack

```css
:root {
  --font-serif: 'Raleway', 'Segoe UI', sans-serif;
  --font-sans:  'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono:  'JetBrains Mono', 'Fira Code', Consolas, monospace;
}
```

Note: `--font-serif` is a legacy variable name — it now holds **Raleway**, a geometric sans-serif used for display headings. The name is kept for CSS compatibility.

### Font Rationale

| Font | Why |
|------|-----|
| Raleway | Geometric sans-serif with elegant, distinctive letterforms. Provides clear visual hierarchy against Source Sans Pro body text while maintaining a cohesive all-sans-serif stack. Used for display headings (h1, h2), nav logo, profile name, and page titles. |
| Source Sans Pro | Adobe's first open-source type family — clean, highly readable at all sizes. Matches the original Jekyll site's body font. Used at weight 300 (light) for body text, weight 600 for h3/h4 labels. Also used for blockquotes and portfolio paper titles. |
| JetBrains Mono | Clean, modern monospace. Good for code snippets that may appear in portfolio descriptions. |

### Font Loading (Google Fonts)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
```

### Type Scale

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| H1 | Raleway | 2.25rem (36px) | 600 | 1.2 | -0.01em |
| H2 | Raleway | 1.625rem (26px) | 600 | 1.3 | 0 |
| H3 | Source Sans Pro | 1.25rem (20px) | 600 | 1.4 | 0 |
| H4 | Source Sans Pro | 1rem (16px) | 600 | 1.5 | 0.01em |
| Body | Source Sans Pro | 1rem (16px) | 300 | 1.5 | 0 |
| Small | Source Sans Pro | 0.875rem (14px) | 300 | 1.5 | 0 |
| Caption | Source Sans Pro | 0.8rem (12.8px) | 300 | 1.4 | 0.01em |
| Code | JetBrains Mono | 0.875rem (14px) | 400 | 1.6 | 0 |
| Nav Logo | Raleway | 1.25rem (20px) | 600 | 1 | 0 |
| Nav Links | Source Sans Pro | 0.875rem (14px) | 400 | 1 | 0.02em |
| Blog post title | Raleway | 1.25rem (20px) | 500 | 1.4 | 0 |
| Blockquote | Source Sans Pro | 1.05rem | 400 italic | — | 0 |
| Portfolio paper title | Source Sans Pro | inherit | 600 | — | 0 |

### Typography Guidelines

- **Display headings (h1, h2)**: Raleway, weight 600 — page titles and section headers
- **Label headings (h3, h4)**: Source Sans Pro, weight 600 — company names, reviewer roles, sub-labels that blend with body text
- **Blog post titles**: Raleway, weight 500 — clickable titles, still display-level
- **Blockquotes**: Source Sans Pro italic — clean with the all-sans stack
- **Portfolio paper titles**: Source Sans Pro bold (600) — inline with body text, avoids font-family switch mid-line
- **Body text**: Source Sans Pro at 16px, weight 300, line-height 1.5 for clean readable text
- **Code**: JetBrains Mono for inline code and fenced blocks
- **Line length**: ~925px container for wider layout matching original site
- **Paragraph spacing**: 1.3em margin between paragraphs
- **Heading spacing**: 2em margin-top, 0.5em margin-bottom (breathing room above, proximity below)

---

## Spacing

### Base Unit

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
}
```

### Application

| Context | Spacing |
|---------|---------|
| Nav height | 56px |
| Nav padding (horizontal) | `--space-6` (24px) |
| Main content top padding | `--space-16` (64px) from nav |
| Container side padding (mobile) | `--space-5` (20px) |
| Container side padding (desktop) | `--space-8` (32px) |
| Between major sections | `--space-16` (64px) |
| Between heading and content | `--space-3` (12px) |
| Between paragraphs | `--space-6` (24px) |
| Between list items | `--space-2` (8px) |
| Footer padding | `--space-12` (48px) top/bottom |

---

## Layout

### Container

```css
.container {
  max-width: 925px;        /* wider layout matching original site */
  margin: 0 auto;
  padding: 0 var(--space-5);  /* 20px mobile */
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-8);  /* 32px desktop - more breathing room */
  }
}
```

### Page Structure

```
┌────────────────────────────────────────────────────────────────┐
│ nav: height 56px, sticky top, border-bottom                    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  main: padding-top 64px                                        │
│                                                                │
│         ┌──────────────────────────────────────┐               │
│         │  .container (max-width: 925px)       │               │
│         │                                      │               │
│         │  content...                          │               │
│         │                                      │               │
│         └──────────────────────────────────────┘               │
│                                                                │
│  footer: padding 48px 0, border-top                            │
│         muted text, social links                               │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints

```css
/* Mobile first, then scale up */
@media (min-width: 640px)  { /* sm - minor adjustments */ }
@media (min-width: 768px)  { /* md - container padding change */ }
@media (min-width: 1024px) { /* lg - not much changes at 925px max-width */ }
```

---

## Components

### Navigation

```
┌────────────────────────────────────────────────────────────────┐
│  Xiang Deng                          About  Experience  ...    │
│  └─ Raleway, 600, 20px              └─ Source Sans Pro, 400     │
│                                        14px, muted, spaced     │
└────────────────────────────────────────────────────────────────┘
```

- Sticky at top with `backdrop-filter: blur(8px)` and `background: rgba(236,239,244,0.85)` (translucent nord6)
- Subtle `border-bottom: 1px solid var(--nord5)`
- Name/logo: Raleway, weight 600, links to home
- Nav links: Source Sans Pro, 14px, muted color (`--nord3`), letter-spacing `0.02em`
- Active state: `--nord0` (not accent) with subtle underline offset
- Mobile: hamburger menu or stacked links

### Profile Section (About Page)

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│   ┌──────┐                                           │
│   │      │  Xiang Deng                               │
│   │ photo│  Senior Research Scientist, Scale AI      │
│   │      │                                           │
│   └──────┘  Scholar · GitHub · LinkedIn · Email      │
│                                                      │
│   ──────────────────────────────────────              │
│                                                      │
│   Markdown bio content renders here...               │
│                                                      │
└──────────────────────────────────────────────────────┘
```

- Photo: 120x120px, `border-radius: 50%`, subtle `box-shadow`
- Name: h1, Raleway
- Title/affiliation: `--nord3`, Source Sans Pro
- Social links: small, muted, with subtle icon + text, separated by `·`
- Horizontal rule separates profile header from bio content

### Links

```css
a {
  color: var(--nord8);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--nord10);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
```

### Blockquotes

```css
blockquote {
  border-left: 3px solid var(--nord3);
  padding-left: var(--space-6);
  margin: var(--space-8) 0;
  color: var(--nord3);
  font-style: italic;
  font-family: var(--font-sans);
  font-size: 1.05rem;
}
```

Source Sans Pro italic in muted color for a clean, cohesive feel with the all-sans stack.

### Horizontal Rule

```css
hr {
  border: none;
  border-top: 1px solid var(--nord4);
  margin: var(--space-12) 0;
}
```

### Images (in markdown)

```css
#content img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;        /* very subtle rounding */
  margin: var(--space-8) 0;
}
```

### Tables

```css
table {
  width: 100%;
  border-collapse: collapse;
  margin: var(--space-8) 0;
  font-size: 0.9rem;
}

th {
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid var(--nord4);
  padding: var(--space-3) var(--space-4);
}

td {
  border-bottom: 1px solid var(--nord5);
  padding: var(--space-3) var(--space-4);
}
```

Clean, minimal table inspired by LaTeX `booktabs` style - no vertical rules, heavier top/bottom borders.

### Code Blocks

```css
pre {
  background: var(--nord5);
  border: 1px solid var(--nord4);
  border-radius: 6px;
  padding: var(--space-4) var(--space-6);
  overflow-x: auto;
  margin: var(--space-6) 0;
}

code {
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

/* Inline code */
:not(pre) > code {
  background: var(--nord5);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.85em;
}
```

### Lists

```css
ul, ol {
  padding-left: var(--space-6);
  margin: var(--space-4) 0;
}

li {
  margin-bottom: var(--space-2);
}

li::marker {
  color: var(--nord3);
}
```

### Portfolio Items

Portfolio entries are rendered from markdown, styled as a clean inline list without card wrappers:

```
## LLM Agents

Works on building agents that interact with the real world.

- **Paper Title** (Venue 2024) — [paper](#) · [code](#)
- **Another Paper** (Venue 2023) — [paper](#)
```

Rendered styling:
```css
#content li strong {
  font-weight: 600;
  color: var(--nord0);
}

#content h2 {
  margin-top: var(--space-16);
  padding-top: var(--space-8);
  border-top: 1px solid var(--nord5);
}

#content h2:first-of-type {
  border-top: none;
}
```

### Blog Post List (from RSS)

```css
.blog-post {
  padding: var(--space-6) 0;
  border-bottom: 1px solid var(--nord5);
}

.blog-post:last-child {
  border-bottom: none;
}

.blog-post h3 {
  font-family: var(--font-serif);
  font-weight: 500;
  margin-bottom: var(--space-1);
}

.blog-post h3 a {
  color: var(--nord0);
  text-decoration: none;
}

.blog-post h3 a:hover {
  color: var(--nord8);
}

.blog-post time {
  font-size: 0.8rem;
  color: var(--color-text-faint);
  letter-spacing: 0.02em;
}

.blog-post p {
  color: var(--nord3);
  font-size: 0.9rem;
  margin-top: var(--space-2);
}
```

---

## Icons

Minimal inline SVGs only. No icon library needed.

Social icons: simple outline style, 18px, muted color.

```css
.icon {
  width: 18px;
  height: 18px;
  color: var(--nord3);
  transition: color var(--transition-fast);
}

.icon:hover {
  color: var(--nord8);
}
```

---

## Motion

Subtle, functional transitions only:

```css
:root {
  --transition-fast: 0.15s ease-in-out;
  --transition-base: 0.2s ease-in-out;
  --transition-slow: 0.3s ease-in-out;
}
```

### Content Load Transition

When markdown content loads, a gentle fade-in prevents the flash of empty → content pop-in:

```css
#content {
  opacity: 0;
  transition: opacity var(--transition-slow);
}

#content.loaded {
  opacity: 1;
}
```

### Applied Transitions

| Element | Transition | Property |
|---------|-----------|----------|
| Links | fast (0.15s) | color |
| Nav links | fast (0.15s) | color |
| Icons | fast (0.15s) | color |
| Content load | slow (0.3s) | opacity |

No page transitions, no scroll animations, no parallax. Speed and clarity over spectacle.

---

## Dark Mode (Future)

Not in initial scope. A Nord dark variant can reuse the same `--nord*` variables with Polar Night as backgrounds:

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: var(--nord0);
    color: var(--nord6);
  }
  /* Swap surface/border roles: nord1 for subtle, nord2 for borders, etc. */
}
```

---

## Reference Aesthetic

| Source | What we take from it |
|--------|---------------------|
| **Nord** | Arctic color palette — Polar Night text, Snow Storm surfaces, Frost accents |
| **Apple** | Premium typography, generous spacing, restrained elegance |
| **LaTeX** | Clean document structure, booktabs-style tables |
| **Academic Papers** | Hierarchy through typography alone, no decorative elements |
