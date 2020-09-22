import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.fullContainer}>
      <View style={styles.halfContainer}>
        <LifeTotal/>
        <LifeTotal/>
      </View>
      <View style={styles.halfContainer}>
        <LifeTotal/>
        <LifeTotal/>
      </View>
    </View>
  );
}

const LifeTotal = () => {
  const [total, setTotal] = useState(40)
  const onIncrement = () => {
    setTotal(total + 1)
  }
  const onDecrement = () => {
    setTotal(total - 1)
  }
  return (
    <View style={styles.quarterContainer}>
      <TouchableOpacity
        style={styles.touchy}
        onPress={onIncrement}
      >
        <Icon name="plus" size={20} color="#900" />
      </TouchableOpacity>
      <Text style={styles.text}>{total}</Text>
      <TouchableOpacity
        style={styles.touchy}
        onPress={onDecrement}
      >
        <Icon name="minus" size={20} color="#900" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  halfContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'red'
  },
  quarterContainer: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  text: {
    fontSize: 32
  }
});
