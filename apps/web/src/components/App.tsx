import { type FC, StrictMode } from 'react';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '../reduxStore';

const App: FC = () => {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div>Vite + React</div>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
};

export default App;
