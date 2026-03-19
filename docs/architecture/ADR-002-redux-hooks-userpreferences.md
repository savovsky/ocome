# Architecture Decision Record (ADR) - Redux Hooks Pattern & User Preferences

**Date:** March 9, 2026

**Author:** AI Assistant

**Status:** Accepted

## 1. Context & Problem Statement

The Redux state management had several pain points:

- Direct selector usage scattered across codebase made refactoring difficult
- Theme-only slice was limiting future user preference expansion
- Type naming conventions were inconsistent (missing `I` prefix for interfaces)
- Theme utilities and tokens were mixed with type definitions
- No dedicated hooks for consuming specific slices

## 2. Decision: Introduce Slice-Specific Hooks & Unified User Preferences

We have decided to implement:

1. **Slice-specific hooks pattern** - One hook per slice for encapsulated state access
2. **Unified user preferences slice** - Combines theme + language (extensible for future preferences)
3. **Consistent type naming** - All interfaces use `I` prefix (`IDesignTokens`, `ITheme`, etc.)
4. **Separated theme structure** - Split theme into dedicated files (`themeTokens.ts`, `themeUtils.ts`)
5. **Key-based constants** - Theme and language values defined in `keys/` folder

### Why Slice-Specific Hooks?

✅ **Benefits:**

- **Encapsulation:** State access logic centralized in one place
- **Maintainability:** Selector changes don't ripple through entire codebase
- **Type safety:** TypeScript enforces correct usage through hook return types
- **Discoverability:** Clear API surface for each slice
- **Testing:** Easier to mock and test slice access

### Why Unified User Preferences?

✅ **Benefits:**

- **Logical grouping:** Theme and language are both user preferences
- **Single persistence boundary:** One slice to persist/hydrate
- **Extensibility:** Easy to add more preferences (timezone, units, accessibility)
- **Atomic updates:** Multiple preference changes in single action possible
- **Reduced boilerplate:** Fewer slices to register and maintain

### Why Key-Based Constants?

✅ **Benefits:**

- **Type safety:** TypeScript validates all theme/language references
- **Refactoring:** Rename constants without affecting persisted state
- **Discoverability:** IDE autocomplete shows all valid options
- **Consistency:** Enforces uniform naming across codebase

## 3. Implementation Details

### Slice Structure

```typescript
// packages/shared/src/redux-store/slices/sliceUserPreferences.ts
export interface ISlice {
  theme: ITheme;
  language: ILanguage;
}

export const sliceUserPreferences = createSlice({
  name: 'userPreferences',
  initialState: { theme: THEME_LIGHT, language: ENG },
  reducers: {
    setTheme(state, action: PayloadAction<ITheme>) { ... },
    setLanguage(state, action: PayloadAction<ILanguage>) { ... },
    resetUserPreferences: () => initialState,
  },
});
```

### Hook Pattern

```typescript
// packages/shared/src/redux-store/hooks/useUserPreferences.ts
function useSliceUserPreferences() {
  const sliceUserPreferences = useStoreSelector((state) => state.userPreferences);
  return sliceUserPreferences;
}
```

### Theme Structure

```text
packages/shared/src/keys/keysTheme.ts          - Theme constants (THEME_LIGHT, etc.)
packages/shared/src/keys/keysThemeMode.ts      - Mode constants (MODE_LIGHT, MODE_DARK)  
packages/shared/src/theme/themeTokens.ts       - Token definitions for all variants
packages/shared/src/theme/themeUtils.ts        - Helper functions (getTheme, getContrastTextColor)
packages/shared/src/types/themeTypes.ts        - TypeScript interfaces only
```

### Key Definitions

```typescript
// packages/shared/src/keys/keysTheme.ts
export const keysTheme = {
  THEME_LIGHT: 'THEME_LIGHT',
  THEME_DARK: 'THEME_DARK',
  THEME_COLD: 'THEME_COLD',
  THEME_WARM: 'THEME_WARM',
} as const;

// Derived type
type ITheme = ObjectValues<typeof keysTheme>;
```

## 4. Consequences

### Positive

- **Better DX:** Developers use `useSliceUserPreferences()` instead of manual selectors
- **Easier refactoring:** Slice changes isolated to single hook file
- **Future-proof:** Adding preferences doesn't require new slices
- **Cleaner imports:** Theme utilities separated from type definitions
- **Type safety:** Key-based constants prevent typos and invalid values

### Negative

- **Migration cost:** Existing code must update imports and usage patterns
- **Learning curve:** New developers must learn hook pattern (minor)
- **Indirection:** One extra layer between component and selector

### Migration Path

```typescript
// Before
import { selectThemeVariant } from '@ocome/shared/redux-store';
const variant = useStoreSelector(selectThemeVariant);
dispatch(setTheme('dark'));

// After
import useSliceUserPreferences from '@ocome/shared/redux-store/hooks/useUserPreferences';
import { setTheme } from '@ocome/shared/redux-store/slices/sliceUserPreferences';
import { keysTheme } from '@ocome/shared/keys/keysTheme';
const { theme } = useSliceUserPreferences();
dispatch(setTheme(keysTheme.THEME_DARK));
```

## 5. Related Decisions

- **ADR-001:** Monorepo structure enables shared state management
- **Theme structure documentation:** [`docs/theme-structure.md`](../theme-structure.md)
- **Redux skill:** [`.github/skills/redux-state-management/SKILL.md`](../../.github/skills/redux-state-management/SKILL.md)

## 6. References

- [Redux Toolkit: Usage with TypeScript](https://redux-toolkit.js.org/usage/usage-with-typescript)
- [React Redux: TypeScript Quick Start](https://react-redux.js.org/tutorials/typescript-quick-start)
- [Shared package exports](../../packages/shared/package.json)
