import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { ThemeVariant } from '../../types/themeTypes';

export interface ISliceTheme {
  variant: ThemeVariant;
}

const initialState: ISliceTheme = {
  variant: 'light',
};

export const sliceTheme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state: ISliceTheme, action: PayloadAction<ThemeVariant>) {
      state.variant = action.payload;
    },

    resetThemeSlice: () => {
      return initialState;
    },
  },
});

export const { setTheme, resetThemeSlice } = sliceTheme.actions;
