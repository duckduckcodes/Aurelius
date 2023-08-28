export interface CounterDate {
  startDate: Date;
 }


export interface ModalState{
  settingOpen: boolean
  confirmationOpen: boolean
}

export interface GoalSteak{
    goalStreak: number,
}
export type RootState = {
  counter: CounterDate,
  goal: GoalSteak,
   modal: ModalState
};
