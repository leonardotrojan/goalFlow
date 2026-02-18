import { Injectable, NotFoundException } from "@nestjs/common";
import { GoalRepository } from "../repository/goal-interface.repository";
import { Goal } from "../domain/goal.entity";

interface UpdateGoalDTO {
    id: string
    name?: string
    description?: string
}

@Injectable()
export class UpdateGoalUseCase {
    constructor(private goalRepository: GoalRepository) {}

    async execute(data: UpdateGoalDTO): Promise<Goal> {
        const goal = await this.goalRepository.findById(data.id)

        if (!goal) throw new NotFoundException('Goal not found')

        if (data.name || data.description ) {
            goal.updateDetails(
                data.name ?? goal.getName(),
                data.description ?? goal.getDescription()
            )
        }

        return this.goalRepository.updateGoal(goal)
    }
}