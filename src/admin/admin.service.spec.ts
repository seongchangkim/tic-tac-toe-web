import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { User } from '../auth/user.entity';
import { typeORMConfig } from '../configs/typeorm.config';
import { AuthRole } from '../auth/enum/auth_role.enum';
import {
    initialiseTestTransactions,
    runInTransaction,
} from 'typeorm-test-transactions';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../auth/user.repository';
import { SignUpForm } from '../auth/dto/sign_up_form.dto';
import { JwtService } from '@nestjs/jwt';

interface CommonGetUsersPagingAndSearchType {
    currentPage: number;
    cond: string;
    keyword: string;
    expectTotal: number;
    expectPage: number;
    expectLastPage: number;
}

initialiseTestTransactions();

describe('AdminService', () => {
    let adminService: AdminService;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([User]),
                AuthModule,
            ],
            providers: [
                AdminService,
                AuthService,
                AdminRepository,
                UserRepository,
                JwtService,
            ],
        }).compile();

        adminService = module.get<AdminService>(AdminService);
        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(adminService).toBeDefined();
    });

    // 회원 목록 단위 테스트
    describe('getUserListByPagingAndSearch', () => {
        // 회원 목록 성공 테스트 케이스
        it('[회원 목록] - 그냥 회원 목록 가져오기', () =>
            getUsersByPagaingAndSearch({
                currentPage: 1,
                cond: undefined,
                keyword: undefined,
                expectTotal: 11,
                expectPage: 1,
                expectLastPage: 2,
            }));

        // 2페이지 기준으로 회원 목록 성공 테스트 케이스(페이징 처리 성공 테스트 케이스)
        it('[회원 목록] - 2페이지 기준으로 회원 목록 가져오기', () =>
            getUsersByPagaingAndSearch({
                currentPage: 2,
                cond: undefined,
                keyword: undefined,
                expectTotal: 11,
                expectPage: 2,
                expectLastPage: 2,
            }));

        // nickname가 test 단어를 포함하고 2페이지 기준으로 회원 목록 성공 테스트 케이스(페이징 처리 및 검색 기능 성공 테스트 케이스)
        it('[회원 목록] - nickname가 test 단어를 포함하고 2페이지 기준으로 회원 목록 가져오기', () =>
            getUsersByPagaingAndSearch({
                currentPage: 2,
                cond: 'nickname',
                keyword: 'test',
                expectTotal: 8,
                expectPage: 2,
                expectLastPage: 1,
            }));

        // email가 test 단어를 포함하고 2페이지 기준으로 회원 목록 성공 테스트 케이스(페이징 처리 및 검색 기능 성공 테스트 케이스)
        it('[회원 목록] - email가 test 단어를 포함하고 2페이지 기준으로 회원 목록 가져오기', () =>
            getUsersByPagaingAndSearch({
                currentPage: 2,
                cond: 'email',
                keyword: 'test',
                expectTotal: 8,
                expectPage: 2,
                expectLastPage: 1,
            }));

        // 회원 권한인 회원이고 2페이지 기준으로 회원 목록 성공 테스트 케이스(페이징 처리 및 검색 기능 성공 테스트 케이스)
        it('[회원 목록] - 회원 권한인 회원이고 2페이지 기준으로 회원 목록 가져오기', () =>
            getUsersByPagaingAndSearch({
                currentPage: 2,
                cond: 'authRole',
                keyword: '회원',
                expectTotal: 10,
                expectPage: 2,
                expectLastPage: 1,
            }));

        // 기존 회원가입했고 2페이지 기준으로 회원 목록 성공 테스트 케이스(페이징 처리 및 검색 기능 성공 테스트 케이스)
        it('[회원 목록] - 기존 회원가입했고 2페이지 기준으로 회원 목록 가져오기', () =>
            getUsersByPagaingAndSearch({
                currentPage: 2,
                cond: 'socialLoginType',
                keyword: 'NONE',
                expectTotal: 9,
                expectPage: 2,
                expectLastPage: 1,
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
            // when
            const { total, page, lastPage } =
                await adminService.getUserListByPagingAndSearch(
                    currentPage,
                    cond,
                    keyword,
                );

            // then
            expect(total).toEqual(expectTotal);
            expect(page).toEqual(expectPage);
            expect(lastPage).toEqual(expectLastPage);
        };
    });

    // 회원 상세보기 단위 테스트
    describe('getOtherUserInfo', () => {
        // 회원 상세보기 성공 테스트 케이스
        it('회원 상세보기 성공', async () => {
            runInTransaction(async () => {
                // given
                const req: SignUpForm = {
                    email: 'test1@test.com',
                    password: 'Test123!',
                    nickname: 'test1',
                    tel: '010-1111-1111',
                };

                const { userId, success } = await authService.signUp(req);

                // when
                if (success) {
                    const {
                        email,
                        nickname,
                        tel,
                        authRole,
                        socialLoginType,
                        profileUrl,
                    } = await adminService.getOtherUserInfo(userId);

                    // then
                    expect(email).toEqual('test1@test.com');
                    expect(nickname).toEqual('test1');
                    expect(tel).toEqual('010-1111-1111');
                    expect(authRole).toEqual('회원');
                    expect(socialLoginType).toEqual('NONE');
                    expect(profileUrl).toEqual(null);
                } else {
                    try {
                        throw '회원 상세보기 성공 테스트 실패했습니다';
                    } catch (e) {
                        expect(e).toEqual(
                            '회원 상세보기 성공 테스트 실패했습니다',
                        );
                    }
                }
            });
        });

        // 해당 회원 존재하지 않아서 회원 상세보기 실패 테스트 케이스
        it('해당 회원 존재하지 않으므로 회원 상세보기 실패', async () => {
            try {
                await adminService.getOtherUserInfo('a3');
            } catch (e) {
                expect(e.message).toEqual('해당 회원은 존재하지 않습니다.');
            }
        });
    });

    // 회원 수정 단위 테스트
    describe('editOtherUser', () => {
        // DB에 존재하는 회원 수정 성공 테스트 케이스
        it('회원 존재에 의해 회원 수정 성공', async () => {
            runInTransaction(async () => {
                // given
                const req: SignUpForm = {
                    email: 'test1@test.com',
                    password: 'Test123!',
                    nickname: 'test1',
                    tel: '010-1111-1111',
                };

                const { userId, success } = await authService.signUp(req);

                // when
                if (success) {
                    const { isSuccess, message } =
                        await adminService.editOtherUser(
                            {
                                nickname: 'test11',
                                tel: '010-1111-1112',
                                authRole: AuthRole.ADMIN,
                                profileUrl: undefined,
                            },
                            userId,
                        );

                    // then
                    expect(isSuccess).toEqual(true);
                    expect(message).toEqual('해당 회원 정보를 수정했습니다.');
                } else {
                    try {
                        throw '회원 수정 성공 테스트 실패했습니다';
                    } catch (e) {
                        expect(e).toEqual('회원 수정 성공 테스트 실패했습니다');
                    }
                }
            });
        });

        // 해당 회원 존재하지 않아서 회원 수정 실패 테스트 케이스
        it('해당 회원 존재하지 않으므로 회원 수정 실패', async () => {
            try {
                // when
                await adminService.editOtherUser(
                    // given
                    {
                        nickname: 'test9',
                        tel: '010-9999-9999',
                        authRole: AuthRole.USER,
                        profileUrl: undefined,
                    },
                    '111',
                );
            } catch (e) {
                // than
                expect(e.message).toEqual('해당 회원은 존재하지 않습니다.');
            }
        });
    });

    // 회원 삭제 단위 테스트
    describe('deleteOtherUser', () => {
        // 회원 삭제 성공 테스트 케이스
        it('회원 존재에 의해 회원 삭제 성공', async () => {
            runInTransaction(async () => {
                // given
                const req: SignUpForm = {
                    email: 'test1@test.com',
                    password: 'Test123!',
                    nickname: 'test1',
                    tel: '010-1111-1111',
                };

                const { userId, success } = await authService.signUp(req);

                if (success) {
                    // when
                    const { isSuccess } =
                        await adminService.deleteOtherUser(userId);

                    // then
                    expect(isSuccess).toEqual(true);
                }
            });
        });

        // 해당 회원 존재하지 않아서 회원 삭제 실패 테스트 케이스
        it('해당 회원 존재하지 않으므로 회원 삭제 실패', async () => {
            try {
                await adminService.deleteOtherUser('a3');
            } catch (e) {
                expect(e.message).toEqual('해당 회원은 존재하지 않습니다.');
            }
        });
    });
});
