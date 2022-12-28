import { Controller, Get } from '@nestjs/common';
import * as process from 'process';

@Controller('/')
export class AppController {
  @Get()
  main() {
    return `Welcome to pogledajApi - ${process.env.NODE_ENV} environment`;
  }
}
