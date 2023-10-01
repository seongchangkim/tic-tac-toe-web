import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { join } from 'path';

interface DBConfigType {
    type: 'mysql' | 'mariadb' | undefined;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    timezone: string;
    logging: boolean;
    synchronize: boolean;
}

const dbConfig: DBConfigType = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    timezone: dbConfig.timezone,
    logging: dbConfig.logging,
    synchronize: dbConfig.synchronize,
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
};
