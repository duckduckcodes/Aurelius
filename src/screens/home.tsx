import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconButton from '../components/IconButton';
import Counter from '../components/Counter';
import {useDispatch, useSelector} from 'react-redux';
import {currentGoalStreak} from '../redux/features/goalSlice';

import SettingsModal from '../components/SettingsModal';
import {
  toggleConfirmationModal,
  toggleSettingModal,
} from '../redux/features/modalSlice';
import ConfirmationModal from '../components/ConfirmationModal';

function Home(): JSX.Element {
  const currentGoal = useSelector(currentGoalStreak);
  const dispatch = useDispatch();

  const handleButtonPress = () => {
    dispatch(toggleSettingModal());
  };

  const handleRelapse = () => {
    dispatch(toggleConfirmationModal());
  };

  return (
    <SafeAreaView style={{backgroundColor: 'black', height: '100%'}}>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />

      <View style={styles.flexContainer}>
        <View style={styles.flexRow}>
          <View>
            <Text style={styles.text}>Goal: {currentGoal.goalStreak} days</Text>
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
      <SettingsModal />
      <ConfirmationModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {color: 'white', fontFamily: 'Poppins-Regular', paddingVertical: 12},
  flexContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  button: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 50,
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 30,
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
