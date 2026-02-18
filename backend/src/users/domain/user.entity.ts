export class User {
    private id: string
    private name: string
    private email: string
    private password: string
    private createdAt: Date

    constructor(props: {id: string; name: string; email: string; password: string; createdAt?: Date}) {
        this.id = props.id
        this.name = props.name
        this.email = props.email
        this.password = props.password
        this.createdAt = props.createdAt ?? new Date()

        this.validateEmail()
        this.validatePassword()
    }

    private validateEmail() {
        const emailRegex = /\S+@\S+\.\S+/
        if (!emailRegex.test(this.email)) {
            throw new Error('Invalid email')
        }
    }

    private validatePassword() {
        if(this.password.length < 6) {
            throw new Error('Password must have at least 6 characters')
        }
    }

    changeName(newName: string) {
        this.name = newName
    }

    changePassword(newPassword: string) {
        if (newPassword.length < 6) {
            throw new Error("Password must have at least 6 characters")
        }
        this.password = newPassword
    }

    getId() { return this.id }
    getName() { return this.name }
    getEmail() { return this.email }
    getPassword() { return this.password }
    getCreatedAt() { return this.createdAt }
}