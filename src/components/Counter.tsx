import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {currentStartDate} from '../redux/features/counterSlice';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {updateStreak} from '../redux/features/streakSlice';

interface Diff {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function Counter(): JSX.Element {
  const startDate = useSelector(currentStartDate);

  const dispatch = useDispatch();

  const [diff, setDiff] = useState<Diff>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateDifference = () => {
    let startDateMoment = moment(startDate.startDate);
    let currentDateMoment = moment(new Date());
    if (currentDateMoment.isAfter(startDateMoment)) {
      let diffInSeconds = currentDateMoment.diff(startDateMoment, 'seconds');
      let diffInMinutes = currentDateMoment.diff(startDateMoment, 'minutes');
      let diffInHours = currentDateMoment.diff(startDateMoment, 'hours');
      let diffInDays = currentDateMoment.diff(startDateMoment, 'days');

      // Use the modulo operator (%) to ensure values stay within their ranges
      diffInSeconds = diffInSeconds % 60;
      diffInMinutes = diffInMinutes % 60;
      diffInHours = diffInHours % 24;
      if (currentDateMoment.diff(startDateMoment, 'days') === 1) {
        dispatch(updateStreak());
      }

      setDiff({
        days: diffInDays,
        hours: diffInHours,
        minutes: diffInMinutes,
        seconds: diffInSeconds,
      });
    } else {
      setDiff({days: 0, hours: 0, minutes: 0, seconds: 0});
    }
  };

  useEffect(() => {
    const interval = setInterval(calculateDifference, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <View>
      <Text style={styles.textStyle}>{diff?.days} days</Text>
      <Text style={styles.textStyle}>{diff?.hours} hours</Text>
      <Text style={styles.textStyle}>{diff?.minutes} minutes</Text>
      <Text style={styles.textStyle}>{diff?.seconds} seconds</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'GoblinOne-Regular',
  },
});

export default Counter;
