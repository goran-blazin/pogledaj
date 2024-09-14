import {AxiosError} from 'axios';
import _ from 'lodash';
import {AdminUserJwtPayload, AUTH_DATA_LOCAL_STORAGE, AuthData, EnvTypes} from '../types/GeneralTypes';
import jwt_decode from 'jwt-decode';
import {Movie} from '../types/MoviesTypes';

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

  // Utility function to await promises one by one with error handling
  async forEachAwait<T>(array: T[], callback: (item: T, index: number, array: T[]) => Promise<void>): Promise<void> {
    for (let i = 0; i < array.length; i++) {
      try {
        await callback(array[i], i, array);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error processing item at index ${i}:`, error);
        throw error; // Stops execution on error
      }
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

  get luxonDateFormat() {
    return 'dd.MM.yyyy';
  },

  getUserLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position);
          },
          (error) => {
            reject(error);
          },
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  },

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  },

  wrapSubstringInTag(text: string, substring: string, tag: string = 'span') {
    const _substring = substring.trim();
    if (_substring) {
      // Create a regular expression to find all occurrences of 'substring'
      // 'g' flag for global search and 'i' for case-insensitive
      const regex = new RegExp(`(${substring})`, 'gi');

      // Replace each occurrence with the substring wrapped in a <span> tag
      return text.replace(regex, `<${tag}>$1</${tag}>`);
    } else {
      return text;
    }
  },

  getMovieTitle(movie: Movie) {
    return movie.title || movie.originalTitle;
  },
};

export default Utils;
