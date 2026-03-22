# Design System Document: High-End Editorial

## 1. Overview & Creative North Star: "The Digital Curator"

This design system is built upon the concept of **The Digital Curator**. It moves away from the rigid, boxy constraints of traditional "template" software and toward a high-end editorial experience. Inspired by the precision of Apple and the functional elegance of Stripe, this system prioritizes clarity, tonal depth, and intentional breathing room.

Our "North Star" is to make every screen feel like a curated gallery. We achieve this through:
*   **Intentional Asymmetry:** Breaking the strict center-alignment to create dynamic visual paths.
*   **Breathable Luxury:** Using generous whitespace (`spacing-24`) to denote premium quality.
*   **Material Authenticity:** Treating the UI as physical layers of frosted glass and fine paper rather than flat pixels.

---

## 2. Colors & Surface Architecture

The palette is anchored in deep charcoals and soft off-whites, punctuated by a refined indigo accent.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or layout containment. Boundaries must be defined solely through background color shifts. A section should be distinguished from the background by moving from `surface` (#fcf9f8) to `surface-container-low` (#f6f3f2).

### Surface Hierarchy & Nesting
Treat the UI as a series of nested physical layers. Importance is defined by "lift" through color, not lines.
*   **Base:** `surface` (#fcf9f8)
*   **Secondary Content Area:** `surface-container-low` (#f6f3f2)
*   **Interactive Cards:** `surface-container-lowest` (#ffffff) to provide a "pop" of brightness.
*   **Active/Selected State:** Use `tertiary_fixed` (#ffe088) for high-importance selections, as seen in the "Lease Property" active state.

### The "Glass & Gradient" Rule
For floating elements (modals, navigation bars, or hover-state cards), utilize Glassmorphism:
*   **Background:** `surface` at 80% opacity.
*   **Effect:** `backdrop-blur: 20px`.
*   **Signature Polish:** Main CTAs may use a subtle linear gradient from `primary` (#3525cd) to `primary_container` (#4f46e5) at a 135-degree angle to add "soul" and depth.

---

## 3. Typography: The Editorial Voice

We utilize a dual-font strategy to balance authoritative headers with highly legible functional text.

*   **Display & Headlines (Manrope):** Chosen for its geometric precision. Use `display-lg` (3.5rem) for hero statements with a tight `-0.02em` letter spacing to feel "locked" and intentional.
*   **Body & Labels (Inter):** The workhorse for utility. Always use `body-md` (0.875rem) or `body-lg` (1rem) for content. Labels (`label-md`) should feature a `+0.05em` letter spacing to ensure breathability at small sizes.
*   **Hierarchy:** Headers use `on_surface` (#1c1b1b), while secondary descriptions and helper text must use `on_surface_variant` (#464555) to reduce visual noise.

---

## 4. Elevation & Depth: Tonal Layering

Traditional shadows are a last resort. We convey hierarchy through **Tonal Layering**.

*   **The Layering Principle:** To lift a card, place a `surface-container-lowest` (#ffffff) element on a `surface-container` (#f0edec) background. The contrast in light value provides a natural, sophisticated "lift."
*   **Ambient Shadows:** When a floating effect is required (e.g., a dropdown), use an ultra-diffused shadow:
    *   `box-shadow: 0 20px 40px rgba(28, 27, 27, 0.06);` (Using a tinted version of `on_surface`).
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, it must be the `outline_variant` (#c7c4d8) at **15% opacity**. Total opacity borders are strictly forbidden.

---

## 5. Components

### Buttons
*   **Primary:** Background `primary` (#3525cd), text `on_primary` (#ffffff). Border radius: `md` (0.75rem). Transition: `200ms cubic-bezier(0.4, 0, 0.2, 1)`.
*   **Secondary (Outlined):** Background transparent, "Ghost Border" of `outline`, text `on_surface`.
*   **States:** On hover, primary buttons should shift to `primary_container`.

### Cards & Selection List Items
*   **Forbid dividers:** Use `spacing-3` (1rem) to `spacing-4` (1.4rem) of vertical whitespace to separate items.
*   **Selected State:** Transition the entire background to `tertiary_fixed` (#ffe088) and apply a slightly more pronounced "Ghost Border" to define the selection.

### Input Fields
*   **Styling:** Background `surface_container_lowest`, 1.5px "Ghost Border" using `outline_variant`.
*   **Focus State:** The border transitions to `primary` (#3525cd) with a subtle `primary_fixed` glow.
*   **Icons:** Use consistent stroke weights (1.5px or 2px) to match the typography's weight.

### Toggle Switches & Radio Buttons
*   **Toggles:** Use the `primary` color for the "on" state.
*   **Radio Buttons:** Large, breathable circles. The inner "dot" should be the `on_surface` color for high contrast against the `surface` background.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins to create an editorial feel (e.g., a wider left-hand gutter for headlines).
*   **Do** rely on font-weight and color (using `on_surface_variant`) to create hierarchy before resorting to size changes.
*   **Do** use the `xl` (1.5rem) border-radius for large containers to soften the "hyper-professional" aesthetic into something more approachable.

### Don't
*   **Don't** use 100% black (#000000). Always use `on_surface` (#1c1b1b) for deep tones to keep the palette "soft."
*   **Don't** use standard dividers. If content feels cluttered, increase the spacing scale (move from `spacing-6` to `spacing-8`).
*   **Don't** use high-saturation shadows. If the shadow is visible as a "grey smudge," it is too heavy.
