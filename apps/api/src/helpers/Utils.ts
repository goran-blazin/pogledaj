import { join } from 'path';
import { FilterOptions } from '../types/CommonTypes';

export const getAssetsPath = (): string => {
  return join(__dirname, '../..', 'assets');
};

export const resolveReactAdminFilters = (filter: FilterOptions) => {
  return filter
    ? {
        id: filter.ids
          ? {
              in: filter.ids,
            }
          : undefined,
      }
    : {};
};
