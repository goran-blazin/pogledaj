import {Box, styled} from '@mui/material';
import {Form, useForm} from '../utility/form/useForm';
import PageTitle from '../utility/typography/PageTitle';
import InputField from '../utility/form/InputField';
import Textarea from '../utility/form/Textarea';
import Button from '../utility/buttons/Button';
import MovingBackground from './MovingBackground';
import Paragraph from '../utility/typography/Paragraph';

const GridStyled = styled(Box)(({theme}) => ({
  width: '100%',
  alignItems: 'center',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  backgroundColor: '#091F3E',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    height: '100vh',
  },
}));

const BoxLeft = styled(Box)(({theme}) => ({
  textAlign: 'center',
  overflow: 'hidden',
  height: '700px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '50px 20px',
  '& img': {
    // width: '90%',
    // height: 'auto',
  },
  [theme.breakpoints.up('md')]: {
    height: '100%',
    padding: '0',
  },
}));

const BoxRight = styled(Box)(({theme}) => ({
  overflow: 'hidden',
  height: 'auto',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderTopLeftRadius: '15px',
  borderTopRightRadius: '15px',
  backgroundColor: 'white',
  padding: '30px 20px 20px 20px',
  [theme.breakpoints.up('md')]: {
    height: '100%',
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    padding: '0',
  },
}));

const FormWrap = styled(Box)(() => ({
  width: '350px',
}));

const InputWrap = styled(Box)(() => ({
  marginBottom: '32px',
  '&:last-child': {
    marginBottom: 0,
  },
}));

const initialFieldValues = {
  name: '',
  email: '',
  phoneNumber: '',
  message: '',
};

function ComingSoon() {
  const {values, handleInputChange, resetValues} = useForm(initialFieldValues);

  const handleFormSubmit = () => {
    // eslint-disable-next-line no-console
    console.log('form data', values);
    setTimeout(() => {
      resetValues(initialFieldValues);
    }, 2000);
  };

  return (
    <GridStyled>
      <BoxLeft>
        {/* <div>
          <img src="/img/popcorn-couch.png" alt="logo-preview" />
        </div> */}
        <MovingBackground />
      </BoxLeft>
      <BoxRight>
        <FormWrap>
          <Form>
            <PageTitle title="Kontaktirajte nas" marginBottom={'22px'} />
            <InputWrap>
              <Paragraph
                text={
                  'Ukoliko želite da nam se obratite, imate pitanja ili sugestije, popunite kontakt formu u nastavku i naši saradnici će vas kontaktirati u najkaćem roku.'
                }
              />
            </InputWrap>
            <InputWrap>
              <InputField onChange={handleInputChange} value={values.name} name="name" placeholder={'Ime i prezime'} />
            </InputWrap>
            <InputWrap>
              <InputField onChange={handleInputChange} value={values.email} name="email" placeholder={'Email adresa'} />
            </InputWrap>
            <InputWrap>
              <InputField
                onChange={handleInputChange}
                value={values.phoneNumber}
                name="phoneNumber"
                placeholder={'Broj telefona (opciono)'}
              />
            </InputWrap>
            <InputWrap>
              <Textarea
                onChange={handleInputChange}
                value={values.message}
                name="message"
                placeholder={'Poruka'}
                rows={10}
              />
            </InputWrap>
            <InputWrap>
              <Button onClick={handleFormSubmit} text={'Posalji'} type={'button'} />
            </InputWrap>
          </Form>
        </FormWrap>
      </BoxRight>
    </GridStyled>
  );
}

export default ComingSoon;
