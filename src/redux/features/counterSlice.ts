import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {CounterDate, RootState} from '../../data';
import moment from 'moment';

 

const initialState: CounterDate = {
  startDate: new Date(),
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeStartDate: (state, action: PayloadAction<{date: Date}>) => {
      const currendtDate = moment(new Date());
      const desiredDate = moment(action.payload.date);
      if (desiredDate.isAfter(currendtDate)) {
        state.startDate = new Date();
      } else {
        state.startDate = action.payload.date;
      }
    },
    relapse: state => {
       state.startDate = new Date();
    },
  },
});

export const {changeStartDate, relapse} = counterSlice.actions;

export const currentStartDate = (state: RootState):  Date => {
  return state.counter.startDate;
};

export default counterSlice.reducer;
