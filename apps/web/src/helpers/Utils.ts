import {AxiosError} from 'axios';
import * as _ from 'lodash';
import {AdminUserJwtPayload, AUTH_DATA_LOCAL_STORAGE, AuthData, EnvTypes} from '../types/GeneralTypes';
import jwt_decode from 'jwt-decode';

const Utils = {
  delay(time: number, value = null, rejectDelay = false): Promise<unknown> {
    return new Promise(function (resolve, reject) {
      const callback = rejectDelay ? reject : resolve;
      setTimeout(callback.bind(null, value), time);
    });
  },
  browserInfo: (function (): {name: string; version: string} {
    const ua = navigator.userAgent;
    let tem,
      M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return {name: 'IE', version: tem[1] || ''};
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem !== null) return {name: tem[1].replace('OPR', 'Opera'), version: tem[2]};
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1]);
    return {name: M[0], version: M[1]};
  })(),
  isBetaMode() {
    return parseInt(window.localStorage.getItem('betaMode') || '') === 1;
  },
  convertErrorMessagesToReactAdminForm(
    error: AxiosError,
    keyMap?: Record<string, string>,
  ): Record<string, string> | undefined {
    const messages: Record<string, string[]> | undefined = _.get(error, 'response.data.messages') as unknown as Record<
      string,
      string[]
    >;
    if (messages) {
      const mappedMessages = _.mapValues(messages, (messages) =>
        messages.map((message) => _.upperFirst(message) + '.').join(' '),
      );
      return _.mapKeys(mappedMessages, (_messages, key) => {
        return keyMap && keyMap[key] ? keyMap[key] : key;
      });
    }
  },

  getLoggedUser(): AdminUserJwtPayload {
    const authDataString = localStorage.getItem(AUTH_DATA_LOCAL_STORAGE);
    if (authDataString) {
      const authData: AuthData = JSON.parse(authDataString);
      return jwt_decode<AdminUserJwtPayload>(authData.accessToken);
    }
    throw new Error('User not found');
  },
  get env() {
    return import.meta.env.VITE_ENV as EnvTypes;
  },

  get luxonDateTimeFormat() {
    return 'dd.MM.yyyy / HH:mm';
  },
};

export default Utils;
