import type { FC } from 'react';
import { Show } from '@clerk/react';
import LayoutMain from '../LayoutMain';
import SignedInContent from './SignedInContent';
import SignedOutContent from './SignedOutContent';

const AuthShell: FC = () => {
  return (
    <>
      <Show when='signed-out'>
        <SignedOutContent />
      </Show>

      <Show when='signed-in'>
        <SignedInContent>
          <LayoutMain />
        </SignedInContent>
      </Show>
    </>
  );
};

export default AuthShell;
