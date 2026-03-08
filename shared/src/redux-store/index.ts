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
import type { ThemeVariant } from '../types/themeTypes';
import { apiUsers } from './apis/apiUsers';
import { baseApi } from './apis/baseApi';
import { sliceModals } from './slices/sliceModals';
import { sliceTheme } from './slices/sliceTheme';

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
    [sliceTheme.name]: persistReducer(persistConfig(sliceTheme.name), sliceTheme.reducer),
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

export type StoreState = ReturnType<ReturnType<typeof createStore>['store']['getState']>;
export type StoreDispatch = ThunkDispatch<StoreState, any, UnknownAction>;

export { apiUsers };
export { setTheme, resetThemeSlice } from './slices/sliceTheme';
export type { ISliceTheme } from './slices/sliceTheme';

const VALID_THEME_VARIANTS: ReadonlySet<string> = new Set<ThemeVariant>(['light', 'dark', 'cold', 'warm']);

interface ThemeStateLike {
  theme?: { variant?: unknown };
}

const hasThemeVariant = (state: unknown): state is ThemeStateLike => {
  return typeof state === 'object' && state !== null && 'theme' in state;
};

export const selectThemeVariant = (state: unknown): ThemeVariant => {
  const variant = hasThemeVariant(state) ? state.theme?.variant : undefined;
  if (typeof variant === 'string' && VALID_THEME_VARIANTS.has(variant)) {
    return variant as ThemeVariant;
  }
  return 'light';
};
