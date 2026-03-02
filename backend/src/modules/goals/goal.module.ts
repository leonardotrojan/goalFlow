import { Module } from '@nestjs/common';
import { GoalController } from './goal.controller';
import { PrismaService } from '../../database/prisma.service';
import { GoalRepository } from './repository/goal-interface.repository';
import { PrismaGoalRepository } from './repository/goal.repository';
import { CreateGoalUseCase } from './use-cases/create-goal.usecase';
import { UserRepository } from '../users/repository/user-interface.repository';
import { PrismaUserRepository } from '../users/repository/user.repository';
import { FindGoalByIdUseCase } from './use-cases/find-goal-by-id.usecase';
import { FindGoalByUserIdUseCase } from './use-cases/find-goal-by-user-id.usecase';
import { UpdateGoalUseCase } from './use-cases/update-goal.usecase';
import { DeleteGoalUseCase } from './use-cases/delete-goal.usecase';
import { RoadmapGeneratorService } from './services/roadmap-generator.service';
import { ApplyRoadmapUseCase } from './use-cases/apply-roadmap.usecase';

@Module({
  controllers: [GoalController],
  providers: [
    RoadmapGeneratorService,
    ApplyRoadmapUseCase,
    PrismaService,
    CreateGoalUseCase,
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
