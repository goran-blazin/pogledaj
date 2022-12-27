import axios from 'axios';
import Utils from '../helpers/Utils';

export const PogledajApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Browser-Name': Utils.browserInfo.name,
    'X-Browser-Version': Utils.browserInfo.version,
  },
});
