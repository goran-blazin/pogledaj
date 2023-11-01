import { join } from 'path';
import { FilterOptions } from '../types/CommonTypes';

export const getAssetsPath = (): string => {
  return join(__dirname, '../..', 'assets');
};

export const resolveReactAdminFilters = (filter: FilterOptions) => {
  if (filter) {
    return Object.entries(filter).reduce<Record<string, unknown>>(
      (carry, keyValue) => {
        const [filterKey, filterValue] = keyValue;
        // parse for getMany
        if (filterKey === 'ids' && filterValue) {
          carry['id'] = {
            in: filter.ids,
          };
        } else {
          // parse for filtering
          if (Array.isArray(filterValue)) {
            carry[filterKey] = {
              in: filterValue,
            };
          } else {
            carry[filterKey] = filterValue;
          }
        }

        return carry;
      },
      {},
    );
  }

  return {};
};
