import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { AuthUser } from './types/auth-user.type';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(
        @Body() body: { email: string, password: string },
    ) {
        return this.authService.login(body.email, body.password)
    }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    getMe(@CurrentUser() user: AuthUser) {
        return user
    }
}
