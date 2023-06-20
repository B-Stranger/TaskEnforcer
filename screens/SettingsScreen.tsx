import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  setNotificationStatus,
  getNotificationStatus,
  setNotificationTime,
  getNotificationTime,
  deleteHistory,
} from '../controllers/SettingsController';
import ActionButton from '../components/buttons/ActionButton';
import { useDatabase } from '../DatabaseContext';

const SettingsScreen: React.FC = () => {
  const database = useDatabase();
  const [notifSound, setNotifSound] = useState(false);
  const [dailyNotifTime, setDailyNotifTime] = useState('');
  const [dailyChooser, setDailyChooser] = useState(false);

  useEffect(() => {
    loadNotificationSettings();
  }, []);

  const loadNotificationSettings = async () => {
    const status = await getNotificationStatus();
    const time = await getNotificationTime();
    setNotifSound(status === 1);
    setDailyNotifTime(time);
  };

  const toggleNotificationSound = async () => {
    const status = notifSound ? 0 : 1;
    setNotifSound(!notifSound);
    await setNotificationStatus(status);
  };

  const handleDeleteHistory = () => {
    if (database) {
      deleteHistory(database);
    }
  };

  const handleTimeChange = (event: any, selectedTime: any) => {
    if (selectedTime) {
      const currentTime = selectedTime || dailyNotifTime;
      setDailyNotifTime(currentTime);
      setDailyChooser(false);
      setNotificationTime(
        currentTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    }
  };

  const confirmDeleteHistory = () => {
    Alert.alert(
      'Delete History',
      'Are you sure that you want to delete history?\nThis action is irreversible!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: handleDeleteHistory },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Settings</Text>

      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>Provide notifications</Text>
        <Switch value={notifSound} onValueChange={toggleNotificationSound} />
      </View>

      <View style={styles.notificationContainer}>
        <Text style={styles.notificationTitle}>Time For Notification:</Text>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => setDailyChooser(!dailyChooser)}
        >
          <Ionicons name="time-outline" size={24} color="black" />
          <Text style={styles.notificationButtonText}>
            {dailyNotifTime ? dailyNotifTime : 'Set Time'}
          </Text>
        </TouchableOpacity>
        {dailyChooser && (
          <DateTimePicker
            value={new Date(dailyNotifTime)}
            mode="time"
            display="spinner"
            onChange={handleTimeChange}
          />
        )}
      </View>

      <View style={styles.deleteButton}>
        <ActionButton
          color="red"
          title="Delete History"
          onPress={confirmDeleteHistory}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  deleteButton: {
    width: '50%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionText: {
    fontSize: 18,
    flex: 1,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  notificationTitle: {
    fontSize: 18,
    flex: 1,
  },
  notificationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  notificationButtonText: {
    marginLeft: 8,
  },
});

export default SettingsScreen;
