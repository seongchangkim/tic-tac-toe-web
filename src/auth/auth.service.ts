import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from './user.repository';
import { SignUpForm } from './dto/sign_up_form.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { IsSuccess, LoginRes } from './type/auth_common_type';
import { LoginForm } from './dto/login_form.dto';
import { JwtService } from '@nestjs/jwt';
import { SocialLoginType } from './enum/social_login_type.enum';
import { SocialLoginReqForm } from './dto/social_login_req_form.dto';
import {
    SignUpUserType,
    SocialUserType,
} from './type/auth_common_service_type';

@Injectable()
export class AuthService {
    constructor(
        private repository: UserRepository,
        private jwtService: JwtService,
    ) {}

    private logger = new Logger('AuthService');

    async signUp({
        email,
        password,
        nickname,
        tel,
    }: SignUpForm): Promise<IsSuccess> {
        try {
            const signUpUser: User = await this.registerUser(
                {
                    userId: uuidv4(),
                    email,
                    nickname,
                    tel,
                    socialLoginType: SocialLoginType.NONE,
                },
                password
            );

            await this.repository.save(signUpUser);

            return {
                success: signUpUser !== undefined ? true : false,
                errorMessage:
                    signUpUser !== undefined
                        ? undefined
                        : '회원가입 실패했습니다.',
            };
        } catch (e) {
            this.logger.error(e.message);
            return {
                success: false,
                errorMessage: '관리자과 문의하세요',
            };
        }
    }

    async login({ email, password }: LoginForm): Promise<LoginRes> {
        const loginedUser = await this.repository.findOne({
            where: {
                email,
            },
        });

        if (loginedUser && bcrypt.compare(password, loginedUser.password)) {
            return this.getLoginRes(loginedUser, undefined);
        } else {
            throw new NotFoundException(
                '아이디 또는 비밀번호가 일치하지 않습니다.',
            );
        }
    }

    async socialLogin(
        socialLoginType: SocialLoginType,
        { email, nickname, profileUrl, accessToken }: SocialLoginReqForm,
    ): Promise<LoginRes> {
        const existedUser = await this.repository.findOne({
            where: {
                email,
                nickname,
                socialLoginType,
            },
        });

        if (!existedUser) {
            const registerSocialUser: User = await this.registerUser(
                {
                    userId: uuidv4(),
                    email,
                    nickname,
                    socialLoginType,
                    profileUrl,
                },
                uuidv4(),
            );

            await this.repository.save(registerSocialUser);

            return this.getLoginRes(registerSocialUser, accessToken);
        }

        return this.getLoginRes(existedUser, accessToken);
    }

    // 회원 등록
    private async registerUser(
        param: SignUpUserType | SocialUserType,
        inputPassword: string,
    ): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(inputPassword, salt);
        return this.repository.create({
            password: hashedPassword,
            ...param,
        });
    }

    // 로그인 반환값 가져오기(feat 소셜 로그인)
    private async getLoginRes(
        { userId, nickname, tel, authRole, socialLoginType, profileUrl }: User,
        token: string | undefined,
    ): Promise<LoginRes> {
        const payload = {
            userId,
            nickname,
            tel,
            authRole,
            socialLoginType,
            profileUrl,
        };

        const accessToken =
            token !== undefined ? token : await this.jwtService.sign(payload);

        return {
            accessToken,
            user: payload,
            isAuth: true,
        };
    }
}
