import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AdminModule } from './admin/admin.module';
import { GameroomModule } from './gameroom/gameroom.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'web_client/dist'),
        }),
        TypeOrmModule.forRoot(typeORMConfig),
        AuthModule,
        AdminModule,
        GameroomModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
