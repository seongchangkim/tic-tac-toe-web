import { User } from '../../auth/user.entity';

// 회원 목록 Response 값 타입
export interface GetUserListByPagingAndSearchResType {
    users: User[];
    total: number;
    page: number;
    lastPage: number;
}

// 회원 상세보기 Response 값 타입
export interface getOtherUserInfoResType {
    email: string;
    nickname: string;
    tel: string;
    authRole: string;
    socialLoginType: string;
    profileUrl: string;
}
