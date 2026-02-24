import { Injectable } from "@nestjs/common";
import { GoalRepository } from "./goal-interface.repository";
import { PrismaService } from "src/database/prisma.service";
import { Goal, GoalStatus } from "../domain/goal.entity";

@Injectable()
export class PrismaGoalRepository extends GoalRepository {
    constructor(private prisma: PrismaService) {
        super()
    }

    async createGoal(goal: Goal): Promise<void> {
        await this.prisma.goal.create({
            data: {
                id: goal.getId(),
                userId: goal.getUserId(),
                name: goal.getName(),
                description: goal.getDescription(),
                totalDays: goal.getTotalDays(),
                completedDays: goal.getCompletedDays(),
                minutesPerDay: goal.getMinutesPerDay(),
                status: goal.getStatus(),
                startDate: goal.getStartDate(),
                createdAt: goal.getCreatedAt(),
            },
        })
    }

    async findById(id: string): Promise<Goal | null> {
        const goal = await this.prisma.goal.findUnique({
            where: {
                id,
            },
            include: {
                dailyPlans: true,
                checkins: true,
            }
        })

        if (!goal) return null

        return new Goal({
            id: goal.id,
            userId: goal.userId,
            name: goal.name,
            description: goal.description,
            totalDays: goal.totalDays,
            minutesPerDay: goal.minutesPerDay,
            completedDays: goal.completedDays,
            status: goal.status as GoalStatus,
            startDate: goal.startDate,
            createdAt: goal.createdAt,
            updatedAt: goal.updatedAt,
        })
    }

    async findByUserId(userId: string): Promise<Goal[]> {
        const goals = await this.prisma.goal.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return goals.map(goal =>
            new Goal({
                id: goal.id,
                userId: goal.userId,
                name: goal.name,
                description: goal.description,
                totalDays: goal.totalDays,
                minutesPerDay: goal.minutesPerDay,
                completedDays: goal.completedDays,
                status: goal.status as GoalStatus,
                startDate: goal.startDate,
                createdAt: goal.createdAt,
                updatedAt: goal.updatedAt,
            })
        )
    }

    async updateGoal(goal: Goal): Promise<Goal> {
        await this.prisma.goal.update({
            where: {
                id: goal.getId()
            },
            data: {
                name: goal.getName(),
                description: goal.getDescription(),
                completedDays: goal.getCompletedDays(),
                status: goal.getStatus(),
                updatedAt: new Date(),
            },
        });

        return goal
    }

    async deleteGoal(id: string): Promise<void> {
        await this.prisma.goal.delete({
            where: {
                id,
            }
        })
    }
}