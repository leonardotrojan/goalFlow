import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../domain/user.entity";
import { UserRepository } from "../repository/user-interface.repository";

@Injectable()
export class GetUserByIdUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.getById(id)
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }
}