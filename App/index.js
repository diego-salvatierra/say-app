import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from '@rneui/base';

const AwesomeButton = () => (<Button title='Welcome'/>)

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
      <StatusBar style="auto" />
      <AwesomeButton></AwesomeButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
