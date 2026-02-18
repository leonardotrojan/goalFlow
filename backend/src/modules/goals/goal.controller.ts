import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateGoalUseCase } from './use-cases/create-goal.usecase';
import { FindAllGoalsUseCase } from './use-cases/find-all-goals.usecase';
import { FindGoalByIdUseCase } from './use-cases/find-goal-by-id.usecase';
import { FindGoalByUserIdUseCase } from './use-cases/find-goal-by-user-id.usecase';
import { UpdateGoalUseCase } from './use-cases/update-goal.usecase';
import { DeleteGoalUseCase } from './use-cases/delete-goal.usecase';

@Controller('goals')
export class GoalController {
    constructor(
        private createGoalUseCase: CreateGoalUseCase,
        private findAllGoalsUseCase: FindAllGoalsUseCase,
        private findGoalByIdUseCase: FindGoalByIdUseCase,
        private findGoalByUserIdUseCase: FindGoalByUserIdUseCase,
        private updateGoalUseCase: UpdateGoalUseCase,
        private deleteGoalUseCase: DeleteGoalUseCase
    ) {}

    @Post()
    async create(@Body() body: any) {
        const goal = await this.createGoalUseCase.execute(body)

        return {
            id: goal.getId(),
            userId: goal.getUserId(),
            name: goal.getName(),
            description: goal.getDescription(),
            totalDays: goal.getTotalDays(),
            minutesPerDay: goal.getMinutesPerDay(),
            status: goal.getStatus(),
            createdAt: goal.getCreatedAt(),
        }
    }

    @Get()
    async findAll() {
        const goals = await this.findAllGoalsUseCase.execute()

        return goals.map(goal => ({
            id: goal.getId(),
            name: goal.getName(),
            totalDays: goal.getTotalDays(),
            completedDays: goal.getCompletedDays(),
            status: goal.getStatus(),
        })
        )
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const goal = await this.findGoalByIdUseCase.execute(id)

        return {
            id: goal.getId(),
            name: goal.getName(),
            description: goal.getDescription(),
            totalDays: goal.getTotalDays(),
            status: goal.getStatus(),
        }
    }

    @Get("/users/:userId")
    async findByUserId(@Param("userId") userId: string) {
        const goals = await this.findGoalByUserIdUseCase.execute(userId)

        return goals.map(goal => ({
            id: goal.getId(),
            name: goal.getName(),
            totalDays: goal.getTotalDays(),
            completedDays: goal.getCompletedDays(),
            status: goal.getStatus(),
            createdAt: goal.getCreatedAt(),
        }))
    }

    @Patch(":id")
    async update(
        @Param('id') id: string,
        @Body() body: any
    ) {
        const goal = await this.updateGoalUseCase.execute({
            id,
            name: body.name,
            description: body.description,
        })

        return {
            id: goal.getId(),
            name: goal.getName(),
            description: goal.getDescription(),
            minutesPerDay: goal.getMinutesPerDay(),
            status: goal.getStatus(),
        }
    }

    @Delete(":id")
    async delete(@Param("id") id: string) {
        await this.deleteGoalUseCase.execute(id)

        return {
            message: "Goal deleted successfully"
        }
    }

}
