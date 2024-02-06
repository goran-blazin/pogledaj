import {Module} from '@nestjs/common';
import {CommonController} from './common.controller';
import {QueuesDefinition} from '../../helpers/QueuesHelper';
import {BullModule} from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue(
      ...[QueuesDefinition.EMAIL.name, QueuesDefinition.INSERT_MOVIES.name].map((name) => ({
        name,
      })),
    ),
  ],
  controllers: [CommonController],
})
export class CommonModule {}
