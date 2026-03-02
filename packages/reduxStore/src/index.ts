import { type ThunkDispatch, type UnknownAction, configureStore } from '@reduxjs/toolkit';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

import { baseApi } from './apis/baseApi';
import { sliceModals } from './slices/sliceModals';

export const createStore = (storage: any) => {
  const persistConfig = (key: string) => {
    return {
      key,
      storage,
      // blacklist: [],
    };
  };

  const reducer = {
    // Slices
    [sliceModals.name]: persistReducer(persistConfig(sliceModals.name), sliceModals.reducer),

    // APIs
    [baseApi.reducerPath]: baseApi.reducer,
  };

  // GetDefaultMiddleware is not exported from redux toolkit lib
  const middleware = (getDefaultMiddleware: any) => {
    return getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware);
  };

  const store = configureStore({ reducer, middleware });

  // Create a persistor
  const persistor = persistStore(store);

  return { store, persistor };
};

// https://react-redux.js.org/using-react-redux/usage-with-typescript
// Infer the `StoreState` and `StoreDispatch` types from the store itself
export type StoreState = ReturnType<typeof createStore>['store']['getState'];
export type StoreDispatch = ThunkDispatch<StoreState, any, UnknownAction>;

export { apiUsers } from './apis/apiUsers';
