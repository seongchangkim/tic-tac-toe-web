import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import * as config from 'config';
import { JWTConfigType } from '../type/config_type';

const jwtConfig: JWTConfigType = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {
        super({
            secretOrKey: jwtConfig.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload) {
        const { userId } = payload;
        const user = await this.userRepository.findOne({
            where: {
                user_id: userId,
            },
        });

        if (!user) {
            throw new UnauthorizedException('다시 로그인하세요.');
        }

        return user;
    }
}
