import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AddButton from '../components/buttons/AddButton';
import { ITask } from '../models/task';
import Task from '../components/Task';
import { useDatabase } from '../DatabaseContext';
import { getTasksByDate } from '../controllers/TaskController';

const TasksScreen: React.FC = () => {
  const navigation = useNavigation();
  const database = useDatabase();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  useEffect(() => {
    loadTasksByDate(selectedDate);
  }, [selectedDate]);

  const loadTasksByDate = async (date: Date) => {
    try {
      if (database != null) {
        const tasks = await getTasksByDate(date, database);
        setTasks(tasks);
      }
    } catch (error) {
      console.log('Error retrieving tasks:', error);
    }
  };

  const renderTaskItem = ({ item }: { item: ITask }) => (
    <Task
      title={item.title}
      status={item.status}
      description={item.description}
      id={item.id}
    />
  );

  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisible(false);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleAddNewTask = () => {
    navigation.navigate('AddTask' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
          <Ionicons name="calendar-sharp" size={24} color="black" />
          <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
        </TouchableOpacity>

        {selectedDate.getDate() !== new Date().getDate() && (
          <TouchableOpacity
            onPress={() => setSelectedDate(new Date())}
            style={styles.returnButton}
          >
            <Text style={styles.returnButtonText}>Return to Present</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.sectionTitle}>Tasks</Text>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateSelection}
        onCancel={hideDatePicker}
      />

      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.tasksList}
        ListEmptyComponent={<Text>No tasks found.</Text>}
      />

      <AddButton title="Add New Task" onPress={handleAddNewTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 2,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  tasksList: {
    flexGrow: 1,
  },
  returnButton: {
    backgroundColor: '#6CD6FF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  returnButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TasksScreen;
