import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../domain/user.entity";
import { UserRepository } from "../repository/user-interface.repository";

@Injectable()
export class UpdateUserUseCase {
    constructor (private userRepository: UserRepository) {}

    async execute(
        id: string,
        updateData: { name?: string; password?: string }
    ): Promise<User> {

        const user = await this.userRepository.getById(id)

        if (!user) throw new NotFoundException('User not found')

        if (updateData.name) {
            user.changeName(updateData.name)
        }

        if (updateData.password) {
            user.changePassword(updateData.password)
        }
        
        const updatedUser = await this.userRepository.updateUser(user)

        return updatedUser
    }
}