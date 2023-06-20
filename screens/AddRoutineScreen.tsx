import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from '../components/buttons/ActionButton';
import { createNewRoutine } from '../controllers/RoutineContoller';
import { useDatabase } from '../DatabaseContext';

const AddRoutineScreen: React.FC = () => {
  const database = useDatabase();
  const navigation = useNavigation();
  const [routineTitle, setRoutineTitle] = useState('');
  const [routineDescription, setRoutineDescription] = useState('');

  const handleAddRoutine = async () => {
    if (routineTitle.trim() === '') {
      alert('Please enter a routine title');
      return;
    }

    const newRoutine = {
      title: routineTitle,
      description: routineDescription,
    };

    try {
      if (database) {
        const insertedId = await createNewRoutine(newRoutine, database);
        if (insertedId) {
          console.log('New routine created with ID:', insertedId);
          navigation.navigate('Routines' as never);
        }
      }
    } catch (error) {
      console.log('Error creating new routine:', error);
    }
  };

  const handleCancelButton = () => {
    navigation.navigate('Routines' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Routine</Text>
      <TextInput
        style={styles.titleInput}
        placeholder="Routine Title"
        value={routineTitle}
        onChangeText={setRoutineTitle}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Routine Description"
        value={routineDescription}
        onChangeText={setRoutineDescription}
        multiline
      />
      <View style={styles.buttonContainer}>
        <ActionButton
          color="#27ae60"
          title="Add Routine"
          onPress={handleAddRoutine}
        />
        <ActionButton
          color="#ED2939"
          title="Cancel"
          onPress={handleCancelButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  title: {
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
});

export default AddRoutineScreen;
