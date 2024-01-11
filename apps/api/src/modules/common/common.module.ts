import {Module} from '@nestjs/common';
import {CommonController} from './common.controller';
import {BullModule} from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  controllers: [CommonController],
})
export class CommonModule {}
