import {Box, Card, CardMedia, Typography} from '@mui/material';
import {SvgIconComponent} from '@mui/icons-material';
import React from 'react';
import {IntRange} from '../../../../types/GeneralTypes';
import ImageHelper from '../../../../helpers/ImageHelper';
import {Link} from 'react-router-dom';

interface SmallCardParams {
  title: string;
  descFirstRow?: string;
  descSecondRow?: string;
  Icon?: SvgIconComponent;
  imageSrc?: string;
  defaultImageSrc: string;
  imageAltText?: string;
  rating?: IntRange<0, 101>;
  onClick?(): unknown;
  anchorUrl?: string;
}

function SmallCard({title, imageSrc, defaultImageSrc, imageAltText = 'Image', onClick, anchorUrl}: SmallCardParams) {
  const resizedImageSrc = ImageHelper.getImagePath({
    imageFilePath: imageSrc || defaultImageSrc,
    transformations: {
      width: 400,
      height: 656,
      defaultImage: ImageHelper.getPlaceholderImagePath({
        imageFilePath: defaultImageSrc,
        omitCdnURL: true,
      }),
    },
  });

  const SmallCardEl = (
    <Card
      elevation={0}
      onClick={onClick || undefined}
      sx={{
        borderRadius: '15px',
        backgroundColor: 'inherit',
        margin: '4px 0',
      }}
    >
      <Box sx={{position: 'relative'}}>
        <CardMedia component="img" image={resizedImageSrc} alt={imageAltText} />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            color: 'secondary.main',
            padding: '0 10px',
            minHeight: '42px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '8px',
              lineHeight: '9px',
              color: 'text.secondary',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
  return anchorUrl ? <Link to={anchorUrl}>{SmallCardEl}</Link> : SmallCardEl;
}

export default SmallCard;
