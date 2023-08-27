import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {CounterDate, CurrentStreak, GoalSteak, RootState} from '../../data';

// Initial state for the members slice
const initialState: CurrentStreak = {
  currentStreak: 0,
};
const streakSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    resetStreak: state => {
      state.currentStreak = 0;
    },
    customStreak: (state, action: PayloadAction<{streak: number}>) => {
      state.currentStreak = action.payload.streak;
    },
    updateStreak: state => {
      state.currentStreak += 1;
    },
  },
});

export const {resetStreak, updateStreak} = streakSlice.actions;

export const currentStreak = (state: RootState): CurrentStreak => {
  return state.streak;
};

export default streakSlice.reducer;
