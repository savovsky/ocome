import type { CSSProperties, FC, ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { uniqueColorFromString } from '../utils/utilsDebug';

type Props = {
  componentName: string;
  bgColor?: CSSProperties['color'];
  padding?: string;
  children?: ReactElement;
};

// CSS color names: 'orange', 'coral', 'peru', 'olive', 'cornflowerblue', etc.

const ComponentPlaceholder: FC<Props> = ({
  componentName,
  bgColor = uniqueColorFromString(componentName),
  padding = '16px',
  children = null,
}) => {
  return (
    <Box data-testid='component-placeholder' sx={{ padding, borderRadius: '8px', backgroundColor: bgColor }}>
      <Typography variant='body1' color='white'>
        {componentName}
      </Typography>
      {children}
    </Box>
  );
};

export default ComponentPlaceholder;
