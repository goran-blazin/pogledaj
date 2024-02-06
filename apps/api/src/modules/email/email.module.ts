import {Module} from '@nestjs/common';
import {EmailController} from './email.controller';
import {EmailService} from './email.service';
import {EmailProcessor} from './email.processor';
import {SendGridService} from './sendGrid.service';
import {QueuesDefinition} from '../../helpers/QueuesHelper';
import {BullModule} from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueuesDefinition.EMAIL.name,
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService, EmailProcessor, SendGridService],
})
export class EmailModule {}
