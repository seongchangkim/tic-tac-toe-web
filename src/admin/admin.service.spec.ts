import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { User } from '../auth/user.entity';
import { typeORMConfig } from '../configs/typeorm.config';

describe('AdminService', () => {
    let service: AdminService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([User]),
                AuthModule,
            ],
            providers: [AdminService, AdminRepository],
        }).compile();

        service = module.get<AdminService>(AdminService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // 회원 목록 단위 테스트
    // 회원 목록 성공 테스트 케이스
    it('[회원 목록] - 그냥 회원 목록 가져오기', async () => {
        const { total, page, lastPage } =
            await service.getUserListByPagingAndSearch(1, undefined, undefined);

        expect(total).toEqual(12);
        expect(page).toEqual(1);
        expect(lastPage).toEqual(2);
    });

    // 2페이지 기준으로 회원 목록 성공 테스트 케이스(페이징 처리 성공 테스트 케이스)
    it('[회원 목록] - 2페이지 기준으로 회원 목록 가져오기', async () => {
        const { total, page, lastPage } =
            await service.getUserListByPagingAndSearch(2, undefined, undefined);

        expect(total).toEqual(12);
        expect(page).toEqual(2);
        expect(lastPage).toEqual(2);
    });

    // nickname가 test 단어를 포함하고 2페이지 기준으로 회원 목록 성공 테스트 케이스(페이징 처리 및 검색 기능 성공 테스트 케이스)
    it('[회원 목록] - nickname가 test 단어를 포함하고 2페이지 기준으로 회원 목록 가져오기', async () => {
        const { total, page, lastPage } =
            await service.getUserListByPagingAndSearch(2, 'nickname', 'test');

        expect(total).toEqual(9);
        expect(page).toEqual(2);
        expect(lastPage).toEqual(1);
    });

    // email가 test 단어를 포함하고 2페이지 기준으로 회원 목록 성공 테스트 케이스(페이징 처리 및 검색 기능 성공 테스트 케이스)
    it('[회원 목록] - email가 test 단어를 포함하고 2페이지 기준으로 회원 목록 가져오기', async () => {
        const { total, page, lastPage } =
            await service.getUserListByPagingAndSearch(2, 'email', 'test');

        expect(total).toEqual(9);
        expect(page).toEqual(2);
        expect(lastPage).toEqual(1);
    });

    // 회원 권한인 회원이고 2페이지 기준으로 회원 목록 성공 테스트 케이스(페이징 처리 및 검색 기능 성공 테스트 케이스)
    it('[회원 목록] - 회원 권한인 회원이고 2페이지 기준으로 회원 목록 가져오기', async () => {
        const { total, page, lastPage } =
            await service.getUserListByPagingAndSearch(2, 'auth_role', '회원');

        expect(total).toEqual(11);
        expect(page).toEqual(2);
        expect(lastPage).toEqual(2);
    });

    // 기존 회원가입했고 2페이지 기준으로 회원 목록 성공 테스트 케이스(페이징 처리 및 검색 기능 성공 테스트 케이스)
    it('[회원 목록] - 기존 회원가입했고 2페이지 기준으로 회원 목록 가져오기', async () => {
        const { total, page, lastPage } =
            await service.getUserListByPagingAndSearch(
                2,
                'social_login_type',
                'NONE',
            );

        expect(total).toEqual(10);
        expect(page).toEqual(2);
        expect(lastPage).toEqual(1);
    });

    // nickname가 test 단어를 포함하고 2페이지 기준으로 회원 목록 성공 테스트 케이스(검색 기능 성공 테스트 케이스)
    it('[회원 목록] - nickname가 admin 단어를 포함한 회원 목록 가져오기', async () => {
        const { total, page, lastPage } =
            await service.getUserListByPagingAndSearch(1, 'nickname', 'admin');

        expect(total).toEqual(1);
        expect(page).toEqual(1);
        expect(lastPage).toEqual(1);
    });

    // email가 test 단어를 포함한 회원 목록 성공 테스트 케이스(검색 기능 성공 테스트 케이스)
    it('[회원 목록] - email가 admin@ 단어를 포함한 회원 목록 가져오기', async () => {
        const { total, page, lastPage } =
            await service.getUserListByPagingAndSearch(1, 'email', 'admin@');

        expect(total).toEqual(1);
        expect(page).toEqual(1);
        expect(lastPage).toEqual(1);
    });

    // 회원 권한인 관리자인 회원 목록 성공 테스트 케이스(검색 기능 성공 테스트 케이스)
    it('[회원 목록] - 회원 권한인 관리자인 회원 목록 가져오기', async () => {
        const { total, page, lastPage } =
            await service.getUserListByPagingAndSearch(
                1,
                'auth_role',
                '관리자',
            );

        expect(total).toEqual(1);
        expect(page).toEqual(1);
        expect(lastPage).toEqual(1);
    });

    // 카카오 소셜 회원가입한 회원 목록 성공 테스트 케이스(검색 기능 성공 테스트 케이스)
    it('[회원 목록] - 카카오 소셜 회원가입한 회원 목록 가져오기', async () => {
        const { total, page, lastPage } =
            await service.getUserListByPagingAndSearch(
                1,
                'social_login_type',
                'KAKAO',
            );

        expect(total).toEqual(1);
        expect(page).toEqual(1);
        expect(lastPage).toEqual(1);
    });

    // 구글 소셜 회원가입한 회원 목록 성공 테스트 케이스(검색 기능 성공 테스트 케이스)
    it('[회원 목록] - 구글 소셜 회원가입한 회원 목록 가져오기', async () => {
        const { total, page, lastPage } =
            await service.getUserListByPagingAndSearch(
                1,
                'social_login_type',
                'GOOGLE',
            );

        expect(total).toEqual(1);
        expect(page).toEqual(1);
        expect(lastPage).toEqual(1);
    });
});
