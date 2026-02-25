import { StatusBar } from 'expo-status-bar'
import { View, Text } from 'react-native'

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Welcome to Ocome Mobile</Text>
      <Text style={{ fontSize: 14, color: '#666' }}>React Native + Expo</Text>
      <StatusBar style="auto" />
    </View>
  )
}
