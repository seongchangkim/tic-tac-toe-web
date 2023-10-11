import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from './user.repository';
import { SignUpForm } from './dto/sign_up_form.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { IsSuccess, LoginRes, SocialLoginRes } from './type/auth_common_type';
import { LoginForm } from './dto/login_form.dto';
import { JwtService } from '@nestjs/jwt';
import { SocialLoginType } from './enum/social_login_type.enum';
import { SocialLoginReqForm } from './dto/social_login_req_form.dto';

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
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const signUpUser: User = this.repository.create({
                user_id: uuidv4(),
                email,
                password: hashedPassword,
                nickname,
                tel,
            });

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
            const payload = {
                userId: loginedUser.user_id,
                nickname: loginedUser.nickname,
                tel: loginedUser.tel,
                role: loginedUser.auth_role,
                social_login_type: loginedUser.social_login_type,
            };

            const accessToken = await this.jwtService.sign(payload);
            return {
                accessToken,
                user: payload,
                isAuth: true,
            };
        } else {
            throw new NotFoundException(
                '아이디 또는 비밀번호가 일치하지 않습니다.',
            );
        }
    }

    async socialLogin(
        socialLoginType: SocialLoginType,
        { email, nickname }: SocialLoginReqForm,
    ): Promise<SocialLoginRes> {
        const existedUser = await this.repository.findOne({
            where: {
                email,
                nickname,
                social_login_type: socialLoginType,
            },
        });

        if (!existedUser) {
            return {
                email,
                nickname,
                social_login_type: socialLoginType,
            };
        }

        const payload = {
            userId: existedUser.user_id,
            nickname: existedUser.nickname,
            tel: existedUser.tel,
            role: existedUser.auth_role,
            social_login_type: existedUser.social_login_type,
        };

        const accessToken = await this.jwtService.sign(payload);
        return {
            accessToken,
            user: payload,
            isAuth: true,
        };
    }
}
