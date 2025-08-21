import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrdersScreen from '../screens/OrdersScreen';
import SearchScreen from '../screens/SearchScreen';
import OrderScreen from '../screens/OrderScreen';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
    </Tab.Navigator>
  );
}