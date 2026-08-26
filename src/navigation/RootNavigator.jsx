import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const RootNavigator = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>KingSystem Root Navigator</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#05050a'
  },
  text: {
    color: '#00ffff',
    fontSize: 16
  }
});

export default RootNavigator;
