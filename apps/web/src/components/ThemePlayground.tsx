import { type FC, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { keysTheme } from '@ocome/shared/keys/keysTheme';
import { getContrastTextColor, getTheme } from '@ocome/shared/theme/themeUtils';
import type { ITheme } from '@ocome/shared/types/themeTypes';

const ALL_THEMES = 'ALL' as const;

function renderThemeColorGrid(themeKey: ITheme) {
  const theme = getTheme(themeKey);
  const colorEntries = Object.entries(theme.colors);

  return (
    <Box key={themeKey} sx={{ mb: 4 }}>
      <Typography variant='h5' sx={{ mb: 2, fontWeight: 600 }}>
        {themeKey}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 2,
        }}
      >
        {colorEntries.map(([tokenName, colorValue]) => {
          const textColor = getContrastTextColor(colorValue);

          return (
            <Box
              key={tokenName}
              sx={{
                backgroundColor: colorValue,
                color: textColor,
                borderRadius: `${theme.radii.md}px`,
                border: `1px solid ${theme.colors.border}`,
                p: 2,
                minHeight: 110,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant='subtitle2' sx={{ fontWeight: 700 }}>
                {tokenName}
              </Typography>
              <Typography variant='body2'>{colorValue}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

const ThemePlayground: FC = () => {
  const [selectedView, setSelectedView] = useState<ITheme | typeof ALL_THEMES>(keysTheme.THEME_LIGHT);

  const themeKeys = [keysTheme.THEME_LIGHT, keysTheme.THEME_DARK, keysTheme.THEME_COLD, keysTheme.THEME_WARM];

  const themesToDisplay = selectedView === ALL_THEMES ? themeKeys : [selectedView];

  return (
    <Box data-testid='theme-playground' sx={{ p: 2 }}>
      <Typography variant='h4' gutterBottom>
        Theme Playground
      </Typography>

      <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
        {themeKeys.map((themeKey) => (
          <Button
            key={themeKey}
            variant={selectedView === themeKey ? 'contained' : 'outlined'}
            onClick={() => setSelectedView(themeKey)}
          >
            {themeKey.replace('THEME_', '')}
          </Button>
        ))}
        <Button
          variant={selectedView === ALL_THEMES ? 'contained' : 'outlined'}
          onClick={() => setSelectedView(ALL_THEMES)}
        >
          ALL
        </Button>
      </Stack>

      <Box>{themesToDisplay.map(renderThemeColorGrid)}</Box>
    </Box>
  );
};

export default ThemePlayground;
