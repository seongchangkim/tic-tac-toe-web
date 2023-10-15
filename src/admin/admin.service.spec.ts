import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { User } from '../auth/user.entity';
import { typeORMConfig } from '../configs/typeorm.config';

interface CommonGetUsersPagingAndSearchType {
    currentPage: number;
    cond: string;
    keyword: string;
    expectTotal: number;
    expectPage: number;
    expectLastPage: number;
}

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
    it('[회원 목록] - 그냥 회원 목록 가져오기', () =>
        getUsersByPagaingAndSearch({
            currentPage: 1,
            cond: undefined,
            keyword: undefined,
            expectTotal: 14,
            expectPage: 1,
            expectLastPage: 2,
        }));

    // 2페이지 기준으로 회원 목록 성공 테스트 케이스(페이징 처리 성공 테스트 케이스)
    it('[회원 목록] - 2페이지 기준으로 회원 목록 가져오기', () =>
        getUsersByPagaingAndSearch({
            currentPage: 2,
            cond: undefined,
            keyword: undefined,
            expectTotal: 14,
            expectPage: 2,
            expectLastPage: 2,
        }));

    // nickname가 test 단어를 포함하고 2페이지 기준으로 회원 목록 성공 테스트 케이스(페이징 처리 및 검색 기능 성공 테스트 케이스)
    it('[회원 목록] - nickname가 test 단어를 포함하고 2페이지 기준으로 회원 목록 가져오기', () =>
        getUsersByPagaingAndSearch({
            currentPage: 2,
            cond: 'nickname',
            keyword: 'test',
            expectTotal: 11,
            expectPage: 2,
            expectLastPage: 2,
        }));

    // email가 test 단어를 포함하고 2페이지 기준으로 회원 목록 성공 테스트 케이스(페이징 처리 및 검색 기능 성공 테스트 케이스)
    it('[회원 목록] - email가 test 단어를 포함하고 2페이지 기준으로 회원 목록 가져오기', () =>
        getUsersByPagaingAndSearch({
            currentPage: 2,
            cond: 'email',
            keyword: 'test',
            expectTotal: 11,
            expectPage: 2,
            expectLastPage: 2,
        }));

    // 회원 권한인 회원이고 2페이지 기준으로 회원 목록 성공 테스트 케이스(페이징 처리 및 검색 기능 성공 테스트 케이스)
    it('[회원 목록] - 회원 권한인 회원이고 2페이지 기준으로 회원 목록 가져오기', () =>
        getUsersByPagaingAndSearch({
            currentPage: 2,
            cond: 'authRole',
            keyword: '회원',
            expectTotal: 13,
            expectPage: 2,
            expectLastPage: 2,
        }));

    // 기존 회원가입했고 2페이지 기준으로 회원 목록 성공 테스트 케이스(페이징 처리 및 검색 기능 성공 테스트 케이스)
    it('[회원 목록] - 기존 회원가입했고 2페이지 기준으로 회원 목록 가져오기', () =>
        getUsersByPagaingAndSearch({
            currentPage: 2,
            cond: 'socialLoginType',
            keyword: 'NONE',
            expectTotal: 12,
            expectPage: 2,
            expectLastPage: 2,
        }));

    // nickname가 admin 단어를 포함하고 2페이지 기준으로 회원 목록 성공 테스트 케이스(검색 기능 성공 테스트 케이스)
    it('[회원 목록] - nickname가 admin 단어를 포함한 회원 목록 가져오기', () =>
        getUsersByPagaingAndSearch({
            currentPage: 1,
            cond: 'nickname',
            keyword: 'admin',
            expectTotal: 1,
            expectPage: 1,
            expectLastPage: 1,
        }));

    // email가 admin@ 단어를 포함한 회원 목록 성공 테스트 케이스(검색 기능 성공 테스트 케이스)
    it('[회원 목록] - email가 admin@ 단어를 포함한 회원 목록 가져오기', () =>
        getUsersByPagaingAndSearch({
            currentPage: 1,
            cond: 'email',
            keyword: 'admin@',
            expectTotal: 1,
            expectPage: 1,
            expectLastPage: 1,
        }));

    // 회원 권한인 관리자인 회원 목록 성공 테스트 케이스(검색 기능 성공 테스트 케이스)
    it('[회원 목록] - 회원 권한인 관리자인 회원 목록 가져오기', () =>
        getUsersByPagaingAndSearch({
            currentPage: 1,
            cond: 'authRole',
            keyword: '관리자',
            expectTotal: 1,
            expectPage: 1,
            expectLastPage: 1,
        }));

    // 카카오 소셜 회원가입한 회원 목록 성공 테스트 케이스(검색 기능 성공 테스트 케이스)
    it('[회원 목록] - 카카오 소셜 회원가입한 회원 목록 가져오기', () =>
        getUsersByPagaingAndSearch({
            currentPage: 1,
            cond: 'socialLoginType',
            keyword: 'KAKAO',
            expectTotal: 1,
            expectPage: 1,
            expectLastPage: 1,
        }));

    // 구글 소셜 회원가입한 회원 목록 성공 테스트 케이스(검색 기능 성공 테스트 케이스)
    it('[회원 목록] - 구글 소셜 회원가입한 회원 목록 가져오기', () =>
        getUsersByPagaingAndSearch({
            currentPage: 1,
            cond: 'socialLoginType',
            keyword: 'GOOGLE',
            expectTotal: 1,
            expectPage: 1,
            expectLastPage: 1,
        }));

    const getUsersByPagaingAndSearch = async ({
        currentPage,
        cond,
        keyword,
        expectTotal,
        expectPage,
        expectLastPage,
    }: CommonGetUsersPagingAndSearchType) => {
        const { total, page, lastPage } =
            await service.getUserListByPagingAndSearch(
                currentPage,
                cond,
                keyword,
            );

        expect(total).toEqual(expectTotal);
        expect(page).toEqual(expectPage);
        expect(lastPage).toEqual(expectLastPage);
    };

    // 회원 상세보기 단위 테스트
    it('[회원 목록] - 구글 소셜 회원가입한 회원 목록 가져오기', async () => {
        const { email, nickname, tel, authRole, socialLoginType, profileUrl } =
            await service.getOtherUserInfo(
                '6d7c517c-b3d4-4ee6-8f21-6a68161bd4b4',
            );

        expect(email).toEqual('test9@test.com');
        expect(nickname).toEqual('test9');
        expect(tel).toEqual('010-9999-9999');
        expect(authRole).toEqual('회원');
        expect(socialLoginType).toEqual('NONE');
        expect(profileUrl).toEqual(null);
    });
});
