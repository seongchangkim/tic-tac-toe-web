import { JwtModuleOptions } from '@nestjs/jwt';
import * as config from 'config';
import { JWTConfigType } from '../type/config_type';

const jwtConfig: JWTConfigType = config.get('jwt');

export const jwtOptions: JwtModuleOptions = {
    secret: jwtConfig.secret,
    signOptions: {
        expiresIn: jwtConfig.expiresIn,
    },
};
