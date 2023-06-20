import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  title: string;
  color: string;
}

const ActionButton: React.FC<Props> = ({ title, color, ...rest }) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: color,
      padding: 15,
      minWidth: 150,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <TouchableOpacity style={styles.button} {...rest}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
