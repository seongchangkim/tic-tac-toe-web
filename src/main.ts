import { NestFactory } from '@nestjs/core';
import { AppModule } from './application.module';
import config from 'config';
import { ValidationPipe } from '@nestjs/common';

interface ServerType {
  port: number
}

async function bootstrap() {
  const server = await NestFactory.create(AppModule);
  server.useGlobalPipes(new ValidationPipe())
  const serverConfig: ServerType = config.get('server');
  const port = serverConfig.port;

  await server.listen(port);
}

bootstrap();
