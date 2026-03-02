import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { PrismaUserRepository } from './repository/user.repository';
import { UserRepository } from './repository/user-interface.repository';
import { GetAllUsersUseCase } from './use-cases/get-all-users.usecase';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.usecase';
import { UpdateUserUseCase } from './use-cases/update-user.usecase';
import { DeleteUserUseCase } from './use-cases/delete-user.usecase';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserController],
  imports: [forwardRef(() => AuthModule)],
  providers: [
    PrismaService,
    CreateUserUseCase,
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    }
  ],
  exports: [UserRepository]
})
export class UserModule {}
