import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpForm } from './dto/sign_up_form';

interface IsSuccess {
    success: boolean;
}

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) {}

    @Post('/sign-up')
    async signUp(@Body(ValidationPipe) req: SignUpForm): Promise<IsSuccess> {
        const success = await this.service.signUp(req);

        return {
            success,
        };
    }
}
