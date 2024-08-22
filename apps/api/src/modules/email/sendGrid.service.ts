import MailService from '@sendgrid/mail';
import {Injectable} from '@nestjs/common';
import {EmailJobData} from './email.types';

@Injectable()
export class SendGridService {
  constructor() {
    MailService.setApiKey(process.env.SENDGRID_API_KEY as string);
  }
  async sendNewEmail(emailJobData: EmailJobData) {
    const msg = {
      to: emailJobData.toEmails, // Change to your recipient
      from: 'no-reply@pogledaj.rs', // Change to your verified sender
      subject: emailJobData.subject,
      html: `<p>${emailJobData.html}</p>`,
    };

    return MailService.send(msg);
  }
}
