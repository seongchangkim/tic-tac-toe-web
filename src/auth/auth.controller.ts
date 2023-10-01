import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpForm } from './dto/sign_up_form';
import { IsSuccess, LoginRes } from './type/auth_common_type';
import { LoginForm } from './dto/login_form';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Post('/sign-up')
    async signUp(@Body(ValidationPipe) req: SignUpForm): Promise<IsSuccess> {
        const { success, errorMessage } = await this.service.signUp(req);

        return {
            success,
            errorMessage,
        };
    }

    @Post('/login')
    async login(@Body(ValidationPipe) req: LoginForm): Promise<LoginRes> {
        const { accessToken } = await this.service.login(req);

        return { accessToken };
    }
}
