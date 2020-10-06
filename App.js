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
          initLife={40}
        />
        <LifeTotal
          side='right'
          initLife={40}
        />
      </View>
      <View style={styles.halfContainer}>
        <LifeTotal
          side='left'
          initLife={40}
        />
        <LifeTotal
          side='right'
          initLife={40}
        />
      </View>
    </View>
  );
}

const LifeTotal = ({ side, initLife }) => {
  const [total, setTotal] = useState(initLife)
  const [diff, setDiff] = useState(0)
  let lifeTimer = useRef(null)
  let diffTimer = useRef(null)
  const addOne = () => {
    clearTimeout(diffTimer.current)
    setDiff(prevDiff => prevDiff + 1)
    setTotal(prevTotal => prevTotal + 1)
  }
  const subtractOne = () => {
    clearTimeout(diffTimer.current)
    setDiff(prevDiff => prevDiff - 1)
    setTotal(prevTotal => prevTotal - 1)
  }
  const longAdd = () => {
    clearTimeout(diffTimer.current)
    setTotal(prevTotal => prevTotal + 1)
    setDiff(prevDiff => {
      if(Math.abs(prevDiff) > 30) {
        lifeTimer.current = setTimeout(() => longAdd(), 50)
      } else if(Math.abs(prevDiff) > 15){
        lifeTimer.current = setTimeout(() => longAdd(), 80)
      } else {
        lifeTimer.current = setTimeout(() => longAdd(), 120)
      }
      return prevDiff + 1
    })
  }
  const longSubtract = () => {
    clearTimeout(diffTimer.current)
    setTotal(prevTotal => prevTotal - 1)
    setDiff(prevDiff => {
      if(Math.abs(prevDiff) > 30) {
        lifeTimer.current = setTimeout(() => longSubtract(), 50)
      } else if(Math.abs(prevDiff) > 15){
        lifeTimer.current = setTimeout(() => longSubtract(), 80)
      } else {
        lifeTimer.current = setTimeout(() => longSubtract(), 120)
      }
      return prevDiff - 1
    })
  }
  const stopTimer = () => {
    clearTimeout(lifeTimer.current)
    diffTimer.current = setTimeout(() => setDiff(0), 1800)
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
      <View style={styles.leftDiffView}>
        <Text style={styles.leftDiffText}>{diff > 0 ? '+' : ''}{diff}</Text>
      </View>
    </View>
  ) : (
    <View style={styles.quarterContainer}>
      <View style={styles.rightDiffView}>
        <Text style={styles.rightDiffText}>{diff > 0 ? '+' : ''}{diff}</Text>
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
  rightDiffView: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: '70%'
  },
  leftDiffText: {
    textAlign: 'center',
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
  leftDiffView: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: '40%'
  },
  rightDiffText: {
    textAlign: 'center',
    transform: [
      { rotate: '-90deg' }
    ]
  },
  touchy: {
    fontSize: 48,
    transform: [
      { rotate: '90deg' }
    ]
  },
  invis: {
    display: 'none'
  }
});
