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
  omitCdnURL?: boolean;
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
  getImagePath({imageFilePath, transformations, omitCdnURL = false}: ImageCdnParams): string {
    const transformationsArray = transformations ? mapTransformation(transformations) : [];
    const transformationsString = transformationsArray.length ? '?tr=' + transformationsArray.join(',') : '';

    return (omitCdnURL ? '' : AppConfig.getCDNUrl()) + imageFilePath + transformationsString;
  },

  getPlaceholderImagePath({imageFilePath, transformations, omitCdnURL}: ImageCdnParams): string {
    return ImageHelper.getImagePath({
      imageFilePath: 'images/placeholders/' + imageFilePath,
      transformations,
      omitCdnURL,
    });
  },
};

export default ImageHelper;
