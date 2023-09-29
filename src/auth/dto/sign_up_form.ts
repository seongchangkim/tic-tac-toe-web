import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    Matches,
    MinLength,
} from 'class-validator';

export class SignUpForm {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Matches(/(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/, {
        message:
            '알파벳 대소문자 및 특수문자 각각 한 글자씩 포함되어야 하고 비밀번호 글자 수가 8자 이상이어야 합니다.',
    })
    @IsNotEmpty({
        message: '비밀번호를 입력해주세요',
    })
    password: string;

    @IsNotEmpty()
    nickname: string;

    @IsPhoneNumber('KR')
    @MinLength(13)
    @IsNotEmpty()
    tel: string;
}
