import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DatabaseProvider, useDatabase } from './DatabaseContext';
import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';

import MenuScreen from './screens/MenuScreen';
import TasksScreen from './screens/TasksScreen';
import RoutinesScreen from './screens/RoutinesScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import AddRoutineScreen from './screens/AddRoutineScreen';
import SettingsScreen from './screens/SettingsScreen';
import { getTasksByDate } from './controllers/TaskController';
import { getAllRoutines } from './controllers/RoutineContoller';
import {
  getNotificationStatus,
  getNotificationTime,
} from './controllers/SettingsController';

export default function App() {
  const Stack = createNativeStackNavigator();
  const database = useDatabase();
  const [taskCount, setTaskCount] = useState(0);
  const [routineCount, setRoutineCount] = useState(0);

  const setTasks = async () => {
    if (database) {
      const tasks = await getTasksByDate(
        new Date().toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        database
      );
      setTaskCount(tasks.length);
    }
  };

  const setRoutines = async () => {
    if (database) {
      const routines = await getAllRoutines(database);
      setRoutineCount(routines.length);
    }
  };

  useEffect(() => {
    setTasks();
    setRoutines();
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    // Request permission
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        return;
      }
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    const notificationStatus = await getNotificationStatus();
    if (notificationStatus === 1) {
      const notificationTime = await getNotificationTime();
      const [hours, minutes] = notificationTime.split(':').map(Number);

      const schedulingOptions = {
        content: {
          title: 'Hello, from TaskEnforcer',
          body: `Today you have tasks: ${taskCount} and routines: ${routineCount} to complete`,
        },
        trigger: {
          hour: hours,
          minute: minutes,
          repeats: true,
        },
      };

      await Notifications.scheduleNotificationAsync(schedulingOptions);
    }
  };

  return (
    <DatabaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Routines" component={RoutinesScreen} />
          <Stack.Screen name="Statistics" component={StatisticsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Tasks" component={TasksScreen} />
          <Stack.Screen name="AddTask" component={AddTaskScreen} />
          <Stack.Screen name="AddRoutine" component={AddRoutineScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DatabaseProvider>
  );
}
