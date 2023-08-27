import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const IconButton = ({onPress}: any) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="settings" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
  },
});

export default IconButton;
