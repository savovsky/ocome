import type { DesignTokens, ThemeVariant } from './themeTypes';

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const typography = {
  fontSizeXs: 10,
  fontSizeSm: 12,
  fontSizeMd: 14,
  fontSizeLg: 16,
  fontSizeXl: 20,
  fontSizeDisplay: 28,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  lineHeightTight: 1.2,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.75,
};

const radii = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  full: 9999,
};

export const lightTheme: DesignTokens = {
  mode: 'light',
  colors: {
    primary: '#1976d2',
    primaryDark: '#115293',
    primaryLight: '#4791db',
    secondary: '#9c27b0',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#212121',
    textSecondary: '#757575',
    error: '#d32f2f',
    warning: '#f57c00',
    success: '#388e3c',
    border: '#e0e0e0',
  },
  spacing,
  typography,
  radii,
};

export const darkTheme: DesignTokens = {
  mode: 'dark',
  colors: {
    primary: '#90caf9',
    primaryDark: '#42a5f5',
    primaryLight: '#bbdefb',
    secondary: '#ce93d8',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#f5f5f5',
    textSecondary: '#9e9e9e',
    error: '#ef9a9a',
    warning: '#ffcc80',
    success: '#a5d6a7',
    border: '#333333',
  },
  spacing,
  typography,
  radii,
};

export const coldTheme: DesignTokens = {
  mode: 'light',
  colors: {
    primary: '#0288d1',
    primaryDark: '#01579b',
    primaryLight: '#4fc3f7',
    secondary: '#00838f',
    background: '#e8f4f8',
    surface: '#ffffff',
    text: '#1a2a3a',
    textSecondary: '#4a6272',
    error: '#c62828',
    warning: '#e65100',
    success: '#2e7d32',
    border: '#b0bec5',
  },
  spacing,
  typography,
  radii,
};

export const warmTheme: DesignTokens = {
  mode: 'light',
  colors: {
    primary: '#e65100',
    primaryDark: '#bf360c',
    primaryLight: '#ff8a65',
    secondary: '#f9a825',
    background: '#fdf3e7',
    surface: '#ffffff',
    text: '#3e2723',
    textSecondary: '#795548',
    error: '#b71c1c',
    warning: '#e65100',
    success: '#33691e',
    border: '#d7ccc8',
  },
  spacing,
  typography,
  radii,
};

const themes: Record<ThemeVariant, DesignTokens> = {
  light: lightTheme,
  dark: darkTheme,
  cold: coldTheme,
  warm: warmTheme,
};

export function getTheme(variant: ThemeVariant): DesignTokens {
  return themes[variant] ?? lightTheme;
}

export type { DesignTokens, ThemeVariant };
