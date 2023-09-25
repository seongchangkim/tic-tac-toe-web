import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpFormDTO } from './dto/sign-up-form-dto';

interface IsSucessType {
    success: boolean 
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/sign-up')
    async signUp(
        @Body(ValidationPipe) req: SignUpFormDTO
    ): Promise<IsSucessType>{
        const success = await this.authService.signUp(req);
        return {
            success
        };
    }
}
