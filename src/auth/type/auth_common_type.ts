import { AuthRole } from '../enum/auth_role.enum';
import { Request } from 'express';
import { User } from '../user.entity';
import { SocialLoginType } from '../enum/social_login_type.enum';

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
    social_login_type: SocialLoginType;
}

export interface AuthCheckRes {
    user: ResUserType;
    isAuth: boolean;
}

// 로그인 Response 값 타입
export interface LoginRes extends AuthCheckRes {
    accessToken: string;
}

// 소셜로그인 회원이 존재하지 않는 경우에 보내는 Reponse 타입
export interface NotFoundSocialLoginUserType {
    email: string;
    nickname: string;
    social_login_type: SocialLoginType;
}

// 소셜로그인 Response 값 타입
export type SocialLoginRes = LoginRes | NotFoundSocialLoginUserType;
