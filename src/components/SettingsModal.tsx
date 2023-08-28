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
import {currentGoalStreak, customGoal} from '../redux/features/goalSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import {
  changeStartDate,
  currentStartDate,
} from '../redux/features/counterSlice';
import {currentModal, toggleSettingModal} from '../redux/features/modalSlice';
import moment from 'moment';
import { hideNavigationBar } from 'react-native-navigation-bar-color';
 
function SettingsModal(): JSX.Element {

 
  
  const [newDate, setNewDate] = useState(new Date());
  const [newTime, setNewTime] = useState(new Date());

  const [pickerMode, setPickerMode] = useState('date');
  const [timeShow, setTimeShow] = useState(false);
  const [dateShow, setDateShow] = useState(false);

  const [textDate, setTextDate] = useState('Empty');
  const [textTime, setTextTime] = useState('Empty');

  const visible = useSelector(currentModal);

  const [goalValue, setGoalValue] = useState('');

  const currentStartDateState = useSelector(currentStartDate);
  const [stateDate, setStateDate] = useState(
    currentStartDateState || new Date(),
  );

  useEffect(() => {
    setStateDate(currentStartDateState);
  }, [currentStartDateState]);

  const currentGoal = useSelector(currentGoalStreak);
  const dispatch = useDispatch();

  const formatDate = () => {
    const year = newDate.getFullYear().toString();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    // Months are zero-indexed, so add 1
    const day = newDate.getDate().toString().padStart(2, '0');

    return day + '/' + month + '/' + year;
  };

  const formatTime = () => {
    const hours = newTime.getHours().toString().padStart(2, '0');
    const minutes = newTime.getMinutes().toString().padStart(2, '0');

    return hours + ':' + minutes;
  };

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

    let diff = moment(new Date()).diff(moment(mergedDate), 'days');
     dispatch(customGoal({goalDays: diff}));

    dispatch(toggleSettingModal());
  };

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
    <Modal transparent visible={visible.settingOpen}>
      <View style={styles.container}>
        <View style={styles.modalcontainer}>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                dispatch(toggleSettingModal());
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
                  <View style={styles.picker}>
                    <Text style={styles.label}>{formatDate()}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{}}
                  onPress={() => {
                    showMode('time');
                  }}>
                  <View style={styles.picker}>
                    <Text style={styles.label}>{formatTime()}</Text>
                  </View>
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
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.relapseText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalcontainer: {
    padding: 8,
    backgroundColor: 'black',
    width: 300,
    borderRadius: 20,
    height: 150,
    borderWidth: 1,
    borderColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 5,
    right: 10
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
    alignItems: 'flex-end',
  },

  picker: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
});

export default SettingsModal;
