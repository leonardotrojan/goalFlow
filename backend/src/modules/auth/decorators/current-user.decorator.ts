import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthUser } from "../types/auth-user.type";

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): AuthUser => {
        const request = context.switchToHttp().getRequest()
        return request.user
    }
)