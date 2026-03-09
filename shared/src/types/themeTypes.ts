import { keysTheme } from '../keys/keysTheme';
import { keysThemeMode } from '../keys/keysThemeMode';
import { ObjectValues } from './typesCommon';

export type ITheme = ObjectValues<typeof keysTheme>;
export type IThemeMode = ObjectValues<typeof keysThemeMode>;

export interface IColorTokens {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  textDisabled: string;
  error: string;
  warning: string;
  success: string;
  border: string;
}

export interface ISpacingTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ITypographyTokens {
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

export interface IRadiiTokens {
  none: number;
  sm: number;
  md: number;
  lg: number;
  full: number;
}

export interface IDesignTokens {
  mode: IThemeMode;
  colors: IColorTokens;
  spacing: ISpacingTokens;
  typography: ITypographyTokens;
  radii: IRadiiTokens;
}
