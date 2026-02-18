import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserUseCase } from './core/create-user.usecase';
import { GetAllUsersUseCase } from './core/get-all-users.usecase';
import { GetUserByIdUseCase } from './core/get-user-by-id.usecase';
import { UpdateUserUseCase } from './core/update-user.usecase';
import { DeleteUserUseCase } from './core/delete-user.usecase';

@Controller('user')
export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private getAllUsersUseCase: GetAllUsersUseCase,
        private getUserByIdUseCase: GetUserByIdUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase,
    ) {}

    @Post()
    async create(@Body() body: any) {
        const user = await this.createUserUseCase.execute(body)

        return {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            createdAt: user.getCreatedAt()
        }
    }

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

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        await this.deleteUserUseCase.execute(id)
        return { message: "User deleted sucessfully" }
    }
}
