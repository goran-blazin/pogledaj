import {Person} from '@prisma/client';
import {PersonAdditionalData} from '../../../types/PersonTypes';

export type PersonExtended = Omit<Person, 'additionalData'> & {
  additionalData: PersonAdditionalData;
};
