import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Routine from '../components/Routine';
import AddButton from '../components/buttons/AddButton';
import { getAllRoutines } from '../controllers/RoutineContoller';
import { IRoutine } from '../models/routine';
import { useDatabase } from '../DatabaseContext';

const RoutinesScreen: React.FC = () => {
  const navigation = useNavigation();
  const database = useDatabase();
  const [routines, setRoutines] = useState<IRoutine[]>([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        if (database) {
          const fetchedRoutines = await getAllRoutines(database);
          setRoutines(fetchedRoutines);
        }
      } catch (error) {
        console.log('Error fetching routines:', error);
      }
    };

    fetchRoutines();
  }, []);

  const handleAddNewRoutine = () => {
    navigation.navigate('AddRoutine' as never);
  };

  const renderRoutineItem = ({ item }: { item: IRoutine }) => (
    <Routine
      title={item.title}
      description={item.description}
      status={item.status}
      id={item.id}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Routines</Text>

      <FlatList
        data={routines}
        renderItem={renderRoutineItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.routinesList}
        ListEmptyComponent={<Text>No routines found.</Text>}
      />

      <AddButton title="Add Routine" onPress={handleAddNewRoutine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  routinesList: {
    flexGrow: 1,
    marginTop: 10,
  },
});

export default RoutinesScreen;
