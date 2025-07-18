import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./app/firebase/firebaseConfig";
import Toast from "react-native-toast-message";

// Auth Screens
import LoginScreen from "./app/auth/LoginScreen";
import SignupScreen from "./app/auth/SignupScreen";

// Main Screens
import VaultScreen from "./app/screens/VaultScreen";
import HomeScreen from "./app/screens/HomeScreen";
import AddPinScreen from "./app/screens/AddPinScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Vault" component={VaultScreen} />
            <Stack.Screen name="PIN Vault" component={HomeScreen} />
            <Stack.Screen name="Add PIN" component={AddPinScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
