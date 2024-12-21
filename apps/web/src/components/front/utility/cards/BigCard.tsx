import {Box, Card, CardMedia, Divider, IconButton, Rating, styled, Typography} from '@mui/material';
import {FavoriteOutlined, SvgIconComponent} from '@mui/icons-material';
import {IntRange} from '../../../../types/GeneralTypes';
import _ from 'lodash';
import ImageHelper from '../../../../helpers/ImageHelper';
import Utils from '../../../../helpers/Utils';
import {Link} from 'react-router-dom';

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
  anchorUrl?: string;
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

const BigCardInfoWrap = styled(Box)({
  padding: '8px 10px',
  '& > div': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  onClick,
  anchorUrl,
}: BigCardParams) {
  const fiveStarRating = rating ? _.round((rating / 100) * 5, 1) : undefined;
  const resizedImageSrc = ImageHelper.getImagePath({
    imageFilePath: imageSrc || defaultImageSrc,
    transformations: {
      width: 600,
      // aspectRatio: {
      //   width: 1,
      //   height: 1,
      // },
      defaultImage: ImageHelper.getPlaceholderImagePath({
        imageFilePath: defaultImageSrc,
        omitCdnURL: true,
      }),
    },
  });

  const BigCardEl = (
    <Card
      elevation={0}
      onClick={onClick || undefined}
      sx={{
        borderRadius: '15px',
        backgroundColor: 'inherit',
        border: '2px solid rgba(255, 255, 255, 0.25)',
      }}
    >
      <Box sx={{position: 'relative'}}>
        <CardMedia
          component="img"
          image={resizedImageSrc}
          alt={imageAltText}
          sx={{
            aspectRatio: {
              xs: '1/1',
              sm: '1/1.5',
            },
          }}
        />
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
          <BigCardInfoWrap>
            <Box>
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
              {Utils.isBetaMode() && (
                <IconButton aria-label="dodaj u omiljene">
                  <Icon
                    sx={{
                      color: 'text.secondary',
                    }}
                  />
                </IconButton>
              )}
            </Box>
            <Divider
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.25)',
                paddingTop: '8px',
                marginBottom: '8px',
              }}
            />
            <Box>
              <Box>
                <Typography variant="body2" sx={descCSSStyle}>
                  {descFirstRow}
                </Typography>
                <Typography variant="body2" sx={descCSSStyle}>
                  {descSecondRow}
                </Typography>
              </Box>
              {Utils.isBetaMode() ? (
                <>
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
                </>
              ) : null}
            </Box>
          </BigCardInfoWrap>
        </Box>
      </Box>
    </Card>
  );

  return anchorUrl ? <Link to={anchorUrl}>{BigCardEl}</Link> : BigCardEl;
}

export default BigCard;
