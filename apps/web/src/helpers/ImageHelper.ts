import AppConfig from '../config/AppConfig';

type ImageTransformations = {
  width?: number;
  height?: number;
  aspectRatio?: {
    width: number;
    height: number;
  };
  defaultImage?: string;
  backgroundColor?: string;
  padResize?: boolean;
};

type ImageCdnParams = {
  imageFilePath: string;
  transformations?: ImageTransformations;
  omitCdnUrl?: boolean;
};

const mapTransformation = (transformations: ImageTransformations) => {
  return (Object.keys(transformations) as Array<keyof typeof transformations>).map((transformationKey) => {
    if (transformationKey === 'width') {
      return `w-${transformations.width}`;
    } else if (transformationKey === 'height') {
      return `h-${transformations.height}`;
    } else if (transformationKey === 'aspectRatio' && transformations.aspectRatio) {
      return `ar-${transformations.aspectRatio.width}-${transformations.aspectRatio.height}`;
    } else if (transformationKey === 'defaultImage' && transformations.defaultImage) {
      return `di-${transformations.defaultImage}`.replaceAll('/', '@@');
    } else if (transformationKey === 'padResize' && transformations.padResize) {
      return `cm-pad_resize`;
    } else if (transformationKey === 'backgroundColor') {
      return `bg-${transformations.backgroundColor}`;
    } else {
      return '';
    }
  });
};

const ImageHelper = {
  getImagePath({imageFilePath, transformations, omitCdnUrl = false}: ImageCdnParams): string {
    const transformationsArray = transformations ? mapTransformation(transformations) : [];
    const transformationsString = transformationsArray.length ? '?tr=' + transformationsArray.join(',') : '';

    return (omitCdnUrl ? '' : AppConfig.getCDNUrl()) + 'images/' + imageFilePath + transformationsString;
  },

  getDynamicImagePath({imageFilePath, transformations}: ImageCdnParams): string {
    return ImageHelper.getImagePath({
      imageFilePath: 'dynamic/' + imageFilePath,
      transformations,
    });
  },

  getPlaceholderImagePath({imageFilePath, transformations, omitCdnUrl}: ImageCdnParams): string {
    return ImageHelper.getImagePath({
      imageFilePath: 'placeholders/' + imageFilePath,
      transformations,
      omitCdnUrl,
    });
  },
};

export default ImageHelper;
