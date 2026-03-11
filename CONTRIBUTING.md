## Contributing to this project

This document explains how the project is structured and how to make changes in a way that keeps the codebase easy to understand for new developers.

### Project structure (high level)

- `src/main.tsx` – React entrypoint. Mounts the app into `index.html` and loads global styles.
- `src/App.tsx` – Top‑level providers and routing. Wires React Query, tooltips, toasts, and page routes.
- `src/components/AppLayout.tsx` – Shared application shell (sidebar + header + main content + help button).
- `src/components/AppSidebar.tsx` – Main navigation items (Dashboard, Cars, Leads, Automations, AI Assistant, Settings).
- `src/components/ui/` – Reusable UI primitives (buttons, cards, dialogs, sidebar system, etc.).
- `src/pages/` – Route components for each page (Dashboard, Cars, Leads, Automations, AI Assistant, Settings, NotFound).
- `src/index.css` + `tailwind.config.ts` – Design tokens and Tailwind theme (colors, radii, utilities).

### Commenting guidelines

Use comments to explain **why**, not to restate **what** the code already shows.

- Prefer comments that explain:
  - Intent and business rules (e.g. why a route redirects or why a breakpoint was chosen).
  - How multiple components or hooks work together (e.g. `SidebarProvider` + `Sidebar` + `SidebarTrigger`).
  - Non‑obvious behavior (e.g. mobile vs desktop layout differences, or when a component renders as a sheet vs fixed sidebar).
- Avoid comments that narrate obvious behavior, such as:
  - `// render button`
  - `// set state`
  - `// loop over items`

### Component and function style

- Prefer small, focused components and hooks with descriptive names (e.g. `AppLayoutContent`, `useIsMobile`) instead of very large components that handle many concerns.
- Keep JSX structure consistent across pages:
  - Page title (`h1`).
  - Subtitle / description (`p`).
  - Main content (cards, tables, forms, etc.).
- In JSX props, keep a consistent ordering:
  1. Identity / routing props (e.g. `to`, `href`, `type`).
  2. Behavioral props (e.g. `onClick`, `onSubmit`).
  3. Visual props (e.g. `variant`, `size`, `className`).
  4. `children` (if passed explicitly).

### Adding or updating pages

- Add new route components under `src/pages/YourPage.tsx`.
- Register routes in `src/App.tsx` by adding a `<Route>` that renders your page inside `AppLayout`.
- If the page should appear in the left navigation, add an entry to `navItems` in `src/components/AppSidebar.tsx`.
- Follow the existing pattern:
  - Keep the page component small and focused.
  - Add a short comment at the top of the file describing what the page shows and any key interactions.

### Working with the sidebar layout

- The sidebar system is defined in `src/components/ui/sidebar.tsx` and used by `AppLayout` and `AppSidebar`.
- On desktop:
  - `Sidebar` renders as a fixed panel and `SidebarInset` wraps the main content area.
- On mobile:
  - `Sidebar` renders inside a sheet (slide‑over).
  - `SidebarTrigger` opens and closes the sheet using `useSidebar()` state.

When modifying the sidebar or layout, keep mobile and desktop behavior in sync and add a short comment if you introduce new state or behavior.

### Running the app and tests

- Install dependencies: `npm install`
- Run the dev server: `npm run dev`
- Run tests: `npm run test`

If you add new modules, ensure they follow the commenting and structure guidelines above so future contributors can understand the code quickly.

