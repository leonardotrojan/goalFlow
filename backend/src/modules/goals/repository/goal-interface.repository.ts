import { Goal } from "../domain/goal.entity";

export abstract class GoalRepository {
    abstract createGoal(goal: Goal): Promise<void>
    abstract findAllGoals(): Promise<Goal[]>
    abstract findById(id: string): Promise<Goal | null>
    abstract findByUserId(userId: string): Promise<Goal[]>
    abstract updateGoal(goal: Goal): Promise<Goal>
    abstract deleteGoal(id: string): Promise<void>
}