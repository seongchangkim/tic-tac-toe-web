import { typeORMConfig } from '../configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpForm } from './dto/sign_up_form.dto';
import {
    ArgumentMetadata,
    HttpException,
    ValidationPipe,
} from '@nestjs/common';
import {
    signUpValidationTest,
    signUpValidationFirstErrorMessageTest,
    loginValidationTest,
    loginValidationFirstErrorMessageTest,
} from './common_test_module/common_testing_module';
import { AuthController } from './auth.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([User]),
            ],
            providers: [AuthService, UserRepository, JwtService],
            controllers: [AuthController],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    // 회원가입 유효성 검사 테스트
    describe('signUp', () => {
        // Unit TEST(단위 테스트)
        // [회원가입] 이메일 형식이 아니고 비밀번호 글자 수가 8자 미만이고 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
        it('[회원가입] - 이메일 형식이 아니고 비밀번호 글자 수가 8자 미만이고 전화번호 글자 수가 13자 미만이고 나머지 입력값이 전부 빈 값임.', async () =>
            await signUpValidationTest(
                {
                    email: 'testtest.com',
                    password: 'test123',
                    nickname: '',
                    tel: '0100000000',
                },
                [
                    '이메일 형식을 맞춰서 입력하세요',
                    '알파벳 대소문자 및 특수문자 각각 한 글자씩 포함되어야 하고 비밀번호 글자 수가 8자 이상 입력하세요',
                    '닉네임을 입력하세요',
                    '입력하고자 전화번호 13자 이상을 입력하세요',
                ],
                (value: string) =>
                    value.indexOf('이메일 형식을 맞춰서 입력하세요') > -1 ||
                    value.indexOf(
                        '알파벳 대소문자 및 특수문자 각각 한 글자씩 포함되어야 하고 비밀번호 글자 수가 8자 이상 입력하세요',
                    ) > -1 ||
                    value.indexOf(
                        '입력하고자 전화번호 13자 이상을 입력하세요',
                    ) > -1 ||
                    value.indexOf('를 입력하세요') > -1 ||
                    value.indexOf('을 입력하세요') > -1,
            ));

        // [회원가입] 이메일 형식이 아니고 비밀번호 글자 수가 8자 미만이고 무효한 전화번호 형식이고 나머지 입력값이 빈 값인지 테스트 케이스
        it('[회원가입] - 이메일 형식이 아니고 비밀번호 글자 수가 8자 미만이고 무효한 전화번호 형식이고 나머지 입력값이 빈 값임.', async () =>
            await signUpValidationTest(
                {
                    email: 'testtest.com',
                    password: 'test123',
                    nickname: '',
                    tel: '0000000',
                },
                [
                    '이메일 형식을 맞춰서 입력하세요',
                    '알파벳 대소문자 및 특수문자 각각 한 글자씩 포함되어야 하고 비밀번호 글자 수가 8자 이상 입력하세요',
                    '닉네임을 입력하세요',
                    '전화번호 형식을 맞춰서 입력하세요',
                ],
                (value: string) =>
                    (value.indexOf('이메일 형식을 맞춰서 입력하세요') > -1 ||
                        value.indexOf(
                            '알파벳 대소문자 및 특수문자 각각 한 글자씩 포함되어야 하고 비밀번호 글자 수가 8자 이상 입력하세요',
                        ) > -1 ||
                        value.indexOf('전화번호 형식을 맞춰서 입력하세요') >
                            -1 ||
                        value.indexOf('를 입력하세요') > -1 ||
                        value.indexOf('을 입력하세요') > -1) &&
                    value.indexOf(
                        '입력하고자 전화번호 13자 이상을 입력하세요',
                    ) === -1,
            ));

        // [회원가입] 비밀번호 글자 수가 8자 미만이고 전화번호 글자 수가 13자 미만이고 나머지 입력값이 빈 값인지 테스트 케이스
        it('[회원가입] - 비밀번호 글자 수가 8자 미만이고 전화번호 글자 수가 13자 미만이고 나머지 입력값이 빈 값임.', async () =>
            await signUpValidationTest(
                {
                    email: '',
                    password: 'test123',
                    nickname: '',
                    tel: '0100000000',
                },
                [
                    '이메일을 입력하세요',
                    '알파벳 대소문자 및 특수문자 각각 한 글자씩 포함되어야 하고 비밀번호 글자 수가 8자 이상 입력하세요',
                    '닉네임을 입력하세요',
                    '입력하고자 전화번호 13자 이상을 입력하세요',
                ],
                (value: string) =>
                    value.indexOf(
                        '알파벳 대소문자 및 특수문자 각각 한 글자씩 포함되어야 하고 비밀번호 글자 수가 8자 이상 입력하세요',
                    ) > -1 ||
                    value.indexOf(
                        '입력하고자 전화번호 13자 이상을 입력하세요',
                    ) > -1 ||
                    value.indexOf('를 입력하세요') > -1 ||
                    value.indexOf('을 입력하세요') > -1,
            ));

        // [회원가입] 비밀번호 글자 수가 8자 미만이고 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
        it('[회원가입] - 비밀번호 글자 수가 8자 미만이고 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값임.', async () =>
            await signUpValidationTest(
                {
                    email: '',
                    password: 'test123',
                    nickname: '',
                    tel: '0000000',
                },
                [
                    '이메일을 입력하세요',
                    '알파벳 대소문자 및 특수문자 각각 한 글자씩 포함되어야 하고 비밀번호 글자 수가 8자 이상 입력하세요',
                    '닉네임을 입력하세요',
                    '전화번호 형식을 맞춰서 입력하세요',
                ],
                (value: string) =>
                    (value.indexOf(
                        '알파벳 대소문자 및 특수문자 각각 한 글자씩 포함되어야 하고 비밀번호 글자 수가 8자 이상 입력하세요',
                    ) > -1 ||
                        value.indexOf('전화번호 형식을 맞춰서 입력하세요') >
                            -1 ||
                        value.indexOf('를 입력하세요') > -1 ||
                        value.indexOf('을 입력하세요') > -1) &&
                    value.indexOf(
                        '입력하고자 전화번호 13자 이상을 입력하세요',
                    ) === -1,
            ));

        // [회원가입] 이메일 형식이 아니고 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
        it('[회원가입] - 이메일 형식이 아니고 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값임.', async () =>
            await signUpValidationTest(
                {
                    email: 'testtest.com',
                    password: '',
                    nickname: '',
                    tel: '0100000000',
                },
                [
                    '이메일 형식을 맞춰서 입력하세요',
                    '비밀번호를 입력하세요',
                    '닉네임을 입력하세요',
                    '입력하고자 전화번호 13자 이상을 입력하세요',
                ],
                (value: string) =>
                    value.indexOf('이메일 형식을 맞춰서 입력하세요') > -1 ||
                    value.indexOf(
                        '입력하고자 전화번호 13자 이상을 입력하세요',
                    ) > -1 ||
                    value.indexOf('를 입력하세요') > -1 ||
                    value.indexOf('을 입력하세요') > -1,
            ));

        // [회원가입] 이메일 형식이 아니고 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
        it('[회원가입] - 이메일 형식이 아니고 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값임.', async () =>
            await signUpValidationTest(
                {
                    email: 'testtest.com',
                    password: '',
                    nickname: '',
                    tel: '0000000',
                },
                [
                    '이메일 형식을 맞춰서 입력하세요',
                    '비밀번호를 입력하세요',
                    '닉네임을 입력하세요',
                    '전화번호 형식을 맞춰서 입력하세요',
                ],
                (value: string) =>
                    (value.indexOf('이메일 형식을 맞춰서 입력하세요') > -1 ||
                        value.indexOf('전화번호 형식을 맞춰서 입력하세요') >
                            -1 ||
                        value.indexOf('를 입력하세요') > -1 ||
                        value.indexOf('을 입력하세요') > -1) &&
                    value.indexOf(
                        '입력하고자 전화번호 13자 이상을 입력하세요',
                    ) === -1,
            ));

        // [회원가입] 이메일 형식이 아니고 비밀번호 8자 미만이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
        it('[회원가입] - 이메일 형식이 아니고 비밀번호 8자 미만이고 나머지 입력값들이 전부 빈 값임.', async () =>
            await signUpValidationTest(
                {
                    email: 'testtest.com',
                    password: 'test123',
                    nickname: '',
                    tel: '',
                },
                [
                    '이메일 형식을 맞춰서 입력하세요',
                    '알파벳 대소문자 및 특수문자 각각 한 글자씩 포함되어야 하고 비밀번호 글자 수가 8자 이상 입력하세요',
                    '닉네임을 입력하세요',
                    '전화번호를 입력하세요',
                ],
                (value: string) =>
                    (value.indexOf('이메일 형식을 맞춰서 입력하세요') > -1 ||
                        value.indexOf(
                            '알파벳 대소문자 및 특수문자 각각 한 글자씩 포함되어야 하고 비밀번호 글자 수가 8자 이상 입력하세요',
                        ) > -1 ||
                        value.indexOf('를 입력하세요') > -1 ||
                        value.indexOf('을 입력하세요') > -1) &&
                    value.indexOf(
                        '입력하고자 전화번호 13자 이상을 입력하세요',
                    ) === -1,
            ));

        // [회원가입] 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
        it('[회원가입] - 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값임.', async () =>
            await signUpValidationTest(
                {
                    email: '',
                    password: '',
                    nickname: '',
                    tel: '0101111111',
                },
                [
                    '이메일을 입력하세요',
                    '비밀번호를 입력하세요',
                    '닉네임을 입력하세요',
                    '입력하고자 전화번호 13자 이상을 입력하세요',
                ],
                (value: string) =>
                    value.indexOf(
                        '입력하고자 전화번호 13자 이상을 입력하세요',
                    ) > -1 ||
                    value.indexOf('를 입력하세요') > -1 ||
                    value.indexOf('을 입력하세요') > -1,
            ));

        // [회원가입] 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
        it('[회원가입] - 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값임.', async () =>
            await signUpValidationTest(
                {
                    email: '',
                    password: '',
                    nickname: '',
                    tel: '0000000',
                },
                [
                    '이메일을 입력하세요',
                    '비밀번호를 입력하세요',
                    '닉네임을 입력하세요',
                    '전화번호 형식을 맞춰서 입력하세요',
                ],
                (value: string) =>
                    (value.indexOf('전화번호 형식을 맞춰서 입력하세요') > -1 ||
                        value.indexOf('를 입력하세요') > -1 ||
                        value.indexOf('을 입력하세요') > -1) &&
                    value.indexOf(
                        '입력하고자 전화번호 13자 이상을 입력하세요',
                    ) === -1,
            ));

        // [회원가입] 비밀번호 8자 미만이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
        it('[회원가입] - 비밀번호 8자 미만이고 나머지 입력값들이 전부 빈 값임.', async () =>
            await signUpValidationTest(
                {
                    email: '',
                    password: 'test123',
                    nickname: '',
                    tel: '',
                },
                [
                    '이메일을 입력하세요',
                    '알파벳 대소문자 및 특수문자 각각 한 글자씩 포함되어야 하고 비밀번호 글자 수가 8자 이상 입력하세요',
                    '닉네임을 입력하세요',
                    '전화번호를 입력하세요',
                ],
                (value: string) =>
                    (value.indexOf(
                        '알파벳 대소문자 및 특수문자 각각 한 글자씩 포함되어야 하고 비밀번호 글자 수가 8자 이상 입력하세요',
                    ) > -1 ||
                        value.indexOf('를 입력하세요') > -1 ||
                        value.indexOf('을 입력하세요') > -1) &&
                    value.indexOf(
                        '입력하고자 전화번호 13자 이상을 입력하세요',
                    ) === -1,
            ));

        // [회원가입] 유효하지 않는 이메일 형식이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
        it('[회원가입] - 유효하지 않는 이메일 형식이고 나머지 입력값들이 전부 빈 값임.', async () =>
            await signUpValidationTest(
                {
                    email: 'testtest.com',
                    password: '',
                    nickname: '',
                    tel: '',
                },
                [
                    '이메일 형식을 맞춰서 입력하세요',
                    '비밀번호를 입력하세요',
                    '닉네임을 입력하세요',
                    '전화번호를 입력하세요',
                ],
                (value: string) =>
                    (value.indexOf('이메일 형식을 맞춰서 입력하세요') > -1 ||
                        value.indexOf('를 입력하세요') > -1 ||
                        value.indexOf('을 입력하세요') > -1) &&
                    value.indexOf(
                        '입력하고자 전화번호 13자 이상을 입력하세요',
                    ) === -1,
            ));

        // [회원가입] 모든 입력값들이 전부 빈 값인지 테스트 케이스
        it('[회원가입] - 모든 입력값들이 전부 빈 값임.', async () =>
            await signUpValidationTest(
                {
                    email: '',
                    password: '',
                    nickname: '',
                    tel: '',
                },
                [
                    '이메일을 입력하세요',
                    '비밀번호를 입력하세요',
                    '닉네임을 입력하세요',
                    '전화번호를 입력하세요',
                ],
                (value: string) =>
                    (value.indexOf('를 입력하세요') > -1 ||
                        value.indexOf('을 입력하세요') > -1) &&
                    value.indexOf(
                        '입력하고자 전화번호 13자 이상을 입력하세요',
                    ) === -1,
            ));

        // [회원가입] 전화번호가 빈 값인지 실패 테스트 케이스
        it('[회원가입] - 전화번호가 빈 값임.', async () =>
            await signUpValidationFirstErrorMessageTest(
                {
                    email: 'test@test.com',
                    password: 'Test123!',
                    nickname: 'test1',
                    tel: '',
                },
                '전화번호를 입력하세요',
            ));

        // [회원가입] 전화번호 형식인지 실패 테스트 케이스
        it('[회원가입] - 전화번호 형식임.', async () => {
            const metatype: ArgumentMetadata = {
                type: 'body',
                metatype: SignUpForm,
                data: '',
            };

            await new ValidationPipe({
                transform: true,
                whitelist: true,
            })
                .transform(
                    <SignUpForm>{
                        email: 'test@test.com',
                        password: 'Test123!',
                        nickname: 'test1',
                        tel: '1111111',
                    },
                    metatype,
                )
                .then(() => {
                    throw new HttpException(
                        {
                            message: '테스트 실패',
                        },
                        400,
                    );
                })
                .catch((err) => {
                    expect(err.getResponse().message[1]).toEqual(
                        '전화번호 형식을 맞춰서 입력하세요',
                    );
                });
        });

        // [회원가입] 전화번호 글자 수가 13자인지 실패 테스트 케이스
        it('[회원가입] - 전화번호 글자 수가 13자 아님.', async () =>
            await signUpValidationTest(
                {
                    email: 'test@test.com',
                    password: 'Test123!',
                    nickname: 'test1',
                    tel: '0100000000',
                },
                ['입력하고자 전화번호 13자 이상을 입력하세요'],
                null,
            ));

        // [회원가입] 비밀번호 글자 수가 8자 이상인지 실패 테스트 케이스
        it('[회원가입] - 비밀번호 글자 수가 8자 미만임.', async () =>
            await signUpValidationTest(
                {
                    email: 'test@test.com',
                    password: 'test12',
                    nickname: 'test1',
                    tel: '010-1111-1111',
                },
                [
                    '알파벳 대소문자 및 특수문자 각각 한 글자씩 포함되어야 하고 비밀번호 글자 수가 8자 이상 입력하세요',
                ],
                null,
            ));

        // [회원가입] 비밀번호가 빈 값인지 실패 테스트 케이스
        it('[회원가입] - 비밀번호가 빈 값임.', async () =>
            await signUpValidationFirstErrorMessageTest(
                {
                    email: 'test@test.com',
                    password: '',
                    nickname: 'test1',
                    tel: '010-1111-1111',
                },
                '비밀번호를 입력하세요',
            ));

        // [회원가입] : 닉네임이 빈 값인지 실패 테스트 케이스
        it('[회원가입] - 닉네임이 빈 값임.', async () =>
            await signUpValidationTest(
                {
                    email: 'test@test.com',
                    password: 'Test123!',
                    nickname: '',
                    tel: '010-1111-1111',
                },
                ['닉네임을 입력하세요'],
                null,
            ));

        // [회원가입] 이메일이 빈 값인지 실패 테스트 케이스
        it('[회원가입] - 이메일이 빈 값임.', async () =>
            await signUpValidationFirstErrorMessageTest(
                {
                    email: '',
                    password: 'test1234',
                    nickname: 'test1',
                    tel: '010-1111-1111',
                },
                '이메일을 입력하세요',
            ));

        // [회원가입] 회원가입 이메일 형식 유효성 실패 테스트 케이스
        it('[회원가입] - 입력한 이메일이 이메일 형식이 아님', async () =>
            await signUpValidationTest(
                {
                    email: 'test1test.com',
                    password: 'Test123!',
                    nickname: 'test1',
                    tel: '010-1111-1111',
                },
                ['이메일 형식을 맞춰서 입력하세요'],
                null,
            ));
    });

    // 로그인 유효성 검사 테스트
    describe('login', () => {
        it('[로그인] - 입력한 이메일이 이메일 형식이 아님', async () =>
            await loginValidationTest(
                {
                    email: 'test1test.com',
                    password: 'Test123!',
                },
                ['이메일 형식을 맞춰서 입력하세요'],
                null,
            ));

        it('[로그인] - 입력한 비밀번호가 빈 값임', async () =>
            await loginValidationTest(
                {
                    email: 'test1@test.com',
                    password: '',
                },
                ['비밀번호를 입력하세요'],
                null,
            ));

        it('[로그인] - 모든 입력값이 빈 값임', async () =>
            await loginValidationTest(
                {
                    email: '',
                    password: '',
                },
                ['이메일을 입력하세요', '비밀번호를 입력하세요'],
                (value: string) =>
                    value.indexOf('를 입력하세요') > -1 ||
                    value.indexOf('을 입력하세요') > -1,
            ));

        it('[로그인] - 이메일의 형식이 아니고 비밀번호는 빈 값임.', async () =>
            await loginValidationTest(
                {
                    email: '',
                    password: '',
                },
                ['이메일 형식을 맞춰서 입력하세요', '비밀번호를 입력하세요'],
                (value: string) =>
                    value.indexOf('이메일 형식') > -1 ||
                    value.indexOf('를 입력하세요') > -1,
            ));

        it('[로그인] - 입력한 이메일이 빈 값임', async () =>
            await loginValidationFirstErrorMessageTest(
                {
                    email: '',
                    password: 'Test123!',
                },
                '이메일을 입력하세요',
            ));
    });
});
