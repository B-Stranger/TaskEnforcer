import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
  const navigation = useNavigation();
  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back!</Text>

      <View style={styles.squareContainer}>
        <TouchableOpacity
          style={[styles.square, styles.tasksSquare]}
          onPress={() => navigateToScreen('Tasks')}
        >
          <Text style={styles.squareText}>Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.square, styles.routinesSquare]}
          onPress={() => navigateToScreen('Routines')}
        >
          <Text style={styles.squareText}>Routines</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.square, styles.statisticsSquare]}
          onPress={() => navigateToScreen('Statistics')}
        >
          <Text style={styles.squareText}>Statistics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.square, styles.settingsSquare]}
          onPress={() => navigateToScreen('Settings')}
        >
          <Text style={styles.squareText}>Settings</Text>
        </TouchableOpacity>
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  squareContainer: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  square: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  settingsSquare: {
    backgroundColor: '#FF9A8B',
  },
  tasksSquare: {
    backgroundColor: '#6CD6FF',
  },
  routinesSquare: {
    backgroundColor: '#FFC0CB',
  },
  statisticsSquare: {
    backgroundColor: '#74C69D',
  },
  dailySquare: {
    backgroundColor: '#800080',
  },
  weeklySquare: {
    backgroundColor: '#00FFFF',
  },
});

export default MenuScreen;
