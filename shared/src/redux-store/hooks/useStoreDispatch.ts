import { useDispatch } from 'react-redux';
import type { StoreDispatch } from '..';

const useStoreDispatch: () => StoreDispatch = useDispatch;

export default useStoreDispatch;
