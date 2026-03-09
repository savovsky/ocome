import { createContext } from 'react';
import { lightTheme } from '@ocome/shared/theme/themeTokens';
import type { IDesignTokens } from '@ocome/shared/types/themeTypes';

export const ThemeContext = createContext<IDesignTokens>(lightTheme);
