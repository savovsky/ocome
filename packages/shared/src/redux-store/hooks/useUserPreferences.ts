import useStoreSelector from './useStoreSelector';

/**
 * Provides data from the global state store for slice `userPreferences`
 */
function useSliceUserPreferences() {
  const sliceUserPreferences = useStoreSelector((state) => state.userPreferences);

  return sliceUserPreferences;
}

export default useSliceUserPreferences;
