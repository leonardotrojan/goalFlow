import { Module } from '@nestjs/common';
import { GoalController } from './goal.controller';
import { PrismaService } from 'src/database/prisma.service';
import { GoalRepository } from './repository/goal-interface.repository';
import { PrismaGoalRepository } from './repository/goal.repository';
import { CreateGoalUseCase } from './use-cases/create-goal.usecase';
import { UserRepository } from '../users/repository/user-interface.repository';
import { PrismaUserRepository } from '../users/repository/user.repository';
import { FindAllGoalsUseCase } from './use-cases/find-all-goals.usecase';
import { FindGoalByIdUseCase } from './use-cases/find-goal-by-id.usecase';
import { FindGoalByUserIdUseCase } from './use-cases/find-goal-by-user-id.usecase';
import { UpdateGoalUseCase } from './use-cases/update-goal.usecase';
import { DeleteGoalUseCase } from './use-cases/delete-goal.usecase';

@Module({
  controllers: [GoalController],
  providers: [
    PrismaService,
    CreateGoalUseCase,
    FindAllGoalsUseCase,
    FindGoalByIdUseCase,
    FindGoalByUserIdUseCase,
    UpdateGoalUseCase,
    DeleteGoalUseCase,
  {
    provide: GoalRepository,
    useClass: PrismaGoalRepository
  },
  {
    provide: UserRepository,
    useClass: PrismaUserRepository
  }]
})
export class GoalModule {}
