import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';

export default function AddPinScreen() {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const navigation = useNavigation<any>();

  const savePin = async () => {
    if (!title || !value) {
      Alert.alert('Missing Fields', 'Both fields are required.');
      return;
    }

    const pinsStr = await SecureStore.getItemAsync('pins');
    const pins = pinsStr ? JSON.parse(pinsStr) : [];

    const newPin = { id: uuidv4(), title, value };
    pins.push(newPin);

    await SecureStore.setItemAsync('pins', JSON.stringify(pins));
    Alert.alert('Saved', 'PIN saved successfully!');
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="PIN Title (e.g., ATM)"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="PIN Number"
        value={value}
        onChangeText={setValue}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Save PIN" onPress={savePin} />
    </View>
  );
}
