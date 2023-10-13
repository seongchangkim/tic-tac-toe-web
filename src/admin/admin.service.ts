import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { GetUserListByPagingAndSearchType } from './type/admin_common_service_type';

@Injectable()
export class AdminService {
    constructor(private repository: AdminRepository) {}

    async getUserListByPagingAndSearch(
        page: number,
        cond: string,
        keyword: string,
    ): Promise<GetUserListByPagingAndSearchType> {
        const take = 10;
        const query = this.repository
            .createQueryBuilder('user')
            .select([
                'user.user_id',
                'user.email',
                'user.nickname',
                'user.tel',
                'user.created_at',
                'user.auth_role',
                'user.social_login_type',
                'user.profile_url',
            ]);

        if (cond !== undefined && keyword !== undefined) {
            query
                .where(`user.${cond} like :keyword`, {
                    keyword: `%${keyword}%`,
                })
                .skip((page - 1) * take)
                .take(take)
                .orderBy('user.user_id');
        } else {
            query
                .skip((page - 1) * take)
                .take(take)
                .orderBy('user.user_id');
        }

        const [users, total] = await query.getManyAndCount();

        return {
            users,
            total,
            page: page * 1,
            lastPage: Math.ceil(total / take),
        };
    }
}
