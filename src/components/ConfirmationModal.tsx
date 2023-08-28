import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  currentModal,
  toggleConfirmationModal,
} from '../redux/features/modalSlice';
import {relapse} from '../redux/features/counterSlice';
 import {changeGoalStreak} from '../redux/features/goalSlice';

function ConfirmationModal(): JSX.Element {
  const dispatch = useDispatch();

  const visible = useSelector(currentModal);

  const handleCancel = () => {
    dispatch(toggleConfirmationModal());
  };

  const handleAccept = () => {
    dispatch(relapse()); // Dispatch the relapse action
     dispatch(changeGoalStreak({goal: 7}));
    dispatch(toggleConfirmationModal());
  };

  return (
    <Modal transparent visible={visible.confirmationOpen}>
      <View style={styles.container}>
        <View style={styles.modalcontainer}>
          <View>
            <Text style={styles.label}>Are you sure?</Text>
          </View>
          <View style={styles.options}>
            <TouchableOpacity style={styles.button} onPress={handleCancel}>
              <Text style={styles.relapseText}>no</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleAccept}>
              <Text style={styles.relapseText}>yes</Text>
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
    height: 100,
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'column',
    justifyContent: "space-around",
    alignItems: "center"
  },
  options: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    gap: 50
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  relapseText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: 'transparent',
 
  },
  label: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
});

export default ConfirmationModal;
