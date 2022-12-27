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
    PrismaModule,
    MoviesModule,
    PersonsModule,
    CinemasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
