import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TaskStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import SubTaskScreen from '../screens/SubTaskScreen';

const Stack = createStackNavigator<TaskStackParamList>();

export default function TaskStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      <Stack.Screen name="SubTask" component={SubTaskScreen} />
    </Stack.Navigator>
  );
}
