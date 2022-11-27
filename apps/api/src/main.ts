import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port:number|string = process.env['APP_LISTEN_PORT'] || 3000;
  await app.listen(port);
  Logger.log(`Started listening Pogledaj-api Nest app on port ${port.toString()}`, "MainBootstrapFunction");
}
bootstrap();