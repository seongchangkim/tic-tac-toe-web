import { SocialLoginType } from '../enum/social_login_type.enum';

// 회원 등록 파라미터 타입
interface CommonRegisterUserType {
    user_id: string;
    email: string;
    nickname: string;
    social_login_type: SocialLoginType;
}

// 회원가입용 회원 등록 처리 메서드 파라미터 타입
export interface SignUpUserType extends CommonRegisterUserType {
    tel: string;
}

// 소셜로그인용 회원 등록 처리 메서드 파라미터 타입
export interface SocialUserType extends CommonRegisterUserType {
    profile_url: string;
}
