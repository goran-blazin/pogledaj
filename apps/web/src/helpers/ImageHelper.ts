import AppConfig from '../config/AppConfig';

const ImageHelper = {
  getImagePath(imageFileName: string): string {
    return AppConfig.getCDNUrl() + imageFileName;
  },

  getPlaceholderPath(): string {
    return '/img/placeholders/';
  },
};

export default ImageHelper;
