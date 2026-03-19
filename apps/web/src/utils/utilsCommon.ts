export const getClerkPublishableKey = (): string => {
  const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!key) {
    throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY');
  }

  return key;
};
