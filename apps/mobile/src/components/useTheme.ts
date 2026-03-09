import { useContext } from 'react';
import type {
  IColorTokens,
  IDesignTokens,
  IRadiiTokens,
  ISpacingTokens,
  ITypographyTokens,
} from '@ocome/shared/types/themeTypes';
import { ThemeContext } from './themeTokensContext';

export function useTheme(): IDesignTokens {
  return useContext(ThemeContext);
}

export function useColors(): IColorTokens {
  return useTheme().colors;
}

export function useSpacing(): ISpacingTokens {
  return useTheme().spacing;
}

export function useTypography(): ITypographyTokens {
  return useTheme().typography;
}

export function useRadii(): IRadiiTokens {
  return useTheme().radii;
}
