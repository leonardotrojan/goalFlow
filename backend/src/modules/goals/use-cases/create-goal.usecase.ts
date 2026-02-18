import { Injectable, NotFoundException } from "@nestjs/common";
import { GoalRepository } from "../repository/goal-interface.repository";
import { UserRepository } from "src/modules/users/repository/user-interface.repository";
import { Goal, GoalStatus } from "../domain/goal.entity";
import { randomUUID } from "crypto";

interface CreateGoalDTO {
    userId: string
    name: string
    description: string
    totalDays: number
    minutesPerDay: number
}

@Injectable()
export class CreateGoalUseCase {
    constructor(
        private goalRepository: GoalRepository,
        private userRepository: UserRepository
    ) {}

    async execute(data: CreateGoalDTO): Promise<Goal> {
        const user = await this.userRepository.getById?.(data.userId)

        if (!user) {
            throw new NotFoundException("User not found")
        }

        const goal = new Goal({
            id: randomUUID(),
            userId: data.userId,
            name: data.name,
            description: data.description,
            totalDays: data.totalDays,
            minutesPerDay: data.minutesPerDay,
            status: GoalStatus.IN_PROGRESS,
        })

        await this.goalRepository.createGoal(goal)

        return goal
    }
}