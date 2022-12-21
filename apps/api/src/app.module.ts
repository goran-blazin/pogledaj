import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MoviesModule } from './modules/movies/movies.module';
import { PersonsModule } from './modules/persons/persons.module';
import { CinemasModule } from './modules/cinemas/cinemas.module';
import * as Utils from './helpers/Utils';
import configuration from './config/configuration';
import { PrismaService } from "./modules/prisma/prisma.service";
import { PrismaModule } from "./modules/prisma/prisma.module";
const env = process.env.NODE_ENV ? process.env.NODE_ENV : '';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./config/${env}.env`,
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
  providers: [PrismaService],
})
export class AppModule {}
