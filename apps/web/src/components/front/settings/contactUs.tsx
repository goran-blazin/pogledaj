import PageTitle from '../utility/typography/PageTitle';
import MiscTextWrapper from '../layout/MiscTextWrapper';
import ContentWrapper from '../layout/ContentWrapper';
import {Form, useForm} from '../utility/form/useForm';
import Paragraph from '../utility/typography/Paragraph';
import InputField from '../utility/form/InputField';
import Textarea from '../utility/form/Textarea';
import ButtonStyled from '../utility/buttons/Button';
import {Box, styled} from '@mui/material';
import {SupportEmail} from '../../../types/EmailTypes';
import {useMutation} from 'react-query';
import {AxiosError} from 'axios';
import {ApiErrors} from '../../../types/ErrorTypes';
import EmailService from '../../../services/EmailService';
import React from 'react';

const FormWrap = styled(Box)(({theme}) => ({
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

const initialFieldValues: SupportEmail = {
  name: '',
  email: '',
  telephone: '',
  message: '',
};

function ContactUs() {
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
    <ContentWrapper padding>
      <MiscTextWrapper>
        <FormWrap>
          <Form>
            <PageTitle title="Kontaktirajte nas" marginBottom={'22px'} />
            <InputWrap>
              <Paragraph>
                Ukoliko želite da nam se obratite, imate pitanja ili sugestije, mozete nam poslati e-mail na{' '}
                <a href="mailto:info@pogledaj.rs">info@pogledaj.rs</a> ili popunite kontakt formu u nastavku i naši
                saradnici će vas kontaktirati u najkraćem roku.
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
          </Form>
        </FormWrap>
      </MiscTextWrapper>
    </ContentWrapper>
  );
}

export default ContactUs;
