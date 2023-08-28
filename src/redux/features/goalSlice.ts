import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {CounterDate, GoalSteak, RootState} from '../../data';

// Initial state for the members slice
const initialState: GoalSteak = {
  goalStreak: 7,
};
const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    changeGoalStreak: (state, action: PayloadAction<{goal: number}>) => {
      state.goalStreak = action.payload.goal;
    },

    customGoal: (state, action: PayloadAction<{goalDays: number}>) => {
      state.goalStreak = action.payload.goalDays + 7;
    },
    automaticIncrement: state => {
      state.goalStreak += 7;
    },
  },
});

export const {changeGoalStreak, automaticIncrement, customGoal} = goalSlice.actions;

export const currentGoalStreak = (state: RootState): GoalSteak => {
  return state.goal;
};

export default goalSlice.reducer;
