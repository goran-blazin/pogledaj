import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import Utils from './helpers/Utils';
import configuration from "./config/configuration";
const env = process.env.NODE_ENV ? process.env.NODE_ENV : '';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./config/${env}.env`,
      isGlobal: true,
      load: [configuration]
    }),
    ServeStaticModule.forRoot({
      rootPath: Utils.getAssetsPath(),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
