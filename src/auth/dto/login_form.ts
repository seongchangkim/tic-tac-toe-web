import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginForm {
    @IsEmail(undefined, {
        message: '이메일 형식을 맞춰서 입력하세요',
    })
    @IsNotEmpty({
        message: '이메일을 입력하세요',
    })
    email: string;

    @IsNotEmpty({
        message: '비밀번호를 입력하세요',
    })
    password: string;
}
