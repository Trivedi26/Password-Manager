import React, { useEffect, useCallback } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  'PIN Vault': undefined;
  'Add PIN': undefined;
  Lock: undefined;
};

export default function LockScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const authenticate = useCallback(async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert('Error', 'Biometric authentication is not supported or not set up.');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Unlock PIN Vault',
      fallbackLabel: 'Enter PIN',
    });

    if (result.success) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'PIN Vault' }],
      });
    } else {
      Alert.alert('Failed', 'Authentication failed. Try again.');
    }
  }, [navigation]);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Authenticating...</Text>
      <Button title="Retry" onPress={authenticate} />
    </View>
  );
}
