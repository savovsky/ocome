import { type FC, type ReactNode, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { selectThemeVariant } from '@ocome/shared/redux-store';
import useStoreSelector from '@ocome/shared/redux-store/hooks/useStoreSelector';
import { getTheme } from '@ocome/shared/theme';
import { createMuiTheme } from '../utils/muiThemeAdapter';

interface ThemedMuiProviderProps {
  children: ReactNode;
}

const ThemedMuiProvider: FC<ThemedMuiProviderProps> = ({ children }) => {
  const variant = useStoreSelector(selectThemeVariant);
  const muiTheme = useMemo(() => createMuiTheme(getTheme(variant)), [variant]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemedMuiProvider;
