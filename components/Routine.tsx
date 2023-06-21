import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckButton from './buttons/CheckButton';
import { useDatabase } from '../DatabaseContext';
import {
  completeRoutineById,
  deleteRoutineById,
} from '../controllers/RoutineContoller';
import FailureButton from './buttons/FailureButton';

export type RoutineProps = {
  title: string;
  description: string;
  status: number;
  id: number;
};

const Routine: React.FC<RoutineProps> = ({
  title,
  description,
  id,
  status,
}) => {
  const [expanded, setExpanded] = useState(false);
  const database = useDatabase();
  const navigation = useNavigation();

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const confirmDeleteRoutine = () => {
    Alert.alert(
      'Delete Routine',
      `Are you sure you want to delete "${title}"? routine`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDeleteTask(id),
        },
      ]
    );
  };
  const confirmCompleteRoutine = () => {
    Alert.alert(
      'Finish Task',
      `Are you sure that the "${title}" routine is completed ?`,
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
        await completeRoutineById(id, database);
      }
    } catch (error) {
      console.log('Error completing task:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      if (database) {
        await deleteRoutineById(id, database);
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
          <View style={styles.buttonContainer}>
            {status ? (
              <Text style={styles.status}>Completed</Text>
            ) : (
              <View style={styles.buttonContainer}>
                <CheckButton onPress={confirmCompleteRoutine} />
                <FailureButton onPress={confirmDeleteRoutine} />
              </View>
            )}
          </View>
        </View>
        {expanded && (
          <View>
            <Text style={styles.description}>{description}</Text>
          </View>
        )}
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    marginTop: 8,
  },
  dayStrike: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  pencilContainer: {
    backgroundColor: '#6CD6FF',
    padding: 10,
    borderRadius: 5,
    width: 40,
    height: 40,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default Routine;
