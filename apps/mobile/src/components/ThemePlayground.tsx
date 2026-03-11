import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { keysTheme } from '@ocome/shared/keys/keysTheme';
import { getContrastTextColor, getTheme } from '@ocome/shared/theme/themeUtils';
import type { ITheme } from '@ocome/shared/types/themeTypes';

const ALL_THEMES = 'ALL' as const;

function ThemeColorGrid({ themeKey }: { themeKey: ITheme }) {
  const theme = getTheme(themeKey);
  const colorEntries = Object.entries(theme.colors);

  return (
    <View style={styles.themeSection}>
      <Text style={styles.themeHeading}>{themeKey.replace('THEME_', '')}</Text>
      <View style={styles.colorGrid}>
        {colorEntries.map(([tokenName, colorValue]) => {
          const textColor = getContrastTextColor(colorValue);

          return (
            <View
              key={tokenName}
              style={[
                styles.colorSwatch,
                {
                  backgroundColor: colorValue,
                  borderRadius: theme.radii.md,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Text style={[styles.swatchLabel, { color: textColor }]}>{tokenName}</Text>
              <Text style={[styles.swatchValue, { color: textColor }]}>{colorValue}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const ThemePlayground: FC = () => {
  const [selectedView, setSelectedView] = useState<ITheme | typeof ALL_THEMES>(keysTheme.THEME_LIGHT);

  const themeKeys: ITheme[] = [
    keysTheme.THEME_LIGHT,
    keysTheme.THEME_DARK,
    keysTheme.THEME_COLD,
    keysTheme.THEME_WARM,
  ];

  const themesToDisplay = selectedView === ALL_THEMES ? themeKeys : [selectedView];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Theme Playground</Text>

      <View style={styles.buttonRow}>
        {themeKeys.map((themeKey) => (
          <TouchableOpacity
            key={themeKey}
            style={[styles.button, selectedView === themeKey && styles.buttonActive]}
            onPress={() => setSelectedView(themeKey)}
          >
            <Text style={[styles.buttonText, selectedView === themeKey && styles.buttonTextActive]}>
              {themeKey.replace('THEME_', '')}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.button, selectedView === ALL_THEMES && styles.buttonActive]}
          onPress={() => setSelectedView(ALL_THEMES)}
        >
          <Text style={[styles.buttonText, selectedView === ALL_THEMES && styles.buttonTextActive]}>ALL</Text>
        </TouchableOpacity>
      </View>

      {themesToDisplay.map((themeKey) => (
        <ThemeColorGrid key={themeKey} themeKey={themeKey} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#555',
  },
  buttonActive: {
    backgroundColor: '#555',
  },
  buttonText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  buttonTextActive: {
    color: '#fff',
  },
  themeSection: {
    marginBottom: 32,
  },
  themeHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorSwatch: {
    width: '47%',
    minHeight: 90,
    padding: 12,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  swatchLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  swatchValue: {
    fontSize: 11,
  },
});

export default ThemePlayground;
