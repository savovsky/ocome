import { type TypedUseSelectorHook, useSelector } from 'react-redux';
import type { StoreState } from '..';

// https://react-redux.js.org/using-react-redux/usage-with-typescript
// Use throughout your app instead of plain `useSelector`
const useStoreSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default useStoreSelector;
