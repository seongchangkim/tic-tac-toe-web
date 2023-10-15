import {
    Body,
    Controller,
    Param,
    ParseEnumPipe,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpForm } from './dto/sign_up_form.dto';
import { IsSuccess, LoginRes } from './type/auth_common_type';
import { LoginForm } from './dto/login_form.dto';
import { SocialLoginReqForm } from './dto/social_login_req_form.dto';
import { SocialLoginType } from './enum/social_login_type.enum';

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

    @Post('/social-login/:socialLoginType')
    async socialLogin(
        @Body() req: SocialLoginReqForm,
        @Param('socialLoginType', new ParseEnumPipe(SocialLoginType))
        type: SocialLoginType,
    ): Promise<LoginRes> {
        return this.service.socialLogin(type, req);
    }
}
