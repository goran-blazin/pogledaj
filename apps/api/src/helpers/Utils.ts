import { join } from 'path';

const Utils = Object.freeze({
  getAssetsPath(): string {
    return join(__dirname, '../..', 'assets');
  },
});

export default Utils;
