import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'web-client/dist'),
        }),
        TypeOrmModule.forRoot(typeORMConfig),
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
