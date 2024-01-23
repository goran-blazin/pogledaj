import {PogledajApi} from './ApiHelper';
import {Person} from '../types/PeopleTypes';

const PersonsService = {
  async searchDirectorsByName(searchText: string): Promise<Person[]> {
    const result = await PogledajApi().get('persons/searchDirectorsByName', {
      params: {
        searchText,
      },
    });

    return result.data;
  },

  async searchActorsByName(searchText: string): Promise<Person[]> {
    const result = await PogledajApi().get('persons/searchActorsByName', {
      params: {
        searchText,
      },
    });

    return result.data;
  },
};
export default Object.freeze(PersonsService);
