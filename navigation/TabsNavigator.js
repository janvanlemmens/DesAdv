import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import OrdersScreen from '../screens/OrdersScreen';
import SearchScreen from '../screens/SearchScreen';
import OrderScreen from '../screens/OrderScreen';
import ScanScreen from '../screens/ScanScreen';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

function withIconTitle(title, iconName) {
  return () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon name={iconName} size={22} style={{ marginRight: 6 }} />
      <Text style={{ fontSize: 18, fontWeight: '600' }}>{title}</Text>
    </View>
  );
}

export default function TabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Group>
        <Tab.Screen
          name="Orders"
          component={OrdersScreen}
          initialParams={{ type: 'nu' }}
          options={{
            headerTitle: withIconTitle('Orders', 'cube-outline'),
            tabBarIcon: ({ color, size }) => (
              <Icon name="cube-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={OrdersScreen}
          initialParams={{ type: 'nietnu' }}
          options={{
            headerTitle: withIconTitle('Search', 'search-outline'),
            tabBarIcon: ({ color, size }) => (
              <Icon name="search-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Order"
          component={OrderScreen}
          initialParams={{ orderid: null }}
          options={{
            headerTitle: withIconTitle('Order', 'create-outline'),
            tabBarIcon: ({ color, size }) => (
              <Icon name="create-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Scan"
          component={ScanScreen}
          options={{
            tabBarButton: () => null,  // hide from the tab bar
            tabBarStyle: { display: 'none' }, // v6/v7 way to hide bar when focused
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
}



/*
/tabBar={(props) => <CustomTabBar {...props} />}
screenOptions={{
        headerTitleAlign: "center",
        tabBarShowLabel: true,
        tabBarStyle: { justifyContent: "space-around" },
      }}
*/