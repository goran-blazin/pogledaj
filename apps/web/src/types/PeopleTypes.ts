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

export type Actor = {
  person: Person;
  role: 'Main' | 'Supporting' | 'Extra' | 'Cameo';
};

export type Director = {
  person: Person;
  type: 'Main' | 'Assistant';
};

export type Producer = {
  person: Person;
  type: 'Executive' | 'Assistant';
};
