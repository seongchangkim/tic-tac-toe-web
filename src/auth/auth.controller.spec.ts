import { typeORMConfig } from '../config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpForm } from './dto/sign_up_form';
import {
    ArgumentMetadata,
    HttpException,
    ValidationPipe,
} from '@nestjs/common';
import {
    validationTest,
    validationFirstErrorMessageTest,
} from '../common/common_testing_module';
import { AuthController } from './auth.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('AuthController', () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([User]),
            ],
            providers: [AuthService, UserRepository],
            controllers: [AuthController],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    // Unit TEST(단위 테스트)
    // [회원가입] 이메일 형식이 아니고 비밀번호 글자 수가 8자 미만이고 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
    it('[회원가입] - 이메일 형식이 아니고 비밀번호 글자 수가 8자 미만이고 전화번호 글자 수가 13자 미만이고 나머지 입력값이 전부 빈 값임.', async () =>
        await validationTest(
            {
                email: 'testtest.com',
                password: 'test123',
                nickname: '',
                tel: '0100000000',
            },
            [
                'email must be an email',
                'password must be longer than or equal to 8 characters',
                'nickname should not be empty',
                'tel must be longer than or equal to 13 characters',
            ],
            (value: string) =>
                value.indexOf('email must be an email') > -1 ||
                value.indexOf(
                    'password must be longer than or equal to 8 characters',
                ) > -1 ||
                value.indexOf(
                    'tel must be longer than or equal to 13 characters',
                ) > -1 ||
                value.indexOf('not be empty') > -1,
        ));

    // [회원가입] 이메일 형식이 아니고 비밀번호 글자 수가 8자 미만이고 무효한 전화번호 형식이고 나머지 입력값이 빈 값인지 테스트 케이스
    it('[회원가입] - 이메일 형식이 아니고 비밀번호 글자 수가 8자 미만이고 무효한 전화번호 형식이고 나머지 입력값이 빈 값임.', async () =>
        await validationTest(
            {
                email: 'testtest.com',
                password: 'test123',
                nickname: '',
                tel: '0000000',
            },
            [
                'email must be an email',
                'password must be longer than or equal to 8 characters',
                'nickname should not be empty',
                'tel must be a valid phone number',
            ],
            (value: string) =>
                value.indexOf('email must be an email') > -1 ||
                value.indexOf(
                    'password must be longer than or equal to 8 characters',
                ) > -1 ||
                value.indexOf('tel must be a valid phone number') > -1 ||
                value.indexOf('not be empty') > -1,
        ));

    // [회원가입] 비밀번호 글자 수가 8자 미만이고 전화번호 글자 수가 13자 미만이고 나머지 입력값이 빈 값인지 테스트 케이스
    it('[회원가입] - 비밀번호 글자 수가 8자 미만이고 전화번호 글자 수가 13자 미만이고 나머지 입력값이 빈 값임.', async () =>
        await validationTest(
            {
                email: '',
                password: 'test123',
                nickname: '',
                tel: '0100000000',
            },
            [
                'email should not be empty',
                'password must be longer than or equal to 8 characters',
                'nickname should not be empty',
                'tel must be longer than or equal to 13 characters',
            ],
            (value: string) =>
                value.indexOf(
                    'password must be longer than or equal to 8 characters',
                ) > -1 ||
                value.indexOf(
                    'tel must be longer than or equal to 13 characters',
                ) > -1 ||
                value.indexOf('not be empty') > -1,
        ));

    // [회원가입] 비밀번호 글자 수가 8자 미만이고 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
    it('[회원가입] - 비밀번호 글자 수가 8자 미만이고 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값임.', async () =>
        await validationTest(
            {
                email: '',
                password: 'test123',
                nickname: '',
                tel: '0000000',
            },
            [
                'email should not be empty',
                'password must be longer than or equal to 8 characters',
                'nickname should not be empty',
                'tel must be a valid phone number',
            ],
            (value: string) =>
                value.indexOf(
                    'password must be longer than or equal to 8 characters',
                ) > -1 ||
                value.indexOf('tel must be a valid phone number') > -1 ||
                value.indexOf('not be empty') > -1,
        ));

    // [회원가입] 이메일 형식이 아니고 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
    it('[회원가입] - 이메일 형식이 아니고 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값임.', async () =>
        await validationTest(
            {
                email: 'testtest.com',
                password: '',
                nickname: '',
                tel: '0100000000',
            },
            [
                'email must be an email',
                'password should not be empty',
                'nickname should not be empty',
                'tel must be longer than or equal to 13 characters',
            ],
            (value: string) =>
                value.indexOf('email must be an email') > -1 ||
                value.indexOf(
                    'tel must be longer than or equal to 13 characters',
                ) > -1 ||
                value.indexOf('not be empty') > -1,
        ));

    // [회원가입] 이메일 형식이 아니고 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
    it('[회원가입] - 이메일 형식이 아니고 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값임.', async () =>
        await validationTest(
            {
                email: 'testtest.com',
                password: '',
                nickname: '',
                tel: '0000000',
            },
            [
                'email must be an email',
                'password should not be empty',
                'nickname should not be empty',
                'tel must be a valid phone number',
            ],
            (value: string) =>
                value.indexOf('email must be an email') > -1 ||
                value.indexOf('tel must be a valid phone number') > -1 ||
                value.indexOf('not be empty') > -1,
        ));

    // [회원가입] 이메일 형식이 아니고 비밀번호 8자 미만이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
    it('[회원가입] - 이메일 형식이 아니고 비밀번호 8자 미만이고 나머지 입력값들이 전부 빈 값임.', async () =>
        await validationTest(
            {
                email: 'testtest.com',
                password: 'test123',
                nickname: '',
                tel: '',
            },
            [
                'email must be an email',
                'password must be longer than or equal to 8 characters',
                'nickname should not be empty',
                'tel should not be empty',
            ],
            (value: string) =>
                value.indexOf('email must be an email') > -1 ||
                value.indexOf(
                    'password must be longer than or equal to 8 characters',
                ) > -1 ||
                value.indexOf('not be empty') > -1,
        ));

    // [회원가입] 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
    it('[회원가입] - 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값임.', async () =>
        await validationTest(
            {
                email: '',
                password: '',
                nickname: '',
                tel: '0101111111',
            },
            [
                'email should not be empty',
                'password should not be empty',
                'nickname should not be empty',
                'tel must be longer than or equal to 13 characters',
            ],
            (value: string) =>
                value.indexOf(
                    'tel must be longer than or equal to 13 characters',
                ) > -1 || value.indexOf('not be empty') > -1,
        ));

    // [회원가입] 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
    it('[회원가입] - 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값임.', async () =>
        await validationTest(
            {
                email: '',
                password: '',
                nickname: '',
                tel: '0000000',
            },
            [
                'email should not be empty',
                'password should not be empty',
                'nickname should not be empty',
                'tel must be a valid phone number',
            ],
            (value: string) =>
                value.indexOf('tel must be a valid phone number') > -1 ||
                value.indexOf('not be empty') > -1,
        ));

    // [회원가입] 비밀번호 8자 미만이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
    it('[회원가입] - 비밀번호 8자 미만이고 나머지 입력값들이 전부 빈 값임.', async () =>
        await validationTest(
            {
                email: '',
                password: 'test123',
                nickname: '',
                tel: '',
            },
            [
                'email should not be empty',
                'password must be longer than or equal to 8 characters',
                'nickname should not be empty',
                'tel should not be empty',
            ],
            (value: string) =>
                value.indexOf(
                    'password must be longer than or equal to 8 characters',
                ) > -1 || value.indexOf('not be empty') > -1,
        ));

    // [회원가입] 유효하지 않는 이메일 형식이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
    it('[회원가입] - 유효하지 않는 이메일 형식이고 나머지 입력값들이 전부 빈 값임.', async () =>
        await validationTest(
            {
                email: 'testtest.com',
                password: '',
                nickname: '',
                tel: '',
            },
            [
                'email must be an email',
                'password should not be empty',
                'nickname should not be empty',
                'tel should not be empty',
            ],
            (value: string) =>
                value.indexOf('email must be an email') > -1 ||
                value.indexOf('not be empty') > -1,
        ));

    // [회원가입] 모든 입력값들이 전부 빈 값인지 테스트 케이스
    it('[회원가입] - 모든 입력값들이 전부 빈 값임.', async () =>
        await validationTest(
            {
                email: '',
                password: '',
                nickname: '',
                tel: '',
            },
            [
                'email should not be empty',
                'password should not be empty',
                'nickname should not be empty',
                'tel should not be empty',
            ],
            (value: string) => value.indexOf('not be empty') > -1,
        ));

    // [회원가입] 전화번호가 빈 값인지 실패 테스트 케이스
    it('[회원가입] - 전화번호가 빈 값임.', async () =>
        await validationFirstErrorMessageTest(
            {
                email: 'test@test.com',
                password: 'test1234',
                nickname: 'test1',
                tel: '',
            },
            'tel should not be empty',
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
                    password: 'test1234',
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
                    'tel must be a valid phone number',
                );
            });
    });

    // [회원가입] 전화번호 글자 수가 13자인지 실패 테스트 케이스
    it('[회원가입] - 전화번호 글자 수가 13자 아님.', async () =>
        await validationTest(
            {
                email: 'test@test.com',
                password: 'test1234',
                nickname: 'test1',
                tel: '0100000000',
            },
            ['tel must be longer than or equal to 13 characters'],
            null,
        ));

    // [회원가입] 비밀번호 글자 수가 8자 이상인지 실패 테스트 케이스
    it('[회원가입] - 비밀번호 글자 수가 8자 미만임.', async () =>
        await validationTest(
            {
                email: 'test@test.com',
                password: 'test12',
                nickname: 'test1',
                tel: '010-1111-1111',
            },
            ['password must be longer than or equal to 8 characters'],
            null,
        ));

    // [회원가입] 비밀번호가 빈 값인지 실패 테스트 케이스
    it('[회원가입] - 비밀번호가 빈 값임.', async () =>
        await validationFirstErrorMessageTest(
            {
                email: 'test@test.com',
                password: '',
                nickname: 'test1',
                tel: '010-1111-1111',
            },
            'password should not be empty',
        ));

    // [회원가입] : 닉네임이 빈 값인지 실패 테스트 케이스
    it('[회원가입] - 닉네임이 빈 값임.', async () =>
        await validationTest(
            {
                email: 'test@test.com',
                password: 'test1234',
                nickname: '',
                tel: '010-1111-1111',
            },
            ['nickname should not be empty'],
            null,
        ));

    // [회원가입] 이메일이 빈 값인지 실패 테스트 케이스
    it('[회원가입] - 이메일이 빈 값임.', async () =>
        await validationFirstErrorMessageTest(
            {
                email: '',
                password: 'test1234',
                nickname: 'test1',
                tel: '010-1111-1111',
            },
            'email should not be empty',
        ));

    // [회원가입] 회원가입 이메일 형식 유효성 실패 테스트 케이스
    it('[회원가입] - 입력한 이메일이 이메일 형식이 아님', async () =>
        await validationTest(
            {
                email: 'test1test.com',
                password: 'test1234',
                nickname: 'test1',
                tel: '010-1111-1111',
            },
            ['email must be an email'],
            null,
        ));
});
