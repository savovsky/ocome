import { useContext } from 'react';
import type {
  ColorTokens,
  DesignTokens,
  RadiiTokens,
  SpacingTokens,
  TypographyTokens,
} from '@ocome/shared/types/themeTypes';
import { ThemeContext } from './themeTokensContext';

export function useTheme(): DesignTokens {
  return useContext(ThemeContext);
}

export function useColors(): ColorTokens {
  return useTheme().colors;
}

export function useSpacing(): SpacingTokens {
  return useTheme().spacing;
}

export function useTypography(): TypographyTokens {
  return useTheme().typography;
}

export function useRadii(): RadiiTokens {
  return useTheme().radii;
}
