import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { keysModals } from '../../keys/keysModals';
import { type IModalLayer, type IModalOpen } from '../../types/modals';

const { LAYER_1, LAYER_2 } = keysModals.modalsLayersKeys;

export interface ISliceModals {
  [LAYER_1]: IModalLayer;
  [LAYER_2]: IModalLayer;
}

const initialState: ISliceModals = {
  [LAYER_1]: {
    type: null,
    data: null,
  },
  [LAYER_2]: {
    type: null,
    data: null,
  },
};

export const sliceModals = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal(state: ISliceModals, action: PayloadAction<IModalOpen>) {
      const { type, layer, data: modalData = null } = action.payload;

      switch (layer) {
        case LAYER_1:
          state[LAYER_1] = { type, data: modalData };
          break;

        case LAYER_2:
          state[LAYER_2] = { type, data: modalData };
          break;

        default:
          state[LAYER_1] = { type, data: modalData };
          break;
      }
    },

    closeModal(state: ISliceModals) {
      if (state[LAYER_2].type) {
        state[LAYER_2] = initialState[LAYER_2];
      } else {
        state[LAYER_1] = initialState[LAYER_1];
      }
    },

    resetModalsSlice: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal, resetModalsSlice } = sliceModals.actions;
