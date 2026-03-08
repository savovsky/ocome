export type ThemeVariant = 'light' | 'dark' | 'cold' | 'warm';

export interface ColorTokens {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  error: string;
  warning: string;
  success: string;
  border: string;
}

export interface SpacingTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface TypographyTokens {
  fontSizeXs: number;
  fontSizeSm: number;
  fontSizeMd: number;
  fontSizeLg: number;
  fontSizeXl: number;
  fontSizeDisplay: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  lineHeightTight: number;
  lineHeightNormal: number;
  lineHeightRelaxed: number;
}

export interface RadiiTokens {
  none: number;
  sm: number;
  md: number;
  lg: number;
  full: number;
}

export interface DesignTokens {
  mode: 'light' | 'dark';
  colors: ColorTokens;
  spacing: SpacingTokens;
  typography: TypographyTokens;
  radii: RadiiTokens;
}
