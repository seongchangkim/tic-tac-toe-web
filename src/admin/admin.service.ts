import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import {
    GetUserListByPagingAndSearchResType,
    EditOtherUserResType,
    GetOtherUserInfoResType,
} from './type/admin_common_service_type';
import { UserEditReqDto } from './user_edit.dto';

@Injectable()
export class AdminService {
    constructor(private repository: AdminRepository) {}

    // 회원 목록(페이징 처리 및 검색 기능)
    async getUserListByPagingAndSearch(
        page: number,
        cond: string,
        keyword: string,
    ): Promise<GetUserListByPagingAndSearchResType> {
        const take = 10;
        const query = this.repository
            .createQueryBuilder('user')
            .select([
                'user.userId',
                'user.email',
                'user.nickname',
                'user.createdAt',
                'user.lastModifiedAt',
                'user.authRole',
                'user.socialLoginType',
                'user.profileUrl',
            ]);

        if (typeof cond !== 'undefined' && typeof keyword !== 'undefined') {
            query
                .where(`user.${cond} like :keyword`, {
                    keyword: `%${keyword}%`,
                })
                .skip((page - 1) * take)
                .take(take)
                .orderBy('user.userId');
        } else {
            query
                .skip((page - 1) * take)
                .take(take)
                .orderBy('user.userId');
        }

        const [users, total] = await query.getManyAndCount();

        return {
            users,
            total,
            page: page * 1,
            lastPage: Math.ceil(total / take),
        };
    }

    // 회원 상세보기
    async getOtherUserInfo(userId: string): Promise<GetOtherUserInfoResType> {
        try {
            const {
                email,
                nickname,
                tel,
                authRole,
                socialLoginType,
                profileUrl,
            } = await this.repository.findOneBy({
                userId,
            });

            return {
                email,
                nickname,
                tel,
                authRole,
                socialLoginType,
                profileUrl,
            };
        } catch (e) {
            throw new NotFoundException('해당 회원은 존재하지 않습니다.');
        }
    }

    // 회원 수정
    async editOtherUser(
        { nickname, tel, profileUrl, authRole }: UserEditReqDto,
        userId: string,
    ): Promise<EditOtherUserResType> {
        const editUserCount = await this.repository.update(
            {
                userId,
            },
            {
                nickname,
                tel,
                profileUrl: profileUrl ?? null,
                authRole,
            },
        );

        if (editUserCount.affected === 1) {
            return {
                isSuccess: true,
                message: '해당 회원 정보를 수정했습니다.',
            };
        }

        throw new NotFoundException('해당 회원은 존재하지 않습니다.');
    }

    // 회원 삭제
    async deleteOtherUser(userId: string): Promise<EditOtherUserResType> {
        const deleteUserCount = await this.repository.delete({
            userId,
        });

        if (deleteUserCount.affected === 1) {
            return {
                isSuccess: true,
                message: '해당 회원 정보를 삭제했습니다.',
            };
        }

        throw new NotFoundException('해당 회원은 존재하지 않습니다.');
    }
}
