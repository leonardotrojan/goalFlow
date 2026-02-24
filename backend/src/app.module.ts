import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { UserModule } from './modules/users/user.module';
import { GoalModule } from './modules/goals/goal.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    PrismaModule, 
    UserModule, 
    GoalModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
