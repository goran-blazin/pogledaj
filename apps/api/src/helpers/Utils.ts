import { join } from 'path';

const Utils = Object.freeze({
  getPublicPath(): string {
    return join(__dirname, '../..', 'public');
  },
});

export default Utils;
