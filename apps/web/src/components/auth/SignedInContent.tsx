import type { FC, ReactNode } from 'react';
import { UserButton, useUser } from '@clerk/react';
import { Box, Stack, Typography } from '@mui/material';

type Props = {
  children: ReactNode;
};

const SignedInContent: FC<Props> = ({ children }) => {
  const { user } = useUser();

  return (
    <Stack spacing={3}>
      <Stack alignItems='center' direction='row' justifyContent='space-between' spacing={2}>
        <Box>
          <Typography variant='h4'>Welcome back</Typography>
          <Typography color='text.secondary'>
            Session ready for {user?.primaryEmailAddress?.emailAddress ?? user?.username ?? 'your account'}.
          </Typography>
        </Box>
        <UserButton />
      </Stack>
      {children}
    </Stack>
  );
};

export default SignedInContent;
