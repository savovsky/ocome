import { type FC, StrictMode, useLayoutEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { createStore } from '@ocome/shared/redux-store';
import useStoreDispatch from '@ocome/shared/redux-store/hooks/useStoreDispatch';
import useSliceUserPreferences from '@ocome/shared/redux-store/hooks/useUserPreferences';
import { setTheme } from '@ocome/shared/redux-store/slices/sliceUserPreferences';
import { detectSystemTheme } from '@ocome/shared/theme/themeUtils';
import ComponentPlaceholder from './ComponentPlaceholder';
import ThemePlayground from './ThemePlayground';
import ThemedMuiProvider from './ThemedMuiProvider';
import Users from './Users';

const { persistor, store } = createStore(storage);

const SystemThemeDetector: FC = () => {
  const dispatch = useStoreDispatch();
  const { hasExplicitTheme } = useSliceUserPreferences();

  useLayoutEffect(() => {
    if (!hasExplicitTheme) {
      dispatch(setTheme(detectSystemTheme()));
    }
  }, []); // intentionally empty — runs once on mount after rehydration

  return null;
};

const App: FC = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SystemThemeDetector />
          <ThemedMuiProvider>
            <div>Vite &amp; React</div>
            <ComponentPlaceholder componentName='Users'>
              <Users />
            </ComponentPlaceholder>
            <ThemePlayground />
          </ThemedMuiProvider>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
};

export default App;
