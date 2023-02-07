import {styled, Switch} from '@mui/material';

const SwitchStyled = styled(Switch)(() => ({}));

type ButtonStyledTypes = {
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean | undefined;
};

export default function Button(props: ButtonStyledTypes) {
  const {onChange, checked} = props;

  return <SwitchStyled checked={checked} onChange={onChange} inputProps={{'aria-label': 'controlled'}} />;
}
