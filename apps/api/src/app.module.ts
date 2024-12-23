import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ServeStaticModule} from '@nestjs/serve-static';
import {MoviesModule} from './modules/movies/movies.module';
import {PersonsModule} from './modules/persons/persons.module';
import {CinemasModule} from './modules/cinemas/cinemas.module';
import * as Utils from './helpers/Utils';
import configuration from './config/configuration';
import {PrismaModule} from './modules/prisma/prisma.module';
import process from 'process';
import {NodeEnv} from './types/CommonTypes';
import {EmailModule} from './modules/email/email.module';
import {CommonModule} from './modules/common/common.module';
import {MovieProjectionsModule} from './modules/movieProjections/movieProjections.module';
import {AdminAuthModule} from './modules/adminAuth/adminAuth.module';
import {AdminUsersModule} from './modules/adminUsers/adminUsers.module';
import {GeolocationModule} from './modules/geolocation/geolocation.module';
import {ReservationsModule} from './modules/reservations/reservations.module';
import {BullModule} from '@nestjs/bullmq';
import Redis from 'ioredis';

const env: NodeEnv = (process.env.NODE_ENV as NodeEnv) ? (process.env.NODE_ENV as NodeEnv) : 'local';
const redisConnString = process.env.REDIS_URL as string;
const redisConnection = new Redis(redisConnString, {
  maxRetriesPerRequest: null,
});

const REDIS_APP_PREFIX = `POGLEDAJ-ENV-${env}`;
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
      connection: redisConnection,
      prefix: `${REDIS_APP_PREFIX}-BULLMQ`,
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: true,
        removeOnFail: false,
      },
    }),
    PrismaModule,
    MoviesModule,
    PersonsModule,
    CinemasModule,
    EmailModule,
    CommonModule,
    MovieProjectionsModule,
    AdminAuthModule,
    AdminUsersModule,
    GeolocationModule,
    ReservationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
