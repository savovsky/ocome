import { keysTheme } from '../keys/keysTheme';
import type { IDesignTokens, ITheme, IThemeMode } from '../types/themeTypes';
import { coldTheme, darkTheme, lightTheme, warmTheme } from './themeTokens';

const SHORT_HEX_LENGTH = 3;
const HEX_RADIX = 16;
const RED_WEIGHT = 299;
const GREEN_WEIGHT = 587;
const BLUE_WEIGHT = 114;
const YIQ_DIVISOR = 1000;
const DARK_TEXT_THRESHOLD = 128;
const DARK_TEXT = '#111111';
const LIGHT_TEXT = '#f8f8f8';

export function getContrastTextColor(hexColor: string): string {
  const sanitized = hexColor.replace('#', '');
  let normalized = sanitized;

  if (sanitized.length === SHORT_HEX_LENGTH) {
    normalized = sanitized
      .split('')
      .map((char) => `${char}${char}`)
      .join('');
  }

  const [redHex, greenHex, blueHex] = normalized.match(/.{2}/g) ?? [];

  if (!(redHex && greenHex && blueHex)) {
    return DARK_TEXT;
  }

  const red = parseInt(redHex, HEX_RADIX);
  const green = parseInt(greenHex, HEX_RADIX);
  const blue = parseInt(blueHex, HEX_RADIX);

  // YIQ contrast for quick readable text color on each swatch.
  const yiq = (red * RED_WEIGHT + green * GREEN_WEIGHT + blue * BLUE_WEIGHT) / YIQ_DIVISOR;

  return yiq >= DARK_TEXT_THRESHOLD ? DARK_TEXT : LIGHT_TEXT;
}

export function getTheme(theme: ITheme): IDesignTokens {
  const { THEME_LIGHT, THEME_DARK, THEME_COLD, THEME_WARM } = keysTheme;

  switch (theme) {
    case THEME_LIGHT:
      return lightTheme;

    case THEME_DARK:
      return darkTheme;

    case THEME_COLD:
      return coldTheme;

    case THEME_WARM:
      return warmTheme;

    default:
      return lightTheme;
  }
}

/**
 * Detects the system color-scheme preference and returns the matching theme variant.
 *
 * @param systemColorScheme - Optional scheme from React Native's useColorScheme() hook.
 *   Pass this on mobile so the shared package doesn't need to import react-native.
 *   Omit on web — the function falls back to window.matchMedia.
 */
export function detectSystemTheme(systemColorScheme?: IThemeMode | null): ITheme {
  if (systemColorScheme !== undefined) {
    return systemColorScheme === 'dark' ? keysTheme.THEME_DARK : keysTheme.THEME_LIGHT;
  }

  try {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDark ? keysTheme.THEME_DARK : keysTheme.THEME_LIGHT;
    }
  } catch {
    // Ignore — unsupported browser
  }

  return keysTheme.THEME_LIGHT;
}
