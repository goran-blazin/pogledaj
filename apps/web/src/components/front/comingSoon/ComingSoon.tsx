import {Box, styled} from '@mui/material';
import {Form, useForm} from '../utility/form/useForm';
import PageTitle from '../utility/typography/PageTitle';
import InputField from '../utility/form/InputField';

const GridStyled = styled(Box)(({theme}) => ({
  height: '100vh',
  width: '100%',
  alignItems: 'center',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

const BoxLeft = styled(Box)(({theme}) => ({
  textAlign: 'center',
  overflow: 'hidden',
  backgroundColor: '#091F3E',
  height: 'auto',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: '90%',
    height: 'auto',
  },
  [theme.breakpoints.up('md')]: {
    height: '100%',
  },
}));

const BoxRight = styled(Box)(({theme}) => ({
  overflow: 'hidden',
  height: 'auto',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    height: '100%',
  },
}));

const FormWrap = styled(Box)(() => ({
  width: '350px',
}));

const InputWrap = styled(Box)(() => ({
  marginBottom: '32px',
}));

const initialFieldValues = {
  name: '',
  email: '',
  phoneNUmber: '',
  message: '',
};

function ComingSoon() {
  const {values, handleInputChange} = useForm(initialFieldValues);

  return (
    <GridStyled>
      <BoxLeft>
        <div>
          <img src="/img/popcorn-couch.png" alt="logo-preview" />
        </div>
      </BoxLeft>
      <BoxRight>
        <FormWrap>
          <Form>
            <PageTitle title="Kontaktirajte nas" marginBottom={'22px'} />
            <InputWrap>
              <InputField onChange={handleInputChange} value={values.name} name="name" placeholder={'Ime i prezime'} />
            </InputWrap>
            <InputWrap>
              <InputField onChange={handleInputChange} value={values.email} name="email" placeholder={'Email adresa'} />
            </InputWrap>
            <InputWrap>
              <InputField
                onChange={handleInputChange}
                value={values.phoneNUmber}
                name="phoneNUmber"
                placeholder={'Broj telefona (opciono)'}
              />
            </InputWrap>
          </Form>
        </FormWrap>
      </BoxRight>
    </GridStyled>
  );
}

export default ComingSoon;
