import { Provider } from 'react-redux';
import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore } from '@ocome/shared/redux-store';
import { ThemeProvider } from '../components/ThemeContext';
import { getClerkPublishableKey } from '../utils/utilsCommon';

const { persistor, store } = createStore(AsyncStorage);

export default function RootLayout() {
  const clerkPublishableKey = getClerkPublishableKey();

  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <Stack />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ClerkProvider>
  );
}
