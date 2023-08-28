import {createSlice} from '@reduxjs/toolkit';
import { ModalState, RootState} from '../../data';

// Initial state for the members slice
const initialState: ModalState = {
  settingOpen: false,
  confirmationOpen: false
  
};
const modalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    toggleSettingModal: (state) =>{
        state.settingOpen = !state.settingOpen
    },
    toggleConfirmationModal: (state) =>{
        state.confirmationOpen = !state.confirmationOpen
    }
  },
});

export const {toggleSettingModal, toggleConfirmationModal} = modalSlice.actions;

export const currentModal = (state: RootState): ModalState => {
  return state.modal;
};

export default modalSlice.reducer;
