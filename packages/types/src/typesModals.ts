import { keysModals } from '@ocome/shared';

type ModalKey = keyof typeof keysModals.modalsKeys;
type ModalLayerKey = keyof typeof keysModals.modalsLayersKeys;

export interface IModalDataCommon {
  id: number | string;
}

type IModalData = IModalDataCommon;

export interface IModalLayer {
  type: ModalKey | null;
  data: IModalData | null;
}

export interface IModalOpen {
  type: ModalKey;
  layer?: ModalLayerKey;
  data?: IModalData;
}
