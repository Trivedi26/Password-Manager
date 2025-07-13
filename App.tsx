import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LockScreen from './screens/LockScreen';
import AddPinScreen from './screens/AddPinScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lock">
        <Stack.Screen name="Lock" component={LockScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PIN Vault" component={HomeScreen} />
        <Stack.Screen name="Add PIN" component={AddPinScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
