import AppConfig from '../config/AppConfig';

type ImageCdnParams = {
  imageFileName: string;
};

const ImageHelper = {
  getDynamicImagePath({imageFileName}: ImageCdnParams): string {
    return AppConfig.getCDNUrl() + 'images/dynamic/' + imageFileName;
  },

  getPlaceholderImagePath({imageFileName}: ImageCdnParams): string {
    return AppConfig.getCDNUrl() + 'images/placeholders/' + imageFileName;
  },
};

export default ImageHelper;
