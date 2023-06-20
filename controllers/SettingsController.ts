import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const deleteHistory = async (db: SQLite.WebSQLDatabase) => {
  db.transaction((tx) => {
    tx.executeSql('DROP TABLE IF EXISTS Tasks;');
    tx.executeSql('DROP TABLE IF EXISTS Routines;');
  });
};

export const setNotificationStatus = async (status: number): Promise<void> => {
  try {
    await AsyncStorage.setItem('notificationStatus', status.toString());
  } catch (error) {
    console.error('Error setting notification status:', error);
  }
};

export const getNotificationStatus = async (): Promise<number> => {
  try {
    const status = await AsyncStorage.getItem('notificationStatus');
    return status ? parseInt(status) : 0;
  } catch (error) {
    console.error('Error getting notification status:', error);
    return 0;
  }
};

export const setNotificationTime = async (time: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('notificationTime', time);
  } catch (error) {
    console.error('Error setting notification time:', error);
  }
};

export const getNotificationTime = async (): Promise<string> => {
  try {
    const time = await AsyncStorage.getItem('notificationTime');
    return (
      time ||
      new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  } catch (error) {
    console.error('Error getting notification time:', error);
    return '';
  }
};
