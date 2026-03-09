import { type FC, type ReactNode, useMemo } from 'react';
import useSliceUserPreferences from '@ocome/shared/redux-store/hooks/useUserPreferences';
import { getTheme } from '@ocome/shared/theme/themeUtils';
import { ThemeContext } from './themeTokensContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const { theme } = useSliceUserPreferences();
  const tokens = useMemo(() => getTheme(theme), [theme]);

  return <ThemeContext.Provider value={tokens}>{children}</ThemeContext.Provider>;
};
