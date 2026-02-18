import { Injectable, NotFoundException } from "@nestjs/common";
import { GoalRepository } from "../repository/goal-interface.repository";

@Injectable()
export class DeleteGoalUseCase {
    constructor(private goalRepository: GoalRepository) {}

    async execute(id: string) {
        const goal = await this.goalRepository.findById(id)

        if (!goal) throw new NotFoundException("Goal not found")

        await this.goalRepository.deleteGoal(id)    
    }   
}