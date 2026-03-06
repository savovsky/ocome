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

import { apiUsers } from './apis/apiUsers';
import { baseApi } from './apis/baseApi';
import { sliceModals } from './slices/sliceModals';

export const createStore = (
  storage: any,
): { store: ReturnType<typeof configureStore>; persistor: ReturnType<typeof persistStore> } => {
  const persistConfig = (key: string): { key: string; storage: any } => {
    return {
      key,
      storage,
    };
  };

  const reducer = {
    [sliceModals.name]: persistReducer(persistConfig(sliceModals.name), sliceModals.reducer),
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

export type StoreState = ReturnType<typeof createStore>['store']['getState'];
export type StoreDispatch = ThunkDispatch<StoreState, any, UnknownAction>;

export { apiUsers };
