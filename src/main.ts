import { NestFactory } from '@nestjs/core';
import { AppModule } from './application.module';
import config from 'config';

type ServerType = {
  port: number
}

async function bootstrap() {
  const server = await NestFactory.create(AppModule);
  const serverConfig: ServerType = config.get('server');
  const port = serverConfig.port;

  await server.listen(port);
}

bootstrap();
