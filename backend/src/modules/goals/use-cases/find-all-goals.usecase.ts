import { Injectable } from "@nestjs/common";
import { GoalRepository } from "../repository/goal-interface.repository";

@Injectable()
export class FindAllGoalsUseCase {
    constructor(private goalRepository: GoalRepository) {}

    async execute() {
        return this.goalRepository.findAllGoals()
    }
}