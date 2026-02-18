import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
