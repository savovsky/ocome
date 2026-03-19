declare module 'redux-persist/integration/react' {
  import type { ReactNode } from 'react';
  import type { Persistor } from 'redux-persist';

  interface PersistGateProps {
    persistor: Persistor;
    children?: ReactNode;
    loading?: ReactNode;
    onBeforeLift?: () => void | Promise<void>;
  }

  export const PersistGate: React.ComponentType<PersistGateProps>;
}
