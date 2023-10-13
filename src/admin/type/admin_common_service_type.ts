import { User } from '../../auth/user.entity';

export interface GetUserListByPagingAndSearchType {
    users: User[];
    total: number;
    page: number;
    lastPage: number;
}
