import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { typeORMConfig } from '../configs/typeorm.config';
import { ValidationPipe } from '@nestjs/common';

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

  // it('회원가입 테스트 성공', async () => {
  //   let target: ValidationPipe = new ValidationPipe({ transform: true, whitelist: true });
  //   const req = {
  //     "email" : "test1@test.com",
  //     "password" : "test123!",
  //     "nickname" : "test1",
  //     "tel" : "010-1111-1111"
  //   }

  //   const success = await service.signUp(req);
  //   expect(success).toEqual(true);
  // });
});
