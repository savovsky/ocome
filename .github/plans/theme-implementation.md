# Implementation Plan: Shared Design Tokens (Option 1)

**TL;DR:** Create a centralized design tokens system in `shared/` (colors, spacing, typography, etc.), then use those tokens with MUI's ThemeProvider in web and with React Native styling utilities in mobile.

---

## Steps

### Phase 1: Design Tokens Foundation (Shared Package)

1. Create `shared/src/theme/` directory structure
   - `shared/src/theme/designTokens.ts` — Core token definitions (colors, spacing, typography, shadows, transitions)
   - `shared/src/theme/index.ts` — Export entry point

2. Define token values in `designTokens.ts`
   - Color palette (primary, secondary, success, warning, error, neutral shades)
   - Spacing scale (xs, sm, md, lg, xl)
   - Typography metrics (font sizes, weights, line heights)
   - Border radius values
   - Shadow definitions for web compatibility

3. Export designTokens and update `shared/package.json` exports field to include `"./theme/*"`

### Phase 2: Web App Integration (MUI Theme)

1. Create `apps/web/src/theme/muiThemeConfig.ts`
   - Import designTokens from shared
   - Build MUI theme object using `createTheme()` with token values
   - Ensure MUI-specific features (shadows, palettes, typography) map cleanly

2. Wrap App component with ThemeProvider
   - Import ThemeProvider from `@mui/material/styles`
   - Wrap `<App />` in `main.tsx` with ThemeProvider
   - Pass MUI theme to provider

3. Verify MUI components render with theme colors and typography

### Phase 3: Mobile App Styling Utilities

1. Create `apps/mobile/src/theme/nativeThemeAdapter.ts`
   - Export function to create React Native style objects from designTokens
   - Provide utility functions: `useColors()`, `useSpacing()`, `useTypography()`
   - Ensures mobile uses same token values as web

2. Update mobile components to use theme utilities instead of hardcoded values
   - Start with existing components: `Users.tsx`, `_layout.tsx`, `index.tsx`
   - Replace inline styles with theme-based utilities

### Phase 4: Documentation & Export

1. Update `shared/src/theme/index.ts` to export all theme utilities

2. Create `docs/theme-structure.md` documenting:
    - Token categories and values
    - Web implementation example (MUI usage)
    - Mobile implementation example (React Native usage)
    - How to extend tokens

3. Add theme export to shared package documentation in `README.md`

---

## Relevant Files

### To Create

- `shared/src/theme/designTokens.ts` — Core design token definitions
- `shared/src/theme/index.ts` — Theme exports
- `apps/web/src/theme/muiThemeConfig.ts` — MUI theme configuration
- `apps/mobile/src/theme/nativeThemeAdapter.ts` — React Native styling utilities
- `docs/theme-structure.md` — Theme documentation

### To Modify

- `shared/package.json` — Add `"./theme/*"` export entry
- `apps/web/src/main.tsx` — Wrap with ThemeProvider
- `apps/web/src/components/App.tsx` — Optional: verify MUI components work
- `apps/mobile/src/app/_layout.tsx` — Update to use theme utilities
- Mobile components (`Users.tsx`) — Update styles to use utilities

---

## Verification

### Web App

- MUI Button, Card, and Typography components render with theme colors
- Color scheme applies consistently to all MUI components
- Run `pnpm --filter @ocome/web run build` — should compile without errors
- Visual inspection: Theme colors visible in browser preview

### Mobile App

- Existing components render with theme-based styles
- Colors and spacing match design token values
- Run `pnpm --filter @ocome/mobile run tsc` — type check passes
- Expo preview shows styled components in simulator/device

### Shared Package

- `pnpm --filter @ocome/shared run build` — compiles successfully
- Type checking passes: `pnpm --filter @ocome/shared run tsc`
- Exports work: verify imports in web and mobile resolve correctly

### Documentation

- `docs/theme-structure.md` lists all available tokens
- Examples show real usage in both web and mobile contexts

---

## Key Decisions

- **Token Scope:** Design tokens cover colors, spacing, typography, borders, and shadows only. Component definitions remain platform-specific (MUI for web, React Native components for mobile).
- **Naming Convention:** Use camelCase for tokens (e.g., `primaryColor`, `spacingMd`, `fontSizeLarge`)
- **MUI Integration:** Use MUI's native theming system (createTheme) rather than custom wrappers to leverage full MUI capabilities
- **Mobile Utilities:** Create small adapter functions rather than full component library to keep mobile app lightweight and flexible
- **No Breaking Changes:** This is additive—existing inline styles can coexist initially and migrate gradually
- **Multiple Themes:** The project will support multiple theme options for users to choose from. Initial themes include at least 4 variants: light, dark, cold, and warm
