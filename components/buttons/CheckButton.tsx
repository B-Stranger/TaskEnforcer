import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CheckButton: React.FC<TouchableOpacityProps> = ({ onPress }) => {
  const styles = StyleSheet.create({
    taskButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      borderRadius: 4,
      margin: 4,
    },
    checkButton: {
      backgroundColor: 'green',
    },
  });

  return (
    <TouchableOpacity
      style={[styles.taskButton, styles.checkButton]}
      onPress={onPress}
    >
      <Ionicons name="checkmark" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default CheckButton;
