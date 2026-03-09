import { useDispatch } from 'react-redux';
import type { StoreDispatch } from '..';

// https://react-redux.js.org/using-react-redux/usage-with-typescript
// Use throughout your app instead of plain `useDispatch`
const useStoreDispatch: () => StoreDispatch = useDispatch;

export default useStoreDispatch;
