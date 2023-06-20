import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CheckButton from './buttons/CheckButton';
import FailureButton from './buttons/FailureButton';
import {
  completeTaskById,
  deleteTaskById,
} from '../controllers/TaskController';
import { useDatabase } from '../DatabaseContext';
import { useNavigation } from '@react-navigation/native';
type TaskProps = {
  status: boolean;
  title: string;
  description: string;
  id: number;
};

const Task: React.FC<TaskProps> = ({ title, description, status, id }) => {
  const [expanded, setExpanded] = useState(false);
  const database = useDatabase();
  const navigation = useNavigation();

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const confirmDeleteTask = () => {
    Alert.alert('Delete Task', `Are you sure you want to delete "${title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => handleDeleteTask(id),
      },
    ]);
  };
  const confirmCompleteTask = () => {
    Alert.alert(
      'Finish Task',
      `Are you sure that the "${title}" task is completed ?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Complete',
          style: 'default',
          onPress: () => handleCompleteTask(id),
        },
      ]
    );
  };

  const handleCompleteTask = async (id: number) => {
    try {
      if (database) {
        await completeTaskById(id, database).then(() => {
          navigation.navigate('Tasks' as never);
        });
      }
    } catch (error) {
      console.log('Error completing task:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      if (database) {
        await deleteTaskById(id, database);
      }
    } catch (error) {
      console.log('Error deleting task:', error);
    }
  };

  return (
    <View style={status ? styles.containerCompleted : styles.container}>
      <TouchableOpacity onPress={toggleExpansion}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {status ? (
            <Text style={styles.status}>Completed</Text>
          ) : (
            <View style={styles.buttonContainer}>
              <CheckButton onPress={confirmCompleteTask} />
              <FailureButton onPress={confirmDeleteTask} />
            </View>
          )}
        </View>
        <View>
          {expanded && <Text style={styles.description}>{description}</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  containerCompleted: {
    backgroundColor: 'green',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  description: {
    fontSize: 14,
    margin: 20,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Task;
