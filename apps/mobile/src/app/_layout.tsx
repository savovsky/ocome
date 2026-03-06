import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore } from '@ocome/shared/redux-store';

const { persistor, store } = createStore(AsyncStorage);

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack />
      </PersistGate>
    </Provider>
  );
}
