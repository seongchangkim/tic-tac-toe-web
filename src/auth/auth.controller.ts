import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UnauthorizedException,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpForm } from './dto/sign_up_form';
import {
    AuthCheckRes,
    IsSuccess,
    LoginRes,
    RequestWithUser,
} from './type/auth_common_type';
import { LoginForm } from './dto/login_form';
import { AuthGuard } from '@nestjs/passport';

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
        const { accessToken, user, isAuth } = await this.service.login(req);
        return {
            accessToken,
            user,
            isAuth,
        };
    }

    @UseGuards(AuthGuard())
    @Get('/check')
    checkAuth(@Req() req: RequestWithUser): AuthCheckRes {
        if (!req.user) throw new UnauthorizedException('로그인이 필요합니다');

        const { user_id, auth_role, nickname, tel } = req.user;
        return {
            user: {
                userId: user_id,
                nickname,
                tel,
                role: auth_role,
            },
            isAuth: true,
        };
    }
}
