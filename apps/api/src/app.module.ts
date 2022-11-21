import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import Utils from './helpers/Utils';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: Utils.getPublicPath(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
