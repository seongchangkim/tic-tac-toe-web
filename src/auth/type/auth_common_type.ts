import { AuthRole } from '../enum/auth_role.enum';
import { SocialLoginType } from '../enum/social_login_type.enum';

// 회원가입 Response 값 타입
export interface IsSuccess {
    success: boolean;
    errorMessage: string | undefined;
    userId: string | undefined;
}

// 로그인 시 반환할 회원 정보 타입
export interface ResUserType {
    userId: string;
    nickname: string;
    tel: string;
    authRole: AuthRole;
    socialLoginType: SocialLoginType;
    profileUrl: string;
}

export interface AuthCheckRes {
    user: ResUserType;
    isAuth: boolean;
}

// 로그인 Response 값 타입
export interface LoginRes extends AuthCheckRes {
    accessToken: string;
}
