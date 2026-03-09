/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */
import type { IColorTokens } from '@ocome/shared/types/themeTypes';
import { useColors, useTheme } from '../components/useTheme';

export function useThemeColor(props: { light?: string; dark?: string }, colorName: keyof IColorTokens) {
  const { mode } = useTheme();
  const colors = useColors();
  const colorFromProps = props[mode];

  return colorFromProps ?? colors[colorName];
}
