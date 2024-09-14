import {Box, styled} from '@mui/material';
import {Form, useForm} from '../utility/form/useForm';
import PageTitle from '../utility/typography/PageTitle';
import InputField from '../utility/form/InputField';
import Textarea from '../utility/form/Textarea';
import MovingBackground from './MovingBackground';
import Paragraph from '../utility/typography/Paragraph';
import Link from '../utility/typography/Link';
import {useMutation} from 'react-query';
import EmailService from '../../../services/EmailService';
import {SupportEmail} from '../../../types/EmailTypes';
import {AxiosError} from 'axios';
import {ApiErrors} from '../../../types/ErrorTypes';
import ButtonStyled from '../utility/buttons/Button';
import React from 'react';

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
  // '& img': {
  //   width: '90%',
  //   height: 'auto',
  // },
  [theme.breakpoints.up('md')]: {
    height: '100%',
    padding: '0',
  },
}));

const BoxRight = styled(Box)(({theme}) => ({
  overflow: 'auto',
  height: 'auto',
  width: '100%',
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

const FormWrap = styled(Box)(({theme}) => ({
  width: '350px',
  padding: '0',
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    padding: '56px 0',
    margin: '0 auto',
  },
}));

const InputWrap = styled(Box)(() => ({
  marginBottom: '32px',
  '&:last-child': {
    marginBottom: 0,
  },
}));
const LinkWrap = styled(Box)(({theme}) => ({
  marginTop: '85px',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    marginTop: '127px',
  },
}));

const initialFieldValues: SupportEmail = {
  name: '',
  email: '',
  telephone: '',
  message: '',
};

function RepairMode() {
  const {values, handleInputChange, resetValues} = useForm(initialFieldValues);
  const {mutate, isError, error, isSuccess} = useMutation<unknown, AxiosError<ApiErrors>, SupportEmail>({
    mutationFn: (values: SupportEmail) => EmailService.sendSupportEmail(values),
  });

  const handleFormSubmit = () => {
    mutate(values, {
      onSuccess: () => resetValues(initialFieldValues),
    });
  };

  return (
    <GridStyled>
      <BoxLeft>
        <MovingBackground headerText={'Pogledaj.rs je trenutno u kvaru, molimo vas pokusajte kasnije'} />
      </BoxLeft>
      <BoxRight>
        <FormWrap>
          <Form>
            <PageTitle title="Kontaktirajte nas" marginBottom={'22px'} />
            <InputWrap>
              <Paragraph>
                Ukoliko želite da nam se obratite, imate pitanja ili sugestije, popunite kontakt formu u nastavku i naši
                saradnici će vas kontaktirati u najkaćem roku.
              </Paragraph>
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
                value={values.telephone}
                name="telephone"
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
            {isError && error.response && (
              <InputWrap>
                <Paragraph>Slanje neuspešno, molimo vas da popunite sva polja ispravno</Paragraph>
              </InputWrap>
            )}
            <InputWrap>
              <ButtonStyled onClick={handleFormSubmit} type={'button'}>
                Pošalji
              </ButtonStyled>
            </InputWrap>
            {isSuccess && (
              <InputWrap>
                <Paragraph>Poruka uspesno poslata!</Paragraph>
              </InputWrap>
            )}
            <LinkWrap>
              <Link text={'pogledaj.rs'} link={'https://www.pogledaj.rs/'} />
            </LinkWrap>
          </Form>
        </FormWrap>
      </BoxRight>
    </GridStyled>
  );
}

export default RepairMode;
