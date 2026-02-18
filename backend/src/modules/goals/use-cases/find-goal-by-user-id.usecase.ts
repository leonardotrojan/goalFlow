import { Injectable, NotFoundException } from "@nestjs/common";
import { GoalRepository } from "../repository/goal-interface.repository";
import { UserRepository } from "src/modules/users/repository/user-interface.repository";

@Injectable()
export class FindGoalByUserIdUseCase {
    constructor(
        private goalRepository: GoalRepository,
        private userRepository: UserRepository
    ) {}

    async execute(userId: string) {
        const user = await this.userRepository.getById(userId)

        if (!user) throw new NotFoundException("User not found")

        return this.goalRepository.findByUserId(userId)
    }
}