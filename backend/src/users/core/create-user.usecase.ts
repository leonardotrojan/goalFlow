import { User } from "../domain/user.entity";
import { UserRepository } from "../repository/user-interface.repository";
import { randomUUID } from "crypto";
import * as bcrypt from 'bcrypt'
import { Injectable } from "@nestjs/common";

interface CreateUserRequest {
    name: string
    email: string
    password: string
}

@Injectable()
export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ name, email, password }: CreateUserRequest) {
        
        // verifica email duplicado
        const userAlreadyExists = await this.userRepository.findByEmail(email)

        if (userAlreadyExists) {
            throw new Error('Email already in use')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            id: randomUUID(),
            name,
            email,
            password: hashedPassword
        })

        console.log({ name, email, password });

        await this.userRepository.createUser(user)

        return user
    
    }
}