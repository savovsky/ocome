import useStoreSelector from './useStoreSelector';

/**
 * Provides data from the global state store for slice `modals`
 */
function useSliceModals() {
  const sliceModals = useStoreSelector((state) => state.modals);

  return sliceModals;
}

export default useSliceModals;
