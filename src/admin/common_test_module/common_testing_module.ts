import { ArgumentMetadata } from '@nestjs/common/interfaces';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { UserEditReqDto } from '../user_edit.dto';

interface ReqParameter {
    nickname: string;
    tel: string;
    profileUrl: undefined;
}

// 회원가입 테스트 케이스 전용 메서드
export const editUserValidationTest = async (
    req: ReqParameter,
    testText: string[] | string,
    cb: ((value: string) => boolean) | null,
) => {
    const metatype: ArgumentMetadata = {
        type: 'body',
        metatype: UserEditReqDto,
        data: '',
    };

    await new ValidationPipe({
        transform: true,
        whitelist: true,
    })
        .transform(<UserEditReqDto>req, metatype)
        .then(() => {
            throw new HttpException(
                {
                    message: '테스트 실패',
                },
                400,
            );
        })
        .catch((err) => {
            expect(
                cb === null
                    ? err.getResponse().message
                    : err.getResponse().message.filter(cb),
            ).toEqual(testText);
        });
};

export const editUserValidationFirstErrorMessageTest = async (
    req: ReqParameter,
    testText: string,
) => {
    const metatype: ArgumentMetadata = {
        type: 'body',
        metatype: UserEditReqDto,
        data: '',
    };

    await new ValidationPipe({
        transform: true,
        whitelist: true,
    })
        .transform(<UserEditReqDto>req, metatype)
        .then(() => {
            throw new HttpException(
                {
                    message: '테스트 실패',
                },
                400,
            );
        })
        .catch((err) => {
            expect(err.getResponse().message[0]).toEqual(testText);
        });
};