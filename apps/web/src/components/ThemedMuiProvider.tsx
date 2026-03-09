import { type FC, type ReactNode, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import useSliceUserPreferences from '@ocome/shared/redux-store/hooks/useUserPreferences';
import { getTheme } from '@ocome/shared/theme/themeUtils';
import { createMuiTheme } from '../utils/muiThemeAdapter';

interface ThemedMuiProviderProps {
  children: ReactNode;
}

const ThemedMuiProvider: FC<ThemedMuiProviderProps> = ({ children }) => {
  const { theme } = useSliceUserPreferences();
  const muiTheme = useMemo(() => createMuiTheme(getTheme(theme)), [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemedMuiProvider;
