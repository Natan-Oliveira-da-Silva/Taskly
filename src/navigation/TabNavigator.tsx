import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function getTabBarIcon(routeName: string) {
  return ({ color, size }: { color: string; size: number }) => {
    let iconName: string;

    switch (routeName) {
      case 'Clipboard':
        iconName = 'clipboard-list-outline';
        break;
      case 'Notifications':
        iconName = 'bell-outline';
        break;
      case 'Menu':
        iconName = 'menu';
        break;
      default:
        iconName = 'help-circle-outline';
    }

    return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
  };
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#5B3CC4',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          paddingVertical: 8,
          height: 60,
        },
        tabBarIcon: getTabBarIcon(route.name),
      })}
    >
      <Tab.Screen name="Clipboard" component={HomePage} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
    </Tab.Navigator>
  );
} 


