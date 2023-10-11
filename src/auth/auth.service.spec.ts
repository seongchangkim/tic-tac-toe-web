import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { typeORMConfig } from '../configs/typeorm.config';
import { SignUpForm } from './dto/sign_up_form.dto';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtOptions } from '../configs/jwt.config';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
    let service: AuthService;
    let jwtService: JwtService;
    let repository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([User]),
                JwtModule.registerAsync({
                    useFactory: async () => jwtOptions,
                }),
            ],
            providers: [AuthService, UserRepository, JwtService],
        }).compile();

        service = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService);
        repository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // Unit TEST(단위 테스트)
    // 회원가입 로직 테스트
    it('회원가입 테스트 성공', async () => {
        const req: SignUpForm = {
            email: 'test1@test.com',
            password: 'Test123!',
            nickname: 'test1',
            tel: '010-1111-1111',
        };

        const success = await service.signUp(req);
        expect(success).toEqual({
            errorMessage: undefined,
            success: true,
        });
    });

    // 로그인 성공 테스트
    it('로그인 테스트 성공', async () => {
        const email = 'test1@test.com';
        const password = 'Test123!';

        const loginedUser = await repository.findOne({
            where: {
                email,
            },
        });

        if (loginedUser && bcrypt.compare(password, loginedUser.password)) {
            const payload = {
                nickname: loginedUser.nickname,
                tel: loginedUser.tel,
                role: loginedUser.auth_role,
            };

            const accessToken = await jwtService.sign(payload);
            expect(accessToken).toBeTruthy();
        } else {
            throw new NotFoundException(
                '아이디 또는 비밀번호가 일치하지 않습니다.',
            );
        }
    });
});
