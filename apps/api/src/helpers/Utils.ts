import {join} from 'path';
import {FilterOptions} from '../types/CommonTypes';

export const getAssetsPath = (): string => {
  return join(__dirname, '../..', 'assets');
};

export const resolveReactAdminFilters = (filter: FilterOptions) => {
  if (filter) {
    return Object.entries(filter).reduce<Record<string, unknown>>((carry, keyValue) => {
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
    }, {});
  }

  return {};
};

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Utility function to await promises one by one with error handling
export async function forEachAwait<T, F>(array: T[], callback: (item: T, index: number, array: T[]) => Promise<F>) {
  const res = [];
  for (let i = 0; i < array.length; i++) {
    try {
      const result = await callback(array[i], i, array);
      res.push(result);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error processing item at index ${i}:`, error);
      throw error; // Stops execution on error
    }
  }

  return res;
}
