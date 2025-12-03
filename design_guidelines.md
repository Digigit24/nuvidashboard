# Dashboard Design Guidelines

## Design Approach

**Selected Approach:** Design System-Based (Shadcn UI + Modern Dashboard Patterns)

**Justification:** This is a utility-focused dashboard application requiring efficiency, consistency, and clarity. Shadcn UI provides a robust component foundation with excellent accessibility and customization.

**Design Principles:**
- Information clarity over visual flair
- Consistent component patterns
- Efficient space utilization
- Professional, minimalist aesthetic
- Responsive-first design

## Core Design Elements

### Typography
**Font Family:** Use Inter or similar sans-serif via Google Fonts
- **Headings:** 
  - H1: text-3xl, font-bold (Dashboard title)
  - H2: text-2xl, font-semibold (Section headers)
  - H3: text-xl, font-semibold (Card titles)
- **Body:** text-base, font-normal (Default text)
- **Small:** text-sm (Labels, metadata)
- **Tiny:** text-xs (Timestamps, secondary info)

### Layout System
**Spacing Primitives:** Consistently use Tailwind units: **2, 4, 6, 8, 12, 16**
- **Component padding:** p-4, p-6
- **Section margins:** mb-6, mb-8
- **Grid gaps:** gap-4, gap-6
- **Container padding:** px-4 md:px-6 lg:px-8

**Grid System:**
- Dashboard grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Card layouts: gap-6
- Stat cards: 2-4 columns responsive

### Component Library

**Header (App Bar):**
- Fixed top position, full width
- Height: h-16
- Contains: Logo/Brand (left), Theme toggle button (right)
- Mobile: Hamburger menu icon (left), theme toggle (right)
- Border bottom for visual separation

**Sidebar:**
- Desktop: Fixed left, width: w-64
- Mobile: Overlay drawer from left, full-height
- Padding: p-4
- Navigation items with icon + label
- Active state: Subtle background highlight
- Grouped navigation sections with dividers
- Collapsible on mobile with smooth slide animation

**Main Content Area:**
- Desktop: margin-left to account for sidebar (ml-64)
- Mobile: Full width when sidebar closed
- Padding: p-6 md:p-8
- Max width: Full width with internal constraints per section

**Dashboard Cards:**
- Rounded corners: rounded-lg
- Padding: p-6
- Shadow: Standard elevation (shadow-sm in light, border in dark)
- Header with title and optional action button
- Content area with appropriate spacing
- Grid layout for stat cards: 3-4 columns on desktop, stacked on mobile

**Data Tables:**
- Zebra striping for rows (subtle)
- Padding: px-4 py-3 for cells
- Header: font-semibold, border-bottom
- Responsive: Horizontal scroll on mobile or card-based layout

**Forms & Inputs:**
- Label above input: mb-2, text-sm, font-medium
- Input height: h-10
- Input padding: px-3
- Rounded: rounded-md
- Focus states: Ring utility for accessibility

**Buttons:**
- Heights: h-10 (default), h-9 (small)
- Padding: px-4 (default), px-3 (small)
- Rounded: rounded-md
- Variants: Default, outline, ghost
- Icon buttons: Square with icon centered

**Empty States:**
- Centered content with icon, heading, description
- Optional CTA button
- Padding: py-12

### Animations
**Minimal and Purposeful:**
- Sidebar slide: transition-transform duration-300
- Theme toggle: smooth fade (150ms)
- Hover states: Subtle opacity/background changes (no transform)
- NO loading spinners unless data fetching exceeds 1 second
- NO scroll animations or page transitions

### Layout Structure

**Desktop Layout:**
```
┌─────────────────────────────────────┐
│          Header (h-16)              │
├──────┬──────────────────────────────┤
│      │                              │
│ Side │     Main Content Area        │
│ bar  │     (p-6 md:p-8)            │
│(w-64)│                              │
│      │                              │
└──────┴──────────────────────────────┘
```

**Mobile Layout:**
- Stacked: Header → Content (Sidebar as drawer overlay)
- Hamburger reveals sidebar from left
- No permanent sidebar on mobile

### Dashboard Sections
**Stat Cards Row:** 
- 4 cards on desktop (grid-cols-4), 2 on tablet, 1 on mobile
- Display key metrics with icon, value, label, change indicator

**Recent Activity Section:**
- List or table format
- 5-8 recent items
- Timestamp + description + status

**Chart/Graph Area:**
- 2-column layout on desktop for comparison charts
- Full width for primary chart
- Use placeholder divs with aspect-ratio utilities

**Quick Actions Panel:**
- 3-4 prominent action buttons in grid
- Icon + label format

### Responsive Breakpoints
- Mobile: < 768px (sidebar drawer, stacked layout)
- Tablet: 768px - 1024px (2-column grids)
- Desktop: > 1024px (full multi-column layout)

### Accessibility
- All interactive elements keyboard navigable
- Focus indicators on all focusable elements (ring utilities)
- ARIA labels for icon-only buttons
- Semantic HTML structure (nav, main, header, section)
- Color contrast compliant in both themes

### Images
**No hero images required** - This is a dashboard application focused on data and functionality, not visual storytelling.