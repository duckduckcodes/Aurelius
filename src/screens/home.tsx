import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconButton from '../components/IconButton';
import Counter from '../components/Counter';
import {useDispatch, useSelector} from 'react-redux';
import {currentGoalStreak} from '../redux/features/goalSlice';
import {currentStreak, resetStreak} from '../redux/features/streakSlice';
import {currentStartDate, relapse} from '../redux/features/counterSlice';
import {CounterDate} from '../data';
import SettingsModal from '../components/SettingsModal';

function Home(): JSX.Element {
  const currentGoal = useSelector(currentGoalStreak);
  const streak = useSelector(currentStreak);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const handleButtonPress = () => {
    setVisible(true);
  };

  const handleRelapse = () => {
    dispatch(relapse()); // Dispatch the relapse action
    dispatch(resetStreak());
  };

  return (
    <SafeAreaView style={{backgroundColor: 'black', height: '100%'}}>
      <View style={styles.flexContainer}>
        <View style={styles.flexRow}>
          <View>
            <Text style={styles.text}>Goal: {currentGoal.goalStreak} days</Text>
            <Text style={styles.text}>Streak: {streak.currentStreak} days</Text>
          </View>
          <View>
            <IconButton onPress={handleButtonPress} />
          </View>
        </View>
        <Counter />
        <View style={styles.relapseBtn}>
          <TouchableOpacity style={styles.button} onPress={handleRelapse}>
            <Text style={styles.relapseText}>Relapse</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SettingsModal visible={visible} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {color: 'white', fontFamily: 'Poppins-Regular'},
  flexContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  button: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 30,
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  relapseBtn: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
  },
  relapseText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
});

export default Home;
