# Homepage Chrome Design

## Goal

Improve the visual polish of the homepage shell without drifting away from the existing Nord-light, academic, content-first identity.

The approved direction is:

- Keep a restrained frosted treatment on the sticky navigation.
- Replace the profile card with an integrated left rail treatment.
- Keep the footer quiet and lightly elevated, not card-like.
- Preserve the reading area as the calmest surface on the page.

## Why This Direction

The earlier profile-card explorations added too much enclosure and made the sidebar feel like a separate product card. That competed with the writing and broke the editorial rhythm of the layout.

The integrated rail approach fixes that by making the profile information feel structural rather than promotional. The page keeps some modern polish in the navigation chrome, while the main layout remains document-like and serious.

## Scope

In scope:

- Navigation surface styling
- Sidebar/profile treatment
- Footer surface styling
- Small supporting adjustments to spacing, borders, shadows, and translucency

Out of scope:

- Changing page structure or content
- Rewriting the responsive layout
- Adding animations beyond the current subtle interaction model
- Changing the main content rendering model

## Baseline Constraints

The following current layout behaviors must remain unchanged unless required for bug fixes:

- `nav` height stays `56px`
- `sidebar` width stays `220px`
- `sidebar` sticky offset stays aligned to nav height plus current spacing, roughly `76px`
- `.content-area` max width stays `80ch`
- `.container` max width stays `1100px`
- Existing two-column desktop layout and stacked mobile layout remain intact

These constraints are intended to preserve the editorial rhythm and avoid regressions while restyling chrome.

## Approved Visual System

### Navigation

Use a restrained frosted treatment only on the sticky navigation.

Characteristics:

- Sticky navigation keeps a translucent Nord-tinted background in the approximate range of `rgba(251, 251, 252, 0.72)` to `rgba(251, 251, 252, 0.84)`
- Backdrop blur is visible but restrained, roughly `8px` to `14px`
- Border stays subtle and crisp
- Shadow, if any, should be minimal and mostly used to separate the bar from scrolling content
- Desktop bar remains visually lighter than a card and should not look glossy
- If `backdrop-filter` is unsupported, fallback is a more opaque solid background in the approximate range of `rgba(251, 251, 252, 0.92)` to `rgba(251, 251, 252, 0.96)` with no reliance on blur
- Open mobile menu should be more opaque than the desktop bar so links remain crisp above page content
- Active and hover link states must remain at least as legible as the current implementation

Intent:

The navigation is the best place for a glass-like treatment because it is already a persistent chrome element and benefits from feeling layered above the page.

### Sidebar

Adopt the integrated rail direction.

Characteristics:

- No enclosed card shell around the profile block
- No standalone rounded panel, no floating card shadow, and no prominent full border around the sidebar group
- Sidebar remains a dedicated left column with a subtle divider as the main separation mechanism on desktop
- Divider should sit at the right edge of the sidebar column rather than wrapping the profile as a box
- Photo, name, title, and links stay visually grouped through spacing and alignment, not a floating panel
- Sidebar content stays center-aligned on desktop unless implementation constraints make left alignment materially better
- Any background tint should be absent or extremely faint enough that the sidebar still reads as part of the page background
- Padding should support readability, but not create a standalone object
- Minimal internal markup tweaks inside the existing JS-rendered `#sidebar` output are allowed if needed for cleaner grouping, but page-level HTML structure should not change

Intent:

The sidebar should read as part of the page layout, not as a highlighted module.

### Footer

Use a quiet surface treatment that is clearly weaker than the nav treatment.

Characteristics:

- Slightly differentiated background from the page
- Optional mild translucency, but weaker than nav opacity/blur treatment
- Soft top border
- No heavy shadow or boxed-card feeling
- Footer should not read as a card or tray detached from the page

Intent:

The footer should feel finished and polished, but secondary to the content and navigation.

### Main Content

Keep content surfaces mostly flat.

Characteristics:

- Main reading area remains the least stylized zone
- Existing hierarchy and typography stay dominant
- No strong blur or glossy treatments around article content

Intent:

The site should still feel like a personal academic homepage, not a dashboard or product landing page.

## Component-Level Changes

### `nav`

- Introduce translucent background using the existing Nord palette
- Add `backdrop-filter` blur
- Tune border and active-link contrast so text remains crisp
- Ensure mobile menu inherits the same treatment without becoming muddy
- Preserve current nav height and sticky behavior

### `sidebar`

- Remove card-like enclosure styling
- Shift to rail-like alignment and structure
- Use divider/spacing as the primary separation mechanism
- Reduce shadow depth and eliminate prominent panel borders
- Preserve current sidebar width and sticky behavior
- Ensure the desktop divider disappears or becomes appropriate when stacked on mobile

### `footer`

- Add a subtle surface distinction
- Keep typography and links visually lightweight
- Match the sidebar's quieter treatment rather than the nav's stronger treatment

## Data Flow / Rendering Impact

No data-model changes are needed.

Existing rendering remains unchanged:

- `js/site.js` continues to render sidebar and footer content
- HTML page structure remains the same
- The change is primarily CSS, with optional minimal markup tweaks only if necessary for cleaner sidebar structure
- No content or markdown source changes are required for this work

## Responsive Behavior

Desktop:

- Sidebar remains a left rail in the two-column layout
- Divider/separation should stay subtle
- Nav translucency should remain readable while scrolling over long content pages

Mobile:

- Sidebar should stack naturally without preserving any desktop-only divider awkwardly
- Frosted nav treatment should remain legible when the mobile menu opens
- Any subtle footer surface should continue to read cleanly on smaller screens
- When stacked, sidebar should no longer imply a right-side rail; desktop divider should be removed or adapted

## Risks

- Too much translucency could reduce text contrast in the nav
- Too little structure in the sidebar could make it feel disconnected from the rest of the page
- If the footer receives the same treatment strength as the nav, the page will feel over-styled

## Acceptance Criteria

- `About`, `Experience`, `Portfolio`, and `Blog` all preserve the existing layout proportions
- `nav` remains `56px` tall and sticky
- `sidebar` remains `220px` wide on desktop and retains sticky placement
- `content-area` still reads as the dominant reading column and does not lose width
- Sidebar no longer appears as a standalone card with its own boxed boundary
- Navigation links remain legible at rest, hover, active, and while scrolling
- Open mobile nav is visually clearer and more opaque than the desktop nav bar
- Footer remains visually secondary to both the content and the nav
- Styling remains acceptable in environments without `backdrop-filter`

## Testing Plan

- Compare updated `About`, `Experience`, `Portfolio`, and `Blog` at desktop width around `1280px`
- Compare at tablet width around `768px`
- Compare at mobile width around `390px`
- Check desktop scroll states near page top and mid-page
- Check mobile navigation open state
- Verify fallback appearance by confirming that more opaque backgrounds are defined where blur may not apply
- Confirm no regressions in spacing, sticky behavior, nav height, sidebar width, or content width

## Implementation Recommendation

Implement the approved direction as:

1. Frosted nav
2. Integrated rail sidebar
3. Quiet footer
4. Flat content area

If trade-offs appear during implementation, bias toward less enclosure and less visual weight rather than more.
