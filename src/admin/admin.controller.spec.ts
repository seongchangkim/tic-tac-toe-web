import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { User } from '../auth/user.entity';
import { AuthModule } from '../auth/auth.module';
import { typeORMConfig } from '../configs/typeorm.config';

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
});
