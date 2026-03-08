import { Text, View } from 'react-native';
import Users from '../components/Users';
import { useSpacing } from '../components/useTheme';

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
    </View>
  );
}
