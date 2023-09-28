import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { typeORMConfig } from '../config/typeorm.config';
import { SignUpForm } from './dto/sign_up_form';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([User]),
            ],
            providers: [AuthService, UserRepository],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // Unit TEST(단위 테스트)
    // 회원가입 로직 테스트
    it('회원가입 테스트 성공', async () => {
        const req: SignUpForm = {
            email: 'test1@test.com',
            password: 'test123!',
            nickname: 'test1',
            tel: '010-1111-1111',
        };

        const success = await service.signUp(req);
        expect(success).toEqual(true);
    });
});
