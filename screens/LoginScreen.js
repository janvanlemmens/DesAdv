import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, StyleSheet, Alert, ActivityIndicator, Platform } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Realm from "realm";
import CustomPressable from '../components/CustomPressable';
import DeviceInfo from 'react-native-device-info';


export default function LoginScreen({ onLogin }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState('')

  useEffect(() => {
    const logDevice = async () => {
      const brand = DeviceInfo.getBrand();
      const model = DeviceInfo.getModel();
      const systemName = DeviceInfo.getSystemName();
      const systemVersion = DeviceInfo.getSystemVersion();
      setBrand(brand)

      console.log(`Running on: ${brand} ${model} (${systemName} ${systemVersion})`);
      //Running on: unitech EA520 (Android 11)
      //npx react-native run-android => new android/app/build/outputs/apk/debug/app-debug.apk
      //cd android ./gradlew assembleRelease
      //adb install android/app/build/outputs/apk/release/app-release.apk
    };

    logDevice(); // ✅ actually run it
  }, []);

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
        await SecureStore.setItemAsync("brand",brand)
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
     
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <View style={styles.form}>
       <Text style={styles.title}>Despatch Advice</Text>
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
        <CustomPressable
              text="Login"
              borderRadius={18}
              hoverColor="#0EA371" // only on web
              onPress={handleLogin}
            />
      )}
      </View>
    </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 32, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 10, borderRadius: 5 },
  form: {
    flex:1,
    justifyContent: "center",
    padding: 16
  }
});