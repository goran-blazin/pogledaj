import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MoviesModule } from './modules/movies/movies.module';
import { PersonsModule } from './modules/persons/persons.module';
import { CinemasModule } from './modules/cinemas/cinemas.module';
import * as Utils from './helpers/Utils';
import configuration from './config/configuration';
import { PrismaModule } from './modules/prisma/prisma.module';
import * as process from 'process';
import { NodeEnv } from './types/CommonTypes';
import { AppController } from './app/app.controller';
import { BullModule } from '@nestjs/bull';
import { EmailModule } from './modules/email/email.module';
const env: NodeEnv = (process.env.NODE_ENV as NodeEnv)
  ? (process.env.NODE_ENV as NodeEnv)
  : 'local';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./.env.${env}`,
      isGlobal: true,
      load: [configuration],
    }),
    ServeStaticModule.forRoot({
      rootPath: Utils.getAssetsPath(),
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
      prefix: 'PogledajRedisQueue',
      defaultJobOptions: {
        attempts: 3,
        timeout: 60000,
        removeOnComplete: true,
        removeOnFail: false,
      },
    }),
    PrismaModule,
    MoviesModule,
    PersonsModule,
    CinemasModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
