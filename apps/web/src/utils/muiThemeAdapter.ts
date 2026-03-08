import { type Theme, createTheme } from '@mui/material/styles';
import type { DesignTokens } from '@ocome/shared/types/themeTypes';

export function createMuiTheme(tokens: DesignTokens): Theme {
  return createTheme({
    palette: {
      mode: tokens.mode,
      primary: {
        main: tokens.colors.primary,
        dark: tokens.colors.primaryDark,
        light: tokens.colors.primaryLight,
      },
      secondary: {
        main: tokens.colors.secondary,
      },
      background: {
        default: tokens.colors.background,
        paper: tokens.colors.surface,
      },
      text: {
        primary: tokens.colors.text,
        secondary: tokens.colors.textSecondary,
      },
      error: {
        main: tokens.colors.error,
      },
      warning: {
        main: tokens.colors.warning,
      },
      success: {
        main: tokens.colors.success,
      },
      divider: tokens.colors.border,
    },
    spacing: tokens.spacing.sm,
    shape: {
      borderRadius: tokens.radii.md,
    },
    typography: {
      fontSize: tokens.typography.fontSizeMd,
      fontWeightRegular: tokens.typography.fontWeightRegular,
      fontWeightMedium: tokens.typography.fontWeightMedium,
      fontWeightBold: tokens.typography.fontWeightBold,
    },
  });
}
