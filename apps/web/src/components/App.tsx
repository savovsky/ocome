import { type FC, StrictMode } from 'react';
import { Provider } from 'react-redux';

import { createStore } from '@ocome/redux-store';

import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import Users from './Users';

const { persistor, store } = createStore(storage);

const App: FC = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div>Vite + React</div>
          <Users />
        </PersistGate>
      </Provider>
    </StrictMode>
  );
};

export default App;
