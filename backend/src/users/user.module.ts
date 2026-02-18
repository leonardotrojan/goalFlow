import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserUseCase } from './core/create-user.usecase';
import { PrismaUserRepository } from './repository/user.repository';
import { UserRepository } from './repository/user-interface.repository';
import { GetAllUsersUseCase } from './core/get-all-users.usecase';
import { GetUserByIdUseCase } from './core/get-user-by-id.usecase';
import { UpdateUserUseCase } from './core/update-user.usecase';
import { DeleteUserUseCase } from './core/delete-user.usecase';

@Module({
  controllers: [UserController],
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
})
export class UserModule {}
