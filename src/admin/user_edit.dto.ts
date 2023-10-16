import { IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';
import { AuthRole } from 'src/auth/enum/auth_role.enum';

export class UserEditReqDto {
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

    authRole: AuthRole;
    profileUrl: string;
}
