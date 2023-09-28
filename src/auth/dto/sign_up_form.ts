import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

export class SignUpForm {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    nickname: string;

    @IsPhoneNumber('KR')
    @MinLength(13)
    @IsNotEmpty()
    tel: string;
}
