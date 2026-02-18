import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user-interface.repository";
import { User } from "../domain/user.entity";

@Injectable()
export class GetAllUsersUseCase {
    constructor(private userRepository: UserRepository) {}
    async execute(): Promise<User[]> {
        return this.userRepository.getAllUsers()
    }
}