import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TaskStackParamList } from './types';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import EditTaskScreen from '../screens/EditTaskScreen';
import AvatarSelectionScreen from '../screens/AvatarSelectionScreen.tsx';
import HomePage from "../screens/HomePage.tsx";

const Stack = createStackNavigator<TaskStackParamList>();

export default function TaskStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      <Stack.Screen name="EditTask" component={EditTaskScreen} />
      <Stack.Screen name="AvatarSelectionScreen" component={AvatarSelectionScreen} />
    </Stack.Navigator>
  );
}
