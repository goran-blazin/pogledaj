import {DateTime} from 'ts-luxon';
import Utils from './Utils';

const CustomerHelper = {
  formatDateMovieProjection: (date: string) => DateTime.fromISO(date).toFormat(Utils.luxonDateTimeFormat),
};

export default CustomerHelper;
