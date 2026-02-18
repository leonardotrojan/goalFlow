import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { UserModule } from './modules/users/user.module';
import { GoalModule } from './modules/goals/goal.module';

@Module({
  imports: [PrismaModule, UserModule, GoalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
