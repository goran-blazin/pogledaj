import axios from 'axios';
import Utils from '../helpers/Utils';
import {AUTH_DATA_LOCAL_STORAGE, AuthData} from '../types/GeneralTypes';

export const PogledajApi = () =>
  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'X-Browser-Name': Utils.browserInfo.name,
      'X-Browser-Version': Utils.browserInfo.version,
      Authorization: (() => {
        const authDataString = localStorage.getItem(AUTH_DATA_LOCAL_STORAGE);
        if (authDataString) {
          const authData: AuthData = JSON.parse(authDataString);

          if (authData.accessToken) {
            return `Bearer ${authData.accessToken}`;
          }
        }
      })(),
    },
  });
