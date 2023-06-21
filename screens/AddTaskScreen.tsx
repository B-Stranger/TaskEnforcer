import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ActionButton from '../components/buttons/ActionButton';
import { useNavigation } from '@react-navigation/native';
import { INewTask } from '../models/task';
import { createNewTask } from '../controllers/TaskController';
import { useDatabase } from '../DatabaseContext';

const AddTaskScreen: React.FC = () => {
  const navigation = useNavigation();
  const database = useDatabase();
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  );
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleDateSelection = (date: Date) => {
    setSelectedDate(
      date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    );
    setDatePickerVisible(false);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleCancelButton = () => {
    navigation.navigate('Tasks' as never);
  };

  const handleAddTask = async () => {
    if (taskName.trim() === '') {
      alert('Please enter a task name');
      return;
    }

    const newTask: INewTask = {
      title: taskName,
      description: taskDescription,
      date: selectedDate,
    };

    try {
      if (database != null) {
        await createNewTask(newTask, database).then(() => {
          navigation.navigate('Tasks' as never);
        });
      }
    } catch (error) {
      console.log('Error creating task:', error);
    }
  };

  return (
    <View style={styles.popupContainer}>
      <Text style={styles.popupTitle}>Add New Task</Text>

      <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
        <Text style={styles.dateButtonText}>Selected Date: {selectedDate}</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.titleInput}
        placeholder="Task Name"
        value={taskName}
        onChangeText={setTaskName}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Task Description"
        value={taskDescription}
        onChangeText={setTaskDescription}
        multiline
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateSelection}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      />

      <View style={styles.buttonContainer}>
        <ActionButton color="green" title="Add Task" onPress={handleAddTask} />
        <ActionButton color="red" title="Cancel" onPress={handleCancelButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  titleInput: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  textInput: {
    width: '80%',
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingTop: 8,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  dateButton: {
    width: '80%',
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginBottom: 16,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AddTaskScreen;
