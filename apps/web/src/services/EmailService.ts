import {SupportEmail} from '../types/EmailTypes';
import {PogledajApi} from './ApiHelper';

const EmailService = {
  async sendSupportEmail(data: SupportEmail) {
    return PogledajApi().post('email/support', data);
  },
};

export default Object.freeze(EmailService);
