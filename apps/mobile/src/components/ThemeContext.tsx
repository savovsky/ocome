import { type FC, type ReactNode, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import useStoreDispatch from '@ocome/shared/redux-store/hooks/useStoreDispatch';
import useSliceUserPreferences from '@ocome/shared/redux-store/hooks/useUserPreferences';
import { setTheme } from '@ocome/shared/redux-store/slices/sliceUserPreferences';
import { detectSystemTheme, getTheme } from '@ocome/shared/theme/themeUtils';
import { ThemeContext } from './themeTokensContext';

interface Props {
  children: ReactNode;
}

export const ThemeProvider: FC<Props> = ({ children }) => {
  const { theme, hasExplicitTheme } = useSliceUserPreferences();
  const dispatch = useStoreDispatch();
  const colorScheme = useColorScheme();
  const tokens = useMemo(() => getTheme(theme), [theme]);

  useEffect(() => {
    if (!hasExplicitTheme) {
      dispatch(setTheme(detectSystemTheme(colorScheme)));
    }
  }, []);

  return <ThemeContext.Provider value={tokens}>{children}</ThemeContext.Provider>;
};
