import * as sgMail from '@sendgrid/mail';
import { Injectable } from '@nestjs/common';
import { EmailJobData } from './email.types';
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

@Injectable()
export class SendGridService {
  async sendNewEmail(emailJobData: EmailJobData) {
    const msg = {
      to: emailJobData.toEmails, // Change to your recipient
      from: 'goran.blazin@gmail.com', // Change to your verified sender
      subject: emailJobData.subject,
      html: `<p>${emailJobData.html}</p>`,
    };

    return sgMail.send(msg);
  }
}
