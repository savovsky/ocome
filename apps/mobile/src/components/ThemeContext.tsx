import { type FC, type ReactNode, useMemo } from 'react';
import { selectThemeVariant } from '@ocome/shared/redux-store';
import useStoreSelector from '@ocome/shared/redux-store/hooks/useStoreSelector';
import { getTheme } from '@ocome/shared/theme';
import { ThemeContext } from './themeTokensContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const variant = useStoreSelector(selectThemeVariant);
  const tokens = useMemo(() => getTheme(variant), [variant]);

  return <ThemeContext.Provider value={tokens}>{children}</ThemeContext.Provider>;
};
