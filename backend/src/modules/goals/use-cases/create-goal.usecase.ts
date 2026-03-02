import { Injectable, NotFoundException } from "@nestjs/common";
import { GoalRepository } from "../repository/goal-interface.repository";
import { UserRepository } from "../../users/repository/user-interface.repository";
import { Goal, GoalStatus } from "../domain/goal.entity";
import { randomUUID } from "crypto";
import { ApplyRoadmapUseCase } from "./apply-roadmap.usecase";
import { RoadmapGeneratorService } from "../services/roadmap-generator.service";

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
        private userRepository: UserRepository,
        private applyRoadmapUseCase: ApplyRoadmapUseCase,
        private roadmapGenerator: RoadmapGeneratorService
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
            minutesPerDay: 1,
            status: GoalStatus.IN_PROGRESS,
            dailyPlans: []
        })

        await this.goalRepository.createGoal(goal)

        void this.generateRoadmapAsync(goal)

        return goal
    }

    private async generateRoadmapAsync(goal: Goal) {
        try {

            const roadmap = await this.roadmapGenerator.generate({
                goalName: goal.getName(),
                description: goal.getDescription(),
                totalDays: goal.getTotalDays()
            })

            await this.applyRoadmapUseCase.execute({
                goalId: goal.getId(),
                minutesPerDay: roadmap.minutesPerDay,
                dailyPlans: roadmap.dailyPlans
            })
        } catch (error) {

            goal.markAsFailed()
            await this.goalRepository.updateStatus(goal)
        }
    }
}