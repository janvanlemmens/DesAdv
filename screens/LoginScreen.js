import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Realm from "realm";


export default function LoginScreen({ onLogin }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  

  const handleLogin = async () => {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

      if (!username || !password) {
      Alert.alert('Missing Fields', 'Please enter both username and password');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(apiUrl+"/rest.desadv.cls?func=login", {
        user : username,
        password: password
      },
        {
           headers: {
             "Content-Type": "application/json",
            },
          });

      // Assume response contains { success: true } if login is valid
      
      if (response.data.success) {
        await SecureStore.setItemAsync("depot",response.data.depot)
        onLogin(); // navigate to the main app
      } else {
        Alert.alert('Login Failed', response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Server error or network issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 32, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 10, borderRadius: 5 },
});