import {Injectable} from '@nestjs/common';
import {SupportEmailDto} from './dto/supportEmail.dto';
import {EmailJobData} from './email.types';
import {QueuesDefinition} from '../../helpers/QueuesHelper';
import {InjectQueue} from '@nestjs/bullmq';
import {Queue} from 'bullmq';
const sendSupportEmailsTo: string[] = [
  'goran.blazin@gmail.com',
  'pedjalaya@gmail.com',
  'danijel.avramov@gmail.com',
  'igor.jockovic@gmail.com',
  'milosblazin@gmail.com',
];

@Injectable()
export class EmailService {
  constructor(@InjectQueue(QueuesDefinition.EMAIL.name) private readonly emailQueue: Queue<EmailJobData>) {}
  async sendSupportEmail(supportEmailDto: SupportEmailDto) {
    const html = `
      <html>
        <p>Ime i prezime: ${supportEmailDto.name}</p>
        <p>Email: ${supportEmailDto.email}</p>
        <p>Telefon: ${supportEmailDto.telephone || 'N/A'}</p>
        <p>Poruka:</p>
        <p>${supportEmailDto.message}</p>
      </html>
    `;

    return this.emailQueue.add(QueuesDefinition.EMAIL.jobs.SUPPORT_EMAIL, {
      html: html,
      subject: `Nova poruka za podrsku od ${supportEmailDto.email}`,
      toEmails: sendSupportEmailsTo,
      emailType: 'SupportEmail',
    });
  }
}
