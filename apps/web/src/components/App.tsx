import { type FC, StrictMode, useLayoutEffect } from 'react';
import { Provider } from 'react-redux';
import { ClerkProvider } from '@clerk/react';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { createStore } from '@ocome/shared/redux-store';
import useStoreDispatch from '@ocome/shared/redux-store/hooks/useStoreDispatch';
import useSliceUserPreferences from '@ocome/shared/redux-store/hooks/useUserPreferences';
import { setTheme } from '@ocome/shared/redux-store/slices/sliceUserPreferences';
import { detectSystemTheme } from '@ocome/shared/theme/themeUtils';
import { getClerkPublishableKey } from '../utils/utilsCommon';
import ThemedMuiProvider from './ThemedMuiProvider';
import AuthShell from './auth/AuthShell';

const { persistor, store } = createStore(storage);

const SystemThemeDetector: FC = () => {
  const dispatch = useStoreDispatch();
  const { hasExplicitTheme } = useSliceUserPreferences();

  useLayoutEffect(() => {
    if (!hasExplicitTheme) {
      dispatch(setTheme(detectSystemTheme()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — runs once on mount after rehydration

  return null;
};

const App: FC = () => {
  const clerkPublishableKey = getClerkPublishableKey();
  return (
    <StrictMode>
      <ClerkProvider afterSignOutUrl='/' publishableKey={clerkPublishableKey}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SystemThemeDetector />
            <ThemedMuiProvider>
              <AuthShell />
            </ThemedMuiProvider>
          </PersistGate>
        </Provider>
      </ClerkProvider>
    </StrictMode>
  );
};

export default App;
