import { configureStore } from '@reduxjs/toolkit';
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
import { apiUsers } from './apis/apiUsers';
import { baseApi } from './apis/baseApi';
import { sliceModals } from './slices/sliceModals';
import { sliceUserPreferences } from './slices/sliceUserPreferences';

export const createStore = (storage: any) => {
  const persistConfig = (key: string): { key: string; storage: any } => {
    return {
      key,
      storage,
    };
  };

  const reducer = {
    [sliceModals.name]: persistReducer(persistConfig(sliceModals.name), sliceModals.reducer),
    [sliceUserPreferences.name]: persistReducer(
      persistConfig(sliceUserPreferences.name),
      sliceUserPreferences.reducer,
    ),
    [baseApi.reducerPath]: baseApi.reducer,
  };

  const middleware = (getDefaultMiddleware: any): any => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware);
  };

  const store = configureStore({ reducer, middleware });
  const persistor = persistStore(store);

  return { store, persistor };
};

// https://react-redux.js.org/using-react-redux/usage-with-typescript
// Infer the `StoreState` and `StoreDispatch` types from the store itself
export type StoreState = ReturnType<ReturnType<typeof createStore>['store']['getState']>;
export type StoreDispatch = ReturnType<typeof createStore>['store']['dispatch'];

// TODO: verify why this export is needed and if it can be removed (there is one baseApi))
export { apiUsers };
