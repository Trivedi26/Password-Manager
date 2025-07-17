import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 🔽 Inline type definition here
type RootStackParamList = {
  'Lock': undefined;
  'PIN Vault': undefined;
  'Add PIN': undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PIN Vault'>;

interface PinItem {
  id: string;
  title: string;
  value: string;
}

export default function HomeScreen() {
  const [pins, setPins] = useState<PinItem[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();

  const loadPins = async () => {
    const data = await SecureStore.getItemAsync('pins');
    if (data) setPins(JSON.parse(data));
  };

  useEffect(() => {
    if (isFocused) loadPins();
  }, [isFocused]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Add New PIN" onPress={() => navigation.navigate('Add PIN')} />
      <FlatList
        data={pins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 16 }}>
              {item.title}: {item.value}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
