import type { FC } from 'react';
import { SignInButton, SignUpButton } from '@clerk/react';
import { Button, Stack, Typography } from '@mui/material';

const SignedOutContent: FC = () => {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      spacing={3}
      sx={{ maxWidth: 520, minHeight: 'calc(100vh - 64px)', mx: 'auto', textAlign: 'center' }}
    >
      <Typography variant='h3'>Ocome</Typography>
      <Typography color='text.secondary'>
        Sign in or create an account to access the current web app shell and keep the session ready for
        upcoming Convex work.
      </Typography>
      <Stack direction='row' spacing={2}>
        <SignInButton mode='modal'>
          <Button variant='contained'>Sign in</Button>
        </SignInButton>
        <SignUpButton mode='modal'>
          <Button variant='outlined'>Sign up</Button>
        </SignUpButton>
      </Stack>
    </Stack>
  );
};

export default SignedOutContent;
