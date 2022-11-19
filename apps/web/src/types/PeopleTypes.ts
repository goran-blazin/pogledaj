import {Country} from './GeneralTypes';

export type Person = {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  countryOfOrigin?: Country;
};

export type ActorMovie = {
  person: Person;
  role: 'Main' | 'Supporting' | 'Extra' | 'Cameo';
};

export type DirectorMovie = {
  person: Person;
  type: 'Main' | 'Assistant';
};

export type ProducerMovie = {
  person: Person;
  type: 'Executive' | 'Assistant';
};
