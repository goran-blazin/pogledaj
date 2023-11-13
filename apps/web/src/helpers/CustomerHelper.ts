import {DateTime} from 'ts-luxon';

const CustomerHelper = {
  formatDateMovieProjection: (date: string) => DateTime.fromISO(date).toFormat('dd.MM.yyyy / HH:mm'),
};

export default CustomerHelper;
