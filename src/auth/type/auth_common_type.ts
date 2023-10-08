import { AuthRole } from '../enum/auth_role.enum';
import { Request } from 'express';
import { User } from '../user.entity';

// 회원가입 Response 값 타입
export interface IsSuccess {
    success: boolean;
    errorMessage: string | undefined;
}

// 로그인 시 반환할 회원 정보 타입
interface ResUserType {
    userId: string;
    nickname: string;
    tel: string;
    role: AuthRole;
}

export interface AuthCheckRes {
    user: ResUserType;
    isAuth: boolean;
}

// 로그인 Response 값 타입
export interface LoginRes extends AuthCheckRes {
    accessToken: string;
}

// 로그아웃 Request 값 타입
export interface RequestWithUser extends Request {
    user: User;
}
