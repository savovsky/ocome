import { Text, View } from 'react-native';
import ThemePlayground from '../components/ThemePlayground';
import Users from '../components/Users';
import { useSpacing } from '../hooks/useTheme';

export default function Index() {
  const spacing = useSpacing();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.md,
      }}
    >
      <Text>Edit app/index.tsx to edit this screen</Text>
      <Users />
      <ThemePlayground />
    </View>
  );
}
