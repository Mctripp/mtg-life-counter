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
      <View style={styles.bufferView}/>
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
      <View style={styles.leftDiffView}>
        <Text style={styles.leftDiffText}>life thing</Text>
      </View>
    </View>
  ) : (
    <View style={styles.quarterContainer}>
      <View style={styles.rightDiffView}>
        <Text style={styles.rightDiffText}>life thing</Text>
      </View>
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
      <View style={styles.bufferView}/>
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
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    margin: 2,
    flexWrap: 'wrap'
  },
  leftText: {
    fontSize: 64,
    transform: [
      { rotate: '90deg' }
    ]
  },
  leftDiffView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  leftDiffText: {
    textAlign: 'center',
    transform: [
      { rotate: '90deg' }
    ],
    backgroundColor: 'orange'
  },
  rightText: {
    fontSize: 64,
    transform: [
      { rotate: '-90deg' }
    ]
  },
  rightDiffView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  rightDiffText: {
    textAlign: 'center',
    transform: [
      { rotate: '-90deg' }
    ],
    backgroundColor: 'red'
  },
  touchy: {
    fontSize: 48,
    transform: [
      { rotate: '90deg' }
    ]
  },
  bufferView: {
    height: '100%',
    width: '20%'
  }
});
