import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { User } from '../auth/user.entity';
import { AuthModule } from '../auth/auth.module';
import { typeORMConfig } from '../configs/typeorm.config';
import { editUserValidationTest } from './common_test_module/common_testing_module';
import { AuthRole } from 'src/auth/enum/auth_role.enum';

describe('AdminController', () => {
    let controller: AdminController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([User]),
                AuthModule,
            ],
            controllers: [AdminController],
            providers: [AdminService, AdminRepository],
        }).compile();

        controller = module.get<AdminController>(AdminController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    // 회원 수정 유효성 검사 실패 단위 테스트
    // 회원 수정 유효성 검사 실패 - 양쪽 다 빈 값임
    it('[회원 수정 유효성 검사 실패] - 양쪽 다 빈 값임', () =>
        editUserValidationTest(
            {
                nickname: '',
                tel: '',
                authRole: AuthRole.USER,
                profileUrl: undefined,
            },
            ['닉네임을 입력하세요', '전화번호를 입력하세요'],
            (value: string) =>
                (value.indexOf('를 입력하세요') > -1 ||
                    value.indexOf('을 입력하세요') > -1) &&
                value.indexOf('입력하고자 전화번호 13자 이상을 입력하세요') ===
                    -1,
        ));

    // 회원 수정 유효성 검사 실패 - 닉네임 입력값 빈 값이고 전화번호 형식을 맞게 입력하지 않는 경우
    it('[회원 수정 유효성 검사 실패] - 닉네임 입력값 빈 값이고 전화번호 형식을 맞게 입력하지 않는 경우', () =>
        editUserValidationTest(
            {
                nickname: '',
                tel: '010-1111',
                authRole: AuthRole.USER,
                profileUrl: undefined,
            },
            ['닉네임을 입력하세요', '전화번호 형식을 맞춰서 입력하세요'],
            (value: string) =>
                (value.indexOf('을 입력하세요') > -1 ||
                    value.indexOf('전화번호 형식') > -1) &&
                value.indexOf('입력하고자 전화번호 13자 이상을 입력하세요') ===
                    -1,
        ));

    // 회원 수정 유효성 검사 실패 - 닉네임 입력값 빈 값이고 전화번호 글자 수가 13자 미만을 입력하는 경우
    it('[회원 수정 유효성 검사 실패] - 닉네임 입력값 빈 값이고 전화번호 글자 수가 13자 미만을 입력하는 경우', () =>
        editUserValidationTest(
            {
                nickname: '',
                tel: '010-1111-111',
                authRole: AuthRole.USER,
                profileUrl: undefined,
            },
            [
                '닉네임을 입력하세요',
                '입력하고자 전화번호 13자 이상을 입력하세요',
            ],
            (value: string) =>
                value.indexOf('을 입력하세요') > -1 ||
                value.indexOf('입력하고자 전화번호 13자 이상을 입력하세요') >
                    -1,
        ));

    // 회원 수정 유효성 검사 실패 - 닉네임 입력값이 빈 값인 경우
    it('[회원 수정 유효성 검사 실패] - 닉네임 입력값이 빈 값인 경우', () =>
        editUserValidationTest(
            {
                nickname: '',
                tel: '010-1111-1111',
                authRole: AuthRole.USER,
                profileUrl: undefined,
            },
            ['닉네임을 입력하세요'],
            null,
        ));

    // 회원 수정 유효성 검사 실패 - 전화번호 입력값이 빈 값인 경우
    it('[회원 수정 유효성 검사 실패] - 전화번호 입력값이 빈 값인 경우', () =>
        editUserValidationTest(
            {
                nickname: 'test1',
                tel: '',
                authRole: AuthRole.USER,
                profileUrl: undefined,
            },
            ['전화번호를 입력하세요'],
            (value: string) => value.indexOf('를 입력하세요') > -1,
        ));

    // 회원 수정 유효성 검사 실패 - 입력한 전화번호가 전화번호 형식이 아닌 경우
    it('[회원 수정 유효성 검사 실패] - 입력한 전화번호가 전화번호 형식이 아닌 경우', () =>
        editUserValidationTest(
            {
                nickname: 'test1',
                tel: '010-111',
                authRole: AuthRole.USER,
                profileUrl: undefined,
            },
            ['전화번호 형식을 맞춰서 입력하세요'],
            (value: string) => value.indexOf('전화번호 형식') > -1,
        ));

    // 회원 수정 유효성 검사 실패 - 입력한 전화번호 글자 수가 13자 미만인 경우
    it('[회원 수정 유효성 검사 실패] - 입력한 전화번호 글자 수가 13자 미만인 경우', () =>
        editUserValidationTest(
            {
                nickname: 'test1',
                tel: '010-1111-111',
                authRole: AuthRole.USER,
                profileUrl: undefined,
            },
            ['입력하고자 전화번호 13자 이상을 입력하세요'],
            (value: string) =>
                value.indexOf('입력하고자 전화번호 13자 이상을 입력하세요') >
                -1,
        ));
});
