import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from "react-native-gesture-handler";

import LoginScreen from './screens/LoginScreen';
import TabsNavigator from './navigation/TabsNavigator'; // your existing tab navigation
import { RealmProvider } from "@realm/react";
import { OrdersSchema } from './models/OrdersSchema';

const Stack = createNativeStackNavigator();

function AuthStack({ onLogin }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} onLogin={onLogin} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainApp" component={TabsNavigator} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // <- basic auth state
  const handleLogin = () => setIsLoggedIn(true);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RealmProvider schema={[OrdersSchema]}>
        <NavigationContainer>
          {isLoggedIn ? <AppStack /> : <AuthStack onLogin={handleLogin} />}
        </NavigationContainer>
      </RealmProvider>
    </GestureHandlerRootView>
  );


  /*
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
       <RealmProvider schema={[OrdersSchema]}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} onLogin={handleLogin} />}
          </Stack.Screen>
        ) : (     
          <Stack.Screen name="MainApp" component={TabsNavigator} />     
        )}
      </Stack.Navigator>
       </RealmProvider>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
  */
}
