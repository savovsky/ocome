import { type TypedUseSelectorHook, useSelector } from 'react-redux';

import type { StoreState } from '..';

const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default useStoreSelector;
