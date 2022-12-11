import {styled} from '@mui/material';
import {Box, Chip, Stack} from '@mui/material';

import {Genre} from '../../../types/GeneralTypes';

const TagsComponentStyled = styled(Box)(() => ({
  display: 'flex',
}));
const ChipStyled = styled(Chip)(({theme}) => ({
  color: theme.colorPalette.lightBlue.color,
  borderColor: theme.colorPalette.lightBlue.color,
  height: '24px',
  borderWidth: '2px',
  padding: '0 18px',
  fontSize: '12px',
  lineHeight: '20px',
  '& span': {
    padding: 0,
  },
}));

type RatingInfoProps = {
  genres?: Genre[];
};

function TagsComponent({genres}: RatingInfoProps) {
  return (
    <TagsComponentStyled>
      <Stack direction="row" spacing={0} flexWrap="wrap" gap={'14px'}>
        {genres?.map((genre, index) => (
          <ChipStyled label={genre.localizedName} variant="outlined" key={index} />
        ))}
      </Stack>
    </TagsComponentStyled>
  );
}

export default TagsComponent;
