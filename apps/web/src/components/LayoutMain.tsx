import type { FC } from 'react';
import { Stack } from '@mui/material';
import ComponentPlaceholder from './ComponentPlaceholder';
import ThemePlayground from './ThemePlayground';
import Users from './Users';

const LayoutMain: FC = () => {
  return (
    <Stack spacing={3} sx={{ p: 3 }}>
      <ComponentPlaceholder componentName='Users'>
        <Users />
      </ComponentPlaceholder>
      <ThemePlayground />
    </Stack>
  );
};

export default LayoutMain;
