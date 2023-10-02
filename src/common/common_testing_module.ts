import { ArgumentMetadata } from '@nestjs/common/interfaces';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { SignUpForm } from '../auth/dto/sign_up_form';
import { LoginForm } from '../auth/dto/login_form';

interface ReqParameter {
    email: string;
    password: string;
}

interface SignUpReqParameter extends ReqParameter {
    nickname: string;
    tel: string;
}

// 회원가입 테스트 케이스 전용 메서드
export const signUpValidationTest = async (
    req: SignUpReqParameter,
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

export const signUpValidationFirstErrorMessageTest = async (
    req: SignUpReqParameter,
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

// 로그인 테스트 케이스 전용 메서드
export const loginValidationTest = async (
    req: ReqParameter,
    testText: string[] | string,
    cb: ((value: string) => boolean) | null,
) => {
    const metatype: ArgumentMetadata = {
        type: 'body',
        metatype: LoginForm,
        data: '',
    };

    await new ValidationPipe({
        transform: true,
        whitelist: true,
    })
        .transform(<LoginForm>req, metatype)
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

export const loginValidationFirstErrorMessageTest = async (
    req: ReqParameter,
    testText: string,
) => {
    const metatype: ArgumentMetadata = {
        type: 'body',
        metatype: LoginForm,
        data: '',
    };

    await new ValidationPipe({
        transform: true,
        whitelist: true,
    })
        .transform(<LoginForm>req, metatype)
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
