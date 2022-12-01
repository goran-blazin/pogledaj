import {Box, Card, CardMedia, Divider, IconButton, Rating, Stack, styled, Typography} from '@mui/material';
import {FavoriteOutlined, SvgIconComponent} from '@mui/icons-material';
import React from 'react';
import {IntRange} from '../../../../types/GeneralTypes';
import _ from 'lodash';
import ImageHelper from '../../../../helpers/ImageHelper';

interface BigCardParams {
  title: string;
  descFirstRow?: string;
  descSecondRow?: string;
  Icon?: SvgIconComponent;
  imageSrc?: string;
  defaultImageSrc: string;
  imageAltText?: string;
  rating?: IntRange<0, 101>;
  onClick?(): unknown;
}

const descCSSStyle = {
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '16px',
  color: 'text.secondary',
};

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'text.secondary',
  },
  '& .MuiRating-iconEmpty': {
    color: '#FFFFFF',
  },
});

function BigCard({
  title,
  descFirstRow,
  descSecondRow,
  Icon = FavoriteOutlined,
  imageSrc,
  defaultImageSrc,
  imageAltText = 'Image',
  rating,
  onClick
}: BigCardParams) {
  const fiveStarRating = rating ? _.round((rating / 100) * 5, 1) : undefined;
  const resizedImageSrc = ImageHelper.getDynamicImagePath({
    imageFilePath: imageSrc || defaultImageSrc,
    transformations: {
      width: 600,
      aspectRatio: {
        width: 1,
        height: 1,
      },
      defaultImage: ImageHelper.getPlaceholderImagePath({
        imageFilePath: defaultImageSrc,
        omitCdnUrl: true,
      }),
    },
  });

  return (
    <Card
      elevation={0}
      onClick={onClick || undefined}
      sx={{
        borderRadius: '4%',
        backgroundColor: 'inherit',
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
            bgcolor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            padding: '0',
            minHeight: '90px',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={'space-between'}
            sx={{
              padding: '8px 11px',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '16px',
                lineHeight: '22px',
                color: 'text.secondary',
                textTransform: 'uppercase',
              }}
            >
              {title}
            </Typography>
            <IconButton aria-label="dodaj u omiljene">
              <Icon
                sx={{
                  color: 'text.secondary',
                }}
              />
            </IconButton>
          </Stack>
          <Divider
            sx={{
              borderColor: 'text.secondary',
              opacity: '0.25',
            }}
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={'space-between'}
            sx={{
              padding: '8px 11px',
            }}
          >
            <Box>
              <Typography variant="body2" sx={descCSSStyle}>
                {descFirstRow}
              </Typography>
              <Typography variant="body2" sx={descCSSStyle}>
                {descSecondRow}
              </Typography>
            </Box>
            {fiveStarRating && (
              <StyledRating
                readOnly
                value={fiveStarRating}
                precision={0.1}
                sx={{
                  color: 'text.secondary',
                }}
                size={'small'}
              />
            )}
          </Stack>
        </Box>
      </Box>
    </Card>
  );
}

export default BigCard;
