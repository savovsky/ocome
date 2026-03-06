import { type FC, StrictMode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { createStore } from '@ocome/shared/redux-store';
import ComponentPlaceholder from './ComponentPlaceholder';
import Users from './Users';

const { persistor, store } = createStore(storage);

const App: FC = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div>Vite & React</div>
          <ComponentPlaceholder componentName='Users'>
            <Users />
          </ComponentPlaceholder>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
};

export default App;
