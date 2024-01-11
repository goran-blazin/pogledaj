import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {BadRequestException, Logger} from '@nestjs/common';
import {PrismaService} from './modules/prisma/prisma.service';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';
import {useContainer} from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const errorMessages = errors.reduce((carry: Record<string, string[]>, error) => {
          if (error.constraints) {
            carry[error.property] = Object.values(error.constraints).map((message) => message.trim());
          }

          return carry;
        }, {});
        return new BadRequestException({
          statusCode: 400,
          messages: errorMessages,
          error: 'Bad Request',
        });
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('PogledajAPI')
    .setDescription('API description of Pogledaj app')
    .setVersion('0.1')
    .addTag('movies')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env['APP_LISTEN_PORT'] || 8080);

  Logger.log(
    `Started listening Pogledaj-api Nest app on port ${process.env['APP_LISTEN_PORT']}`,
    'MainBootstrapFunction',
  );
  useContainer(app.select(AppModule), {fallbackOnErrors: true});

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}
bootstrap();
