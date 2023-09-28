import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

interface ServerConfigType {
    port: number;
}

async function bootstrap() {
    // 서버 포트 환경 변수 가져오기
    const serverConfig: ServerConfigType = config.get('server');
    const { port } = serverConfig;

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api');

    await app.listen(port);
}
bootstrap();
