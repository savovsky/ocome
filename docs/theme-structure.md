# Theme System

Centralized design tokens shared across web (MUI) and mobile (React Native).
Four built-in variants: `light`, `dark`, `cold`, `warm`. Active variant is persisted in Redux.

## Architecture

```text
shared/src/types/themeTypes.ts     - TypeScript interfaces (DesignTokens, ThemeVariant)
shared/src/types/themeTokens.ts    - Token values, 4 variants, getTheme() helper
shared/src/redux-store/slices/sliceTheme.ts  - Redux slice (persisted)
apps/web/src/utils/muiThemeAdapter.ts        - DesignTokens → MUI Theme
apps/web/src/components/ThemedMuiProvider.tsx
apps/mobile/src/components/ThemeContext.tsx  - React Context bridge
apps/mobile/src/components/useTheme.ts       - Convenience hooks
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
| `light` | White backgrounds, MUI-blue primary |
| `dark` | Dark slate backgrounds, lighter primaries |
| `cold` | Desaturated blue-teal, cool backgrounds |
| `warm` | Amber-orange primary, warm off-white backgrounds |

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
import { useDispatch } from 'react-redux';
import { setTheme } from '@ocome/shared/redux-store';

function ThemeSwitcher() {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(setTheme('dark'))}>
      Dark mode
    </button>
  );
}
```

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
import { useDispatch } from 'react-redux';
import { setTheme } from '@ocome/shared/redux-store';

function ThemeSwitcher() {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity onPress={() => dispatch(setTheme('warm'))}>
      <Text>Warm mode</Text>
    </TouchableOpacity>
  );
}
```

## Adding a New Theme Variant

1. Add the variant name to `ThemeVariant` in `shared/src/types/themeTypes.ts`

   ```typescript
   export type ThemeVariant = 'light' | 'dark' | 'cold' | 'warm' | 'myVariant';
   ```

2. Create the token object in `shared/src/types/themeTokens.ts`

   ```typescript
   export const myVariant: DesignTokens = {
     colors: { primary: '#...', ... },
     spacing,
     typography,
     radii,
   };
   ```

3. Register it in the `themes` map in the same file

   ```typescript
   const themes: Record<ThemeVariant, DesignTokens> = {
     light: lightTheme,
     dark: darkTheme,
     cold: coldTheme,
     warm: warmTheme,
     myVariant: myVariantTheme,
   };
   ```

4. TypeScript will now enforce that all variant-switching code handles the new case.

5. Dispatch `setTheme('myVariant')` to activate it.

## Adding a New Token Category

1. Add the interface to `shared/src/types/themeTypes.ts`

   ```typescript
   export interface ShadowTokens {
     sm: string;
     md: string;
     lg: string;
   }

   export interface DesignTokens {
     colors: ColorTokens;
     spacing: SpacingTokens;
     typography: TypographyTokens;
     radii: RadiiTokens;
     shadows: ShadowTokens; // new
   }
   ```

2. Add values to each variant in `shared/src/types/themeTokens.ts`.

3. For MUI: extend `createMuiTheme()` in `apps/web/src/utils/muiThemeAdapter.ts`.

4. For mobile: add `useShadows()` to `apps/mobile/src/components/useTheme.ts`.
