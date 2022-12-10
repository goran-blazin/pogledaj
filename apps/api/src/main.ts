import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env['APP_LISTEN_PORT']);
  Logger.log(
    `Started listening Pogledaj-api Nest app on port ${process.env['APP_LISTEN_PORT']}`,
    'MainBootstrapFunction',
  );
}
bootstrap();
