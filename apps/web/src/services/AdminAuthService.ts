import {PogledajApi} from './ApiHelper';
import {AuthData} from '../types/GeneralTypes';

const AdminAuthService = {
  async localLogin(email: string, password: string): Promise<AuthData> {
    const result = await PogledajApi().post(`adminAuth/local`, {
      email,
      password,
    });

    return {
      accessToken: result.data['accessToken'],
    };
  },
};

export default Object.freeze(AdminAuthService);
