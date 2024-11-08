import {styled} from '@mui/material';
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';
import {Box} from '@mui/material';

const RatingInfoStyled = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
}));
const RatingNumber = styled(Box)(({theme}) => ({
  color: theme.colorPalette.darkGrey.color,
  fontSize: '12px',
}));

function RatingIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10.0164 15.3408C10.3174 15.1746 10.6826 15.1746 10.9836 15.3408L15.5835 17.8821C16.3502 18.3057 17.2524 17.6086 17.0361 16.7598L15.881 12.2279C15.7837 11.8459 15.9198 11.4423 16.2287 11.1974L20.0033 8.20431C20.7157 7.63948 20.3658 6.49415 19.4594 6.42376L14.3154 6.02429C13.9548 5.99629 13.6374 5.77571 13.4854 5.44747L11.4074 0.959767C11.0495 0.18667 9.95053 0.186671 9.59256 0.959767L7.51459 5.44747C7.3626 5.77571 7.04521 5.99629 6.68457 6.02429L1.54056 6.42376C0.634208 6.49415 0.284349 7.63948 0.996667 8.20431L4.77127 11.1974C5.08016 11.4423 5.21633 11.8459 5.11897 12.2279L3.96395 16.7598C3.74761 17.6086 4.64979 18.3057 5.41654 17.8821L10.0164 15.3408Z" />
    </SvgIcon>
  );
}

type RatingInfoProps = {
  rating?: number;
};

function RatingInfo({rating}: RatingInfoProps) {
  return (
    <RatingInfoStyled>
      <RatingIcon
        sx={{
          color: (theme) => theme.colorPalette.lightBlue,
        }}
      />
      <RatingNumber
        sx={{
          color: (theme) => theme.customTypography.mainTitle.color,
        }}
      >
        {rating}
      </RatingNumber>
    </RatingInfoStyled>
  );
}

export default RatingInfo;
