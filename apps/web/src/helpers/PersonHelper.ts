import {Person} from '../types/PeopleTypes';

const PersonHelper = {
  concatName(person: Person): string {
    return person.firstName + (person.middleName ? ` (${person.middleName}) ` : ' ') + person.lastName;
  },
};

export default PersonHelper;
