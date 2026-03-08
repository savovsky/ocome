import { createContext } from 'react';
import { lightTheme } from '@ocome/shared/theme';
import type { DesignTokens } from '@ocome/shared/types/themeTypes';

export const ThemeContext = createContext<DesignTokens>(lightTheme);
