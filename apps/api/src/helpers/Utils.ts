import { join } from 'path';

export const getAssetsPath = (): string => {
  return join(__dirname, '../..', 'assets');
};
