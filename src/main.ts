import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

interface ServerConfigType {
    port: number;
}

async function bootstrap() {
    // 서버 포트 환경 변수 가져오기
    const serverConfig: ServerConfigType = config.get('server');
    const { port } = serverConfig;

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api');
    app.use(cookieParser());

    const swaggerConfig = new DocumentBuilder()
        .setTitle('tic-tac-toe 게임 API 문서')
        .setDescription('tic-tac-toe 게임 API 설명')
        .setVersion('0.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api-docs', app, document, {
        swaggerOptions: { defaultModelsExpandDepth: -1 },
    });

    await app.listen(port);
}
bootstrap();
