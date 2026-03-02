import { PrismaService } from "../../../database/prisma.service";
import { UserRepository } from "./user-interface.repository";
import { User } from "../domain/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository extends UserRepository {
    constructor(private prisma: PrismaService) {
        super()
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { email }
        })

        if (!user) return null

        return new User({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
        })
    }

    async createUser(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                createdAt: user.getCreatedAt()
            }
        })
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.prisma.user.findMany();

        return users.map(user =>
            new User({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                createdAt: user.createdAt
            })
        );
    }

    async getById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            }
        })

        if (!user) return null

        return new User({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
        })
    }

    async updateUser(user: User): Promise<User> {
        const updated = await this.prisma.user.update({
            where: {
                email: user.getEmail(),
            },
            data: {
                name: user.getName(),
                password: user.getPassword()
            }
        })

        return new User({
            id: updated.id,
            name: updated.name,
            email: updated.email,
            password: updated.password,
            createdAt: updated.createdAt
        })
    }

    async deleteUser(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id,
            }
        })
    }
}