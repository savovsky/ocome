# Theme System

Centralized design tokens shared across web (MUI) and mobile (React Native).
Four built-in variants: `THEME_LIGHT`, `THEME_DARK`, `THEME_COLD`, `THEME_WARM`. Active variant is persisted in Redux under user preferences.

## Architecture

```text
packages/shared/src/keys/keysTheme.ts                           - Theme variant constants
packages/shared/src/keys/keysThemeMode.ts                       - Theme mode constants (light/dark)
packages/shared/src/types/themeTypes.ts                         - TypeScript interfaces (IDesignTokens, ITheme, IThemeMode)
packages/shared/src/theme/themeTokens.ts                        - Token values for 4 variants
packages/shared/src/theme/themeUtils.ts                         - Helper functions (getTheme, getContrastTextColor)
packages/shared/src/redux-store/slices/sliceUserPreferences.ts - Redux slice for theme + language (persisted)
packages/shared/src/redux-store/hooks/useUserPreferences.ts    - Typed hook for user preferences slice
apps/web/src/utils/muiThemeAdapter.ts                  - IDesignTokens → MUI Theme
apps/web/src/components/ThemedMuiProvider.tsx          - Web theme provider  
apps/web/src/components/ThemePlayground.tsx            - Visual theme explorer
apps/mobile/src/components/ThemeContext.tsx            - React Context bridge for mobile
apps/mobile/src/components/useTheme.ts                 - Mobile convenience hooks
```

## Token Reference

### Colors

| Token | Type | Example (light) | Description |
| ----- | ---- | --------------- | ----------- |
| `colors.primary` | `string` | `#1976d2` | Brand primary |
| `colors.primaryDark` | `string` | `#115293` | Primary hover/active |
| `colors.primaryLight` | `string` | `#4791db` | Primary tint |
| `colors.secondary` | `string` | `#9c27b0` | Accent color |
| `colors.background` | `string` | `#f5f5f5` | Page background |
| `colors.surface` | `string` | `#ffffff` | Card/paper background |
| `colors.text` | `string` | `#212121` | Primary text |
| `colors.textSecondary` | `string` | `#757575` | Muted text |
| `colors.textDisabled` | `string` | `#bdbdbd` | Disabled text |
| `colors.error` | `string` | `#d32f2f` | Error states |
| `colors.warning` | `string` | `#f57c00` | Warning states |
| `colors.success` | `string` | `#388e3c` | Success states |
| `colors.border` | `string` | `#e0e0e0` | Borders/dividers |

### Spacing

| Token | Value (px) | Usage |
| ----- | --------- | ----- |
| `spacing.xs` | 4 | Tight gaps |
| `spacing.sm` | 8 | Small gaps (MUI base unit) |
| `spacing.md` | 16 | Default padding |
| `spacing.lg` | 24 | Section spacing |
| `spacing.xl` | 32 | Large sections |
| `spacing.xxl` | 48 | Page-level spacing |

### Typography

| Token | Value | Description |
| ----- | ----- | ----------- |
| `typography.fontSizeXs` | 10 | Captions, labels |
| `typography.fontSizeSm` | 12 | Small text |
| `typography.fontSizeMd` | 14 | Body (default) |
| `typography.fontSizeLg` | 16 | Large body |
| `typography.fontSizeXl` | 20 | Subheadings |
| `typography.fontSizeDisplay` | 28 | Display headings |
| `typography.fontWeightRegular` | 400 | Normal weight |
| `typography.fontWeightMedium` | 500 | Medium weight |
| `typography.fontWeightBold` | 700 | Bold weight |
| `typography.lineHeightTight` | 1.2 | Headings |
| `typography.lineHeightNormal` | 1.5 | Body text |
| `typography.lineHeightRelaxed` | 1.75 | Prose |

### Border Radii

| Token | Value (px) | Usage |
| ----- | --------- | ----- |
| `radii.none` | 0 | Square corners |
| `radii.sm` | 4 | Chips, tags |
| `radii.md` | 8 | Cards, inputs |
| `radii.lg` | 16 | Modals, sheets |
| `radii.full` | 9999 | Pills, avatars |

## Theme Variants

| Variant | Palette direction |
| ------- | --------------- |
| `THEME_LIGHT` | White backgrounds, MUI-blue primary |
| `THEME_DARK` | Dark slate backgrounds, lighter primaries |
| `THEME_COLD` | Desaturated blue-teal, cool backgrounds |
| `THEME_WARM` | Amber-orange primary, warm off-white backgrounds |

## Type System

The theme system uses strongly-typed constants defined in key files:

```typescript
// packages/shared/src/keys/keysTheme.ts
export const keysTheme = {
  THEME_LIGHT: 'THEME_LIGHT',
  THEME_DARK: 'THEME_DARK',
  THEME_COLD: 'THEME_COLD',
  THEME_WARM: 'THEME_WARM',
} as const;

// packages/shared/src/keys/keysThemeMode.ts
export const keysThemeMode = {
  MODE_LIGHT: 'light',
  MODE_DARK: 'dark',
} as const;

// Derived types
type ITheme = ObjectValues<typeof keysTheme>;
type IThemeMode = ObjectValues<typeof keysThemeMode>;
```

## Web Usage (MUI)

MUI components pick up theme colors automatically via `ThemedMuiProvider` (already in `App.tsx`).

**Accessing tokens in `sx` prop:**

```typescript
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();

  return (
    <Box sx={{ color: theme.palette.primary.main, p: 2 }}>
      Hello
    </Box>
  );
}
```

**Switching the active theme:**

```typescript
import useStoreDispatch from '@ocome/shared/redux-store/hooks/useStoreDispatch';
import { setTheme } from '@ocome/shared/redux-store/slices/sliceUserPreferences';
import { keysTheme } from '@ocome/shared/keys/keysTheme';

function ThemeSwitcher() {
  const dispatch = useStoreDispatch();

  return (
    <button onClick={() => dispatch(setTheme(keysTheme.THEME_DARK))}>
      Dark mode
    </button>
  );
}
```

**Reading current theme preference:**

```typescript
import useSliceUserPreferences from '@ocome/shared/redux-store/hooks/useUserPreferences';

function CurrentThemeInfo() {
  const { theme, language } = useSliceUserPreferences();

  return <p>Current theme: {theme}</p>;
}
```

**Visualizing all themes:**

The web app includes a `ThemePlayground` component that displays all theme variants with their color tokens side-by-side. This is useful for design review and documentation.

## Mobile Usage (React Native)

**Accessing colors and spacing:**

```typescript
import { useColors, useSpacing, useTypography } from '../components/useTheme';

function MyScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const typography = useTypography();

  return (
    <View style={{ backgroundColor: colors.background, padding: spacing.md }}>
      <Text style={{ color: colors.text, fontSize: typography.fontSizeMd }}>
        Hello
      </Text>
    </View>
  );
}
```

**Switching the active theme (same Redux action as web):**

```typescript
import useStoreDispatch from '@ocome/shared/redux-store/hooks/useStoreDispatch';
import { setTheme } from '@ocome/shared/redux-store/slices/sliceUserPreferences';
import { keysTheme } from '@ocome/shared/keys/keysTheme';

function ThemeSwitcher() {
  const dispatch = useStoreDispatch();

  return (
    <TouchableOpacity onPress={() => dispatch(setTheme(keysTheme.THEME_WARM))}>
      <Text>Warm mode</Text>
    </TouchableOpacity>
  );
}
```

## Helper Utilities

The `themeUtils.ts` module provides helper functions:

### getTheme(theme: ITheme): IDesignTokens

Returns the complete design token object for a given theme variant.

```typescript
import { getTheme } from '@ocome/shared/theme/themeUtils';
import { keysTheme } from '@ocome/shared/keys/keysTheme';

const darkTokens = getTheme(keysTheme.THEME_DARK);
console.log(darkTokens.colors.primary); // '#90caf9'
```

### getContrastTextColor(hexColor: string): string

Determines whether to use dark or light text on a given background color using YIQ contrast algorithm. Returns `#111111` (dark) or `#f8f8f8` (light).

```typescript
import { getContrastTextColor } from '@ocome/shared/theme/themeUtils';

const textColor = getContrastTextColor('#1976d2'); // Returns '#f8f8f8' (light text)
```

## Redux State Structure

Theme preferences are stored in the `userPreferences` slice:

```typescript
interface ISliceUserPreferences {
  theme: ITheme;       // Current theme variant
  language: ILanguage; // Current language preference
}
```

The slice provides these actions:

- `setTheme(theme: ITheme)` - Update theme variant
- `setLanguage(language: ILanguage)` - Update language preference
- `resetUserPreferences()` - Reset to defaults

## Adding a New Theme Variant

1. Add the variant constant to `packages/shared/src/keys/keysTheme.ts`

   ```typescript
   export const keysTheme = {
     THEME_LIGHT: 'THEME_LIGHT',
     THEME_DARK: 'THEME_DARK',
     THEME_COLD: 'THEME_COLD',
     THEME_WARM: 'THEME_WARM',
     THEME_MY_VARIANT: 'THEME_MY_VARIANT', // new
   } as const;
   ```

2. Create the token object in `packages/shared/src/theme/themeTokens.ts`

   ```typescript
   export const myVariantTheme: IDesignTokens = {
     mode: MODE_LIGHT, // or MODE_DARK
     colors: { primary: '#...', ... },
     spacing,
     typography,
     radii,
   };
   ```

3. Add it to the switch statement in `packages/shared/src/theme/themeUtils.ts`

   ```typescript
   export function getTheme(theme: ITheme): IDesignTokens {
     const { THEME_LIGHT, THEME_DARK, THEME_COLD, THEME_WARM, THEME_MY_VARIANT } = keysTheme;

     switch (theme) {
       case THEME_LIGHT:
         return lightTheme;
       case THEME_DARK:
         return darkTheme;
       case THEME_COLD:
         return coldTheme;
       case THEME_WARM:
         return warmTheme;
       case THEME_MY_VARIANT:
         return myVariantTheme;
       default:
         return lightTheme;
     }
   }
   ```

4. TypeScript will now enforce that all variant-switching code handles the new case.

5. Dispatch `setTheme(keysTheme.THEME_MY_VARIANT)` to activate it.

## Adding a New Token Category

1. Add the interface to `packages/shared/src/types/themeTypes.ts`

   ```typescript
   export interface IShadowTokens {
     sm: string;
     md: string;
     lg: string;
   }

   export interface IDesignTokens {
     mode: IThemeMode;
     colors: IColorTokens;
     spacing: ISpacingTokens;
     typography: ITypographyTokens;
     radii: IRadiiTokens;
     shadows: IShadowTokens; // new
   }
   ```

2. Add values to each variant in `packages/shared/src/theme/themeTokens.ts`.

3. For MUI: extend `createMuiTheme()` in `apps/web/src/utils/muiThemeAdapter.ts`.

4. For mobile: add `useShadows()` to `apps/mobile/src/components/useTheme.ts`.

## Migration Notes

If upgrading from the old theme system:

- `ThemeVariant` → `ITheme` (with `THEME_` prefix constants)
- `DesignTokens` → `IDesignTokens`
- `ColorTokens` → `IColorTokens`, `SpacingTokens` → `ISpacingTokens`, etc.
- `sliceTheme` → `sliceUserPreferences`
- `selectThemeVariant` selector → `useSliceUserPreferences()` hook
- Import paths: `@ocome/shared/theme` → `@ocome/shared/theme/themeTokens` or `@ocome/shared/theme/themeUtils`
- String literals `'light'`, `'dark'` → Constants `keysTheme.THEME_LIGHT`, `keysTheme.THEME_DARK`
