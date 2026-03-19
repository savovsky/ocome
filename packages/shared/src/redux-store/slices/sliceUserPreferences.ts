import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { keysLanguage } from '@ocome/shared/keys/keysLanguage';
import { keysTheme } from '@ocome/shared/keys/keysTheme';
import type { ITheme } from '../../types/themeTypes';
import type { ILanguage } from '../../types/typesCommon';

const { THEME_LIGHT } = keysTheme;
const { ENG } = keysLanguage;

export interface ISlice {
  theme: ITheme;
  language: ILanguage;
  hasExplicitTheme: boolean;
}

const initialState: ISlice = {
  theme: THEME_LIGHT,
  language: ENG,
  hasExplicitTheme: false,
};

export const sliceUserPreferences = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setTheme(state: ISlice, action: PayloadAction<ITheme>) {
      state.theme = action.payload;
    },

    setExplicitTheme(state: ISlice, action: PayloadAction<ITheme>) {
      state.theme = action.payload;
      state.hasExplicitTheme = true;
    },

    setLanguage(state: ISlice, action: PayloadAction<ILanguage>) {
      state.language = action.payload;
    },

    resetUserPreferences: () => {
      return initialState;
    },
  },
});

export const { setTheme, setExplicitTheme, setLanguage, resetUserPreferences } = sliceUserPreferences.actions;
