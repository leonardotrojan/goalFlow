import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { GoalRepository } from "../repository/goal-interface.repository";

@Injectable()
export class FindGoalByIdUseCase {
    constructor(private goalRepository: GoalRepository) {}

    async execute(id: string, userId: string) {
        const goal = await this.goalRepository.findById(id)

        if (!goal) throw new NotFoundException("Goal not found")

        if (goal.getUserId() !== userId) {
            throw new ForbiddenException('You do not own this goal')
        }

        return goal
    }
}