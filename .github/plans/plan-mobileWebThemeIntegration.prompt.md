# Plan: Mobile & Web Theme Integration with System Detection

## TL;DR

Integrate the mobile app's bootstrap theme system with the shared package's comprehensive theme tokens (THEME_LIGHT, THEME_DARK, THEME_COLD, THEME_WARM). Implement system light/dark detection for both mobile and web apps that respects user overrides persisted in Redux. On first load, auto-detect system preference; on subsequent loads, use persisted Redux theme. No flash experience—detection completes before any UI renders.

## Architecture

**Initial Load Flow:**
```
App Launch → Redux Hydration Check → System Detection (if new user)
  ↓
Dispatch detected theme to Redux
  ↓
ThemeProvider reads Redux → Render with correct theme (zero flash)
```

**Persistence:** Redux + redux-persist handles saving user's theme choice. System detection only used on first ever launch before Redux state is saved.

## Steps

### Phase 1: Add Shared Utility for System Detection

**File:** `shared/src/theme/themeUtils.ts`

**Action:** Add new exported function `detectSystemTheme()` that:
- Detects native system preference (mobile: via `useColorScheme` from react-native, web: via CSS media query `(prefers-color-scheme: dark)`)
- Maps to `THEME_LIGHT` or `THEME_DARK` from `keysTheme`
- Returns `ITheme` type
- Is a pure function (no React hooks, no side effects)
- Handle both React Native and web environments

**Logic:**
```
If platform is React Native:
  - Use require('react-native').useColorScheme() at runtime
  - If returns 'dark' → return keysTheme.THEME_DARK
  - Else → return keysTheme.THEME_LIGHT

If platform is web:
  - Check window.matchMedia('(prefers-color-scheme: dark)').matches
  - If true → return keysTheme.THEME_DARK
  - Else → return keysTheme.THEME_LIGHT
```

### Phase 2: Mobile App Integration

**2A. Update ThemeProvider** (`apps/mobile/src/components/ThemeContext.tsx`)

**Action:** Add initialization effect to detect system theme on first load
- Import `useEffect` from React
- Import `useSliceUserPreferences` hook (existing)
- Import `useStoreDispatch` hook (existing)
- Import `setTheme` action from shared redux slice
- Import new `detectSystemTheme()` from shared utils
- Add `useEffect` hook that:
  1. Checks if Redux store has a theme already set (compare with initial default)
  2. If not set (new user): call `detectSystemTheme()` and dispatch `setTheme()` 
  3. Run only once on mount (empty dependency array)
- Current logic already reads from Redux and passes to ThemeContext.Provider—no change needed there

*Depends on Phase 1*

**2B. Simplify use-color-scheme.ts** (`apps/mobile/src/hooks/use-color-scheme.ts`)

**Action:** Replace current export with:
- Remove custom re-export logic
- Simply export `useColorScheme` from 'react-native' directly
- This is now used only for reading system preference in utility functions

*Parallel with 2A*

**2C. Delete bootstrap theme file** (`apps/mobile/src/constants/theme.ts`)

**Action:** Delete the entire file. All mobile theme usage now routes through:
- `useTheme()` from [src/components/useTheme.ts](apps/mobile/src/components/useTheme.ts) for full design tokens
- `useColors()`, `useSpacing()`, `useTypography()`, `useRadii()` for specific token slices
- All files currently using `Colors` from constants/theme.ts must be updated to use hooks instead

**Files to update when deleting:**
- Search workspace for imports of `@/constants/theme` or `constants/theme`
- Update any components using `Colors.light` or `Colors.dark` to use `useColors()` hook instead

*Depends on 2A and 2B being complete*

**2D. Verify use-theme-color.ts is compatible** (`apps/mobile/src/hooks/use-theme-color.ts`)

**Action (audit only):**
- Current implementation uses `useColorScheme()` and references `Colors` from constants
- After Phase 2C, this file may need updates if it still references bootstrap colors
- If it does: preserve the structure but extract color from shared tokens via `useColors()` instead

### Phase 3: Web App Integration

**File:** `apps/web/src/components/App.tsx`

**Action:** Add initialization effect to detect system theme before rendering children
- Import `useEffect`, `useCallback` from React
- Import `useSliceUserPreferences` hook
- Import `useStoreDispatch` hook
- Import `setTheme` action
- Add `detectSystemTheme()` call wrapped in web-safe check (since React Native won't exist in web build)
- Add `useEffect` hook that:
  1. Checks if Redux store has a theme already set (new user)
  2. If not set: detect system theme via `window.matchMedia('(prefers-color-scheme: dark)')` and dispatch `setTheme()`
  3. Run only on mount (empty dependency array)
- Wrap ThemeProvider inside App component (if not already) to ensure theme dispatch happens before ThemeProvider consumes it

*Depends on Phase 1*

### Phase 4: Cleanup & Verification

**Action:** Update mobile package.json and verify no dead imports
- Check if `constants/theme.ts` still has any imports elsewhere after Phase 2C
- Run TypeScript type check: `pnpm --filter mobile tsc`
- Run TypeScript type check: `pnpm --filter web tsc`
- No build should have `Colors.light` or `Colors.dark` references remaining

*Depends on Phases 2A, 2B, 2C, 2D, 3 being complete*

## Relevant Files

- `shared/src/theme/themeUtils.ts` — Add `detectSystemTheme()` function
- `shared/src/keys/keysTheme.ts` — Reference for THEME_LIGHT, THEME_DARK constants (no changes)
- `shared/src/redux-store/slices/sliceUserPreferences.ts` — Reference for `setTheme` action (no changes)
- `shared/src/redux-store/hooks/useSliceModals.ts` — Reference pattern for Redux hooks (no changes)
- `apps/mobile/src/components/ThemeContext.tsx` — Add initialization effect
- `apps/mobile/src/hooks/use-color-scheme.ts` — Simplify to direct export
- `apps/mobile/src/constants/theme.ts` — DELETE
- `apps/mobile/src/hooks/use-theme-color.ts` — Audit and update if needed
- `apps/web/src/components/App.tsx` — Add initialization effect

## Verification

1. **Type Safety:** Run `pnpm --filter mobile tsc --noEmit` and `pnpm --filter web tsc --noEmit` — zero errors
2. **No Dead Code:** Search entire workspace for `from '@/constants/theme'` — should return 0 results
3. **Mobile Runtime:** On fresh app launch (cleared AsyncStorage), theme should match system preference without flash
4. **Mobile Persistence:** Set theme to different option in app, close and reopen → theme persists to Redux choice, ignoring system preference
5. **Web Runtime:** On fresh page load, theme matches browser `prefers-color-scheme` setting without flash
6. **Web Persistence:** Set theme to different option, refresh page → persisted Redux theme applies

## Decisions

- **System Detection Timing:** Before ThemeProvider renders (no flash experience)
- **Detection Scope:** Only `light` and `dark` (maps to THEME_LIGHT/THEME_DARK); warm/cold are manual-selection-only
- **First Load Strategy:** If Redux store is in initial state (no saved theme) → dispatch detected theme; before Provider renders
- **Subsequent Loads:** Redux-persist restores saved theme; system detection not consulted
- **Bootstrap Removal:** Complete—all mobile styling now uses shared tokens via hooks
- **No Backward Compat Issue:** Project in local dev, no production users affected

## Implementation Notes

- `detectSystemTheme()` must not use React hooks (can be called from effects, not directly in render)
- Use platform-safe detection: mobile uses `useColorScheme()` hook, web uses `window.matchMedia()`
- Both mobile effects should check `theme !== initialState.theme` to avoid re-dispatching on every render
- ThemeProvider and App.tsx both need dispatch logic to handle their respective environments independently
- Consider wrapping `detectSystemTheme()` logic with try-catch for web fallback (browser compatibility)
