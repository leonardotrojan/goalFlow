import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/repository/user-interface.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.getPassword(),
        )

        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials')
        }

        return this.generateToken(
            user.getId(),
            user.getEmail(),
        )
    }

    generateToken(userId: string, email: string) {
        const payload = {
            sub: userId,
            email,
        }

        const token = this.jwtService.sign(payload)

        return {
            access_token: token
        }
    }
}
