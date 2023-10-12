import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    Matches,
    MinLength,
} from 'class-validator';

export class SignUpForm {
    @IsEmail(undefined, {
        message: '이메일 형식을 맞춰서 입력하세요',
    })
    @IsNotEmpty({
        message: '이메일을 입력하세요',
    })
    email: string;

    @Matches(/(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/, {
        message:
            '알파벳 대소문자 및 특수문자 각각 한 글자씩 포함되어야 하고 비밀번호 글자 수가 8자 이상 입력하세요',
    })
    @IsNotEmpty({
        message: '비밀번호를 입력하세요',
    })
    password: string;

    @IsNotEmpty({
        message: '닉네임을 입력하세요',
    })
    nickname: string;

    @IsPhoneNumber('KR', {
        message: '전화번호 형식을 맞춰서 입력하세요',
    })
    @MinLength(13, {
        message: '입력하고자 전화번호 13자 이상을 입력하세요',
    })
    @IsNotEmpty({
        message: '전화번호를 입력하세요',
    })
    tel: string;
}
