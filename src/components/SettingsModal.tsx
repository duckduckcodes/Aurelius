import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {currentGoalStreak} from '../redux/features/goalSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import {changeStartDate} from '../redux/features/counterSlice';

function SettingsModal({visible}: any): JSX.Element {
  const currentGoal = useSelector(currentGoalStreak);
  const dispatch = useDispatch();

  const [goalValue, setGoalValue] = useState('');

  const handleTextChange = (inputText: string) => {
    // Filter out non-numeric characters using a regular expression
    const numericText = inputText.replace(/[^0-9]/g, '');
    setGoalValue(numericText);
  };

  const handleSave = () => {
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = newDate.getDate();

    // Extract the time components
    const hours = newTime.getHours();
    const minutes = newTime.getMinutes();
    const seconds = newTime.getSeconds();

    const mergedDate = new Date(year, month - 1, day, hours, minutes, seconds); // Months are zero-indexed
    dispatch(changeStartDate({date: mergedDate}));
    setShowModal(false);
  };
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setShowModal(visible);
  }, [visible]);

  const [newDate, setNewDate] = useState(new Date());
  const [newTime, setNewTime] = useState(new Date());

  const [pickerMode, setPickerMode] = useState('date');
  const [timeShow, setTimeShow] = useState(false);
  const [dateShow, setDateShow] = useState(false);

  const [textDate, setTextDate] = useState('Empty');
  const [textTime, setTextTime] = useState('Empty');

  const showMode = (currentMode: string) => {
    currentMode === 'date' ? setDateShow(true) : setTimeShow(true);
    setPickerMode(currentMode);
  };

  const onDateChange = (event: any, selectDate: any) => {
    const currentDate = selectDate || newDate;
    setDateShow(Platform.OS === 'ios');
    setNewDate(currentDate);
  };

  const onTimeChange = (event: any, selectDate: any) => {
    const currentTime = selectDate || newTime;
    setTimeShow(Platform.OS === 'ios');
    setNewTime(currentTime);
  };

  return (
    <Modal transparent visible={true}>
      <View style={styles.container}>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              setShowModal(false);
            }}>
            <Icon name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <Text style={styles.label}>select a custome date</Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  showMode('date');
                }}>
                <Text style={styles.label}>date</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  showMode('time');
                }}>
                <Text style={styles.label}>time</Text>
              </TouchableOpacity>
            </View>

            {dateShow && (
              <RNDateTimePicker
                testID="dateTime"
                value={newDate}
                mode={pickerMode}
                onChange={onDateChange}
              />
            )}

            {timeShow && (
              <RNDateTimePicker
                testID="dateTime"
                value={newDate}
                mode={pickerMode}
                onChange={onTimeChange}
              />
            )}
          </View>
          <View>
            <Text style={styles.label}>your streak goal</Text>
            <TextInput
              keyboardType="numeric"
              value={goalValue}
              onChangeText={handleTextChange}
              placeholder={currentGoal.goalStreak.toString()}
              placeholderTextColor={'grey'}
              style={styles.inputLabel}
              maxLength={4}
            />

            <Text style={styles.label}>
              date: {textDate}, time: {textTime}
            </Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.relapseText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'black',
    width: 300,
    borderRadius: 20,
    height: 300,
    borderWidth: 1,
    borderColor: 'white',
  },
  button: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 30,
  },
  label: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  inputLabel: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    width: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dateinputLabel: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  relapseText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default SettingsModal;
