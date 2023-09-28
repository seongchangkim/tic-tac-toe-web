import { ArgumentMetadata } from '@nestjs/common/interfaces';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { SignUpForm } from '../auth/dto/sign_up_form';

interface ReqParameter {
    email: string;
    password: string;
    nickname: string;
    tel: string;
}

export const validationTest = async (
    req: ReqParameter,
    testText: string[] | string,
    cb: ((value: string) => boolean) | null,
) => {
    const metatype: ArgumentMetadata = {
        type: 'body',
        metatype: SignUpForm,
        data: '',
    };

    await new ValidationPipe({
        transform: true,
        whitelist: true,
    })
        .transform(<SignUpForm>req, metatype)
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

export const validationFirstErrorMessageTest = async (
    req: ReqParameter,
    testText: string,
) => {
    const metatype: ArgumentMetadata = {
        type: 'body',
        metatype: SignUpForm,
        data: '',
    };

    await new ValidationPipe({
        transform: true,
        whitelist: true,
    })
        .transform(<SignUpForm>req, metatype)
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
