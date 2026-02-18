import { User } from "../domain/user.entity";

export abstract class UserRepository {
    abstract findByEmail(email: string): Promise<User | null>
    abstract createUser(user: User): Promise<void>
    abstract getAllUsers(): Promise<User[]>
    abstract getById(id: string): Promise<User | null>
    abstract updateUser(user: User): Promise<User>
    abstract deleteUser(id: string): Promise<void>
}