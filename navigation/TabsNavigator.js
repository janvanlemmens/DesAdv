import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OverzichtScreen from '../screens/OverzichtScreen';
import CreatieScreen from '../screens/CreatieScreen';
import BonScreen from '../screens/BonScreen';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Overzicht" component={OverzichtScreen} />
      <Tab.Screen name="Creatie" component={CreatieScreen} />
      <Tab.Screen name="Bon" component={BonScreen} />
    </Tab.Navigator>
  );
}