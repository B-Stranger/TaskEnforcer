import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps,
} from 'react-native';

interface AddButtonProps extends TouchableOpacityProps {
  title: string;
}

const AddButton: React.FC<AddButtonProps> = ({ title, ...rest }) => {
  return (
    <TouchableOpacity style={styles.addButton} {...rest}>
      <Text style={styles.addButtonLabel}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#6CD6FF',
    padding: 16,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonLabel: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddButton;
