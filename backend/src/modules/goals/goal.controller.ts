import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateGoalUseCase } from './use-cases/create-goal.usecase';
import { FindGoalByIdUseCase } from './use-cases/find-goal-by-id.usecase';
import { FindGoalByUserIdUseCase } from './use-cases/find-goal-by-user-id.usecase';
import { UpdateGoalUseCase } from './use-cases/update-goal.usecase';
import { DeleteGoalUseCase } from './use-cases/delete-goal.usecase';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthUser } from '../auth/types/auth-user.type';

@Controller('goals')
export class GoalController {
    constructor(
        private createGoalUseCase: CreateGoalUseCase,
        private findGoalByIdUseCase: FindGoalByIdUseCase,
        private findGoalByUserIdUseCase: FindGoalByUserIdUseCase,
        private updateGoalUseCase: UpdateGoalUseCase,
        private deleteGoalUseCase: DeleteGoalUseCase
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() body: any,
        @CurrentUser() user: AuthUser
    ) {
        return this.createGoalUseCase.execute({
            ...body,
            userId: user.userId
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findMyGoals(
        @Param('id') userId: AuthUser,
        @CurrentUser() user: AuthUser
    ) {
        const goals = await this.findGoalByUserIdUseCase.execute(user.userId)

        return goals.map(goal => ({
            id: goal.getId(),
            name: goal.getName(),
            totalDays: goal.getTotalDays(),
            completedDays: goal.getCompletedDays(),
            status: goal.getStatus(),
            createdAt: goal.getCreatedAt(),
        }))
    }

    @UseGuards(JwtAuthGuard)
    @Get('findOne/:id')
    async findById(
        @Param('id') id: string,
        @CurrentUser() user: AuthUser
    ) {
        return this.findGoalByIdUseCase.execute(id, user.userId)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    async update(
        @Param('id') id: string,
        @Body() body: any,
        @CurrentUser() user: AuthUser
    ) {
        return this.updateGoalUseCase.execute({
            id,
            userId: user.userId,
            name: body.name,
            description: body.description
        })
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async delete(
        @Param("id") id: string,
        @CurrentUser() user: AuthUser
    ) {
        await this.deleteGoalUseCase.execute(id)

        return {
            message: "Goal deleted successfully"
        }
    }

}
