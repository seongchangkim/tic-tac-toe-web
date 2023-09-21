import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import config from "config";

interface DBConfigPropertyType {
    port: number,
    host: string,
    type: "mysql" | "mariadb" | undefined,
    timezone: string,
    logging: boolean,
    username: string,
    password: string,
    database: string,
    synchronize: boolean
}

// config.get("db") 타입이 object임.
const dbConfig: DBConfigPropertyType = config.get("db");

// console.log(typeof dbConfig);

export const typeORMConfig : TypeOrmModuleOptions = {
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    timezone: dbConfig.timezone,
    synchronize: dbConfig.synchronize,
    logging: true,
    type: dbConfig.type,
    entities: [
        __dirname + "/../**/*.entity.{ts,js}",
        __dirname + "/../**/entity/*.entity.{ts,js}"
    ],
}