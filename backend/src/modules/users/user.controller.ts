import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { GetAllUsersUseCase } from './use-cases/get-all-users.usecase';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.usecase';
import { UpdateUserUseCase } from './use-cases/update-user.usecase';
import { DeleteUserUseCase } from './use-cases/delete-user.usecase';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UserController {
    constructor(
        private authService: AuthService,
        private createUserUseCase: CreateUserUseCase,
        private getAllUsersUseCase: GetAllUsersUseCase,
        private getUserByIdUseCase: GetUserByIdUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase,
    ) {}

    @Post()
    async create(@Body() body: any) {
        const user = await this.createUserUseCase.execute(body)

        const token = this.authService.generateToken(
            user.getId(),
            user.getEmail(),
        )

        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            createdAt: user.getCreatedAt()
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers() {
        const users = await this.getAllUsersUseCase.execute()
        return users.map(user => ({
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            createdAt: user.getCreatedAt()
        }))
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string) {
        const user = await this.getUserByIdUseCase.execute(id)
        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            createdAt: user.getCreatedAt()
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() body: { name?: string; password?: string }
    ) {
        const user = await this.updateUserUseCase.execute(id, body)

        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            createdAt: user.getCreatedAt()
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        await this.deleteUserUseCase.execute(id)
        return { message: "User deleted sucessfully" }
    }
}
