import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repository/user-interface.repository";

@Injectable()
export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<void> {
        const user = await this.userRepository.getById(id)

        if (!user) throw new NotFoundException('User not found')

        await this.userRepository.deleteUser(id)
    }
}