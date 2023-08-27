export interface CounterDate {
  startDate: Date;
 }

export interface CurrentStreak{
    currentStreak: number

}

export interface GoalSteak{
    goalStreak: number,
}
export type RootState = {
  counter: CounterDate;
  goal: GoalSteak,
  streak: CurrentStreak
};
