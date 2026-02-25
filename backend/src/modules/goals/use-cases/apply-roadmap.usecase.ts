import { NotFoundException } from "@nestjs/common";
import { GoalRepository } from "../repository/goal-interface.repository";
import { DailyPlan } from "../domain/daily-plan.entity";

export class ApplyRoadmapUseCase {
    constructor(private goalRepository: GoalRepository) {}

    async execute(input: {
        goalId: string
        minutesPerDay: number
        dailyPlans: { dayNumber: number; focusText: string }[]
    }) {
        const goal = await this.goalRepository.findById(input.goalId)

        if (!goal) {
            throw new NotFoundException("Goal not found")
        }

        const dailyPlanEntities = input.dailyPlans.map(plan =>
            new DailyPlan({
                id: crypto.randomUUID(),
                goalId: goal.getId(),
                dayNumber: plan.dayNumber,
                focusText: plan.focusText
            })
        )

        goal.applyRoadmap(input.minutesPerDay, dailyPlanEntities)

        await this.goalRepository.saveRoadmap(goal)

        return goal
    }
}