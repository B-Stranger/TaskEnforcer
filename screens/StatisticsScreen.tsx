import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import { getCompletedTasksCount } from '../controllers/TaskController';
import { useDatabase } from '../DatabaseContext';

const StatisticsScreen = () => {
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const database = useDatabase();

  useEffect(() => {
    fetchCompletedTasksCount();
  }, []);

  const fetchCompletedTasksCount = async () => {
    try {
      if (database) {
        const count = await getCompletedTasksCount(database);
        setCompletedTasksCount(count);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch completed tasks count.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Statistics</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionSubtitle}>
          Number of tasks completed:{' '}
          <Text style={styles.statText}>{completedTasksCount}</Text>
        </Text>
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statText: {
    fontSize: 16,
  },
});

export default StatisticsScreen;
