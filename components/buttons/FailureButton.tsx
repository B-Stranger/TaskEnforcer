import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FailureButton: React.FC<TouchableOpacityProps> = ({ onPress }) => {
  const styles = StyleSheet.create({
    taskButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      borderRadius: 4,
      margin: 4,
      backgroundColor: 'red',
    },
  });

  return (
    <TouchableOpacity style={styles.taskButton} onPress={onPress}>
      <Ionicons name="close" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default FailureButton;
