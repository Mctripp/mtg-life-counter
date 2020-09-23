import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function App() {
  return (
    <View style={styles.fullContainer}>
      <View style={styles.halfContainer}>
        <LifeTotal
          side='left'
        />
        <LifeTotal
          side='right'
        />
      </View>
      <View style={styles.halfContainer}>
        <LifeTotal
          side='left'
        />
        <LifeTotal
          side='right'
        />
      </View>
    </View>
  );
}

const LifeTotal = ({ side }) => {
  const [total, setTotal] = useState(40)
  let timer = useRef(null)
  const addOne = () => {
    setTotal(prevTotal => prevTotal + 1)
  }
  const subtractOne = () => {
    setTotal(prevTotal => prevTotal - 1)
  }
  const longAdd = () => {
    setTotal(prevTotal => prevTotal + 1)
    timer.current = setTimeout(() => longAdd(), 100)
  }
  const longSubtract = () => {
    setTotal(prevTotal => prevTotal - 1)
    timer.current = setTimeout(() => longSubtract(), 100)
  }
  const stopTimer = () => {
    clearTimeout(timer.current)
    console.log('stopTimer hit')
  }
  return side === 'left' ? (
    <View style={styles.quarterContainer}>
      <Pressable
        onPress={subtractOne}
        onLongPress={longSubtract}
        onPressOut={stopTimer}
      >
        <Icon style={styles.touchy} name="minus" size={20} color="#900" />
      </Pressable>
      <Text style={styles.leftText}>{total}</Text>
      <Pressable
        onPress={addOne}
        onLongPress={longAdd}
        onPressOut={stopTimer}
      >
        <Icon style={styles.touchy} name="plus" size={20} color="#900" />
      </Pressable>
    </View>
  ) : (
    <View style={styles.quarterContainer}>
      <Pressable
        onPress={addOne}
        onLongPress={longAdd}
        onPressOut={stopTimer}
      >
        <Icon style={styles.touchy} name="plus" size={20} color="#900" />
      </Pressable>
      <Text style={styles.rightText}>{total}</Text>
      <Pressable
        onPress={subtractOne}
        onLongPress={longSubtract}
        onPressOut={stopTimer}
      >
        <Icon style={styles.touchy} name="minus" size={20} color="#900" />
      </Pressable>
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
    margin: 2
  },
  leftText: {
    fontSize: 64,
    transform: [
      { rotate: '90deg' }
    ]
  },
  rightText: {
    fontSize: 64,
    transform: [
      { rotate: '-90deg' }
    ]
  },
  touchy: {
    fontSize: 48,
    transform: [
      { rotate: '90deg' }
    ]
  }
});
