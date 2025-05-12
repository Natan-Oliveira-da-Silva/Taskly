import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TaskStackParamList } from './types';
import HomePage from '../screens/HomePage';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import EditTaskScreen from '../screens/EditTaskScreen';
import AvatarSelectionScreen from '../screens/AvatarSelectionScreen.tsx';
import ProfileScreen from '../screens/ProfileScreen';
import PreferencesScreen from '../screens/PreferencesScreen.tsx';
import TermsScreen from '../screens/TermsScreen.tsx';
import EditProfileScreen from '../screens/EditProfileScreen.tsx';

const Stack = createStackNavigator<TaskStackParamList>();

export default function TaskStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      <Stack.Screen name="EditTask" component={EditTaskScreen} />
      <Stack.Screen name="AvatarSelectionScreen" component={AvatarSelectionScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
      <Stack.Screen name="TermsScreen" component={TermsScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}

