import MiscTextWrapper from '../layout/MiscTextWrapper';
import ContentWrapper from '../layout/ContentWrapper';
import PageTitle from '../utility/typography/PageTitle';
import {Typography} from '@mui/material';
import Paragraph from '../utility/typography/Paragraph';
import {Link} from 'react-router-dom';
import {namedRoutes} from '../../../routes';

function TermsOfAgreement() {
  return (
    <ContentWrapper padding>
      <MiscTextWrapper>
        <>
          <PageTitle title="Uslovi korišćenja" />
          <Paragraph>
            Dobrodošli na Pogledaj.rs! Molimo vas da pažljivo pročitate ove Uslove korišćenja pre nego što počnete da
            koristite naš website. Korišćenjem našeg sajta, saglasni ste sa ovim Uslovima korišćenja.
          </Paragraph>
          <Typography
            variant={'h3'}
            sx={(theme) => ({
              color: theme.customTypography.paragraph.color,
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '10px',
            })}
          >
            1. Opis usluga
          </Typography>
          <Paragraph>
            Pogledaj.rs pruža informacije o poslednjim dešavanjima u bioskopima širom Srbije, uključujući repertoar,
            popuste, akcije i druge srodne informacije.
          </Paragraph>
          <Typography
            variant={'h3'}
            sx={(theme) => ({
              color: theme.customTypography.paragraph.color,
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '10px',
            })}
          >
            2. Ciljna publika
          </Typography>
          <Paragraph>Naše usluge su dostupne su svima bez obzira na godine i pol.</Paragraph>
          <Typography
            variant={'h3'}
            sx={(theme) => ({
              color: theme.customTypography.paragraph.color,
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '10px',
            })}
          >
            3. Registracija i korisnički nalozi
          </Typography>
          <Paragraph>Trenutno nije potrebno registrovati se za korišćenje naših usluga.</Paragraph>
          <Typography
            variant={'h3'}
            sx={(theme) => ({
              color: theme.customTypography.paragraph.color,
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '10px',
            })}
          >
            4. Korisnički sadržaj
          </Typography>
          <Paragraph>Trenutno nije moguće postavljati sadržaj na sajt.</Paragraph>
          <Typography
            variant={'h3'}
            sx={(theme) => ({
              color: theme.customTypography.paragraph.color,
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '10px',
            })}
          >
            5. Plaćanje i transakcije
          </Typography>
          <Paragraph>Trenutno ne obavljamo finansijske transakcije na sajtu.</Paragraph>
          <Typography
            variant={'h3'}
            sx={(theme) => ({
              color: theme.customTypography.paragraph.color,
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '10px',
            })}
          >
            6. Privatnost i sigurnost
          </Typography>
          <Paragraph>
            Vaši podaci neće biti zloupotrebljeni i biće dostupni samo našem timu i saradnicima. Više o tome možete
            saznati u našoj <Link to={namedRoutes.privacyPolicy}>Politici privatnosti</Link>.
          </Paragraph>
          <Typography
            variant={'h3'}
            sx={(theme) => ({
              color: theme.customTypography.paragraph.color,
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '10px',
            })}
          >
            7. Prava i obaveze vlasnika sajta
          </Typography>
          <Paragraph>
            Tim Pogledaj.rs ima pravo da koristi podatke unete prilikom registracije u svrhu istraživanja i marketinga.
            Takođe zadržavamo pravo da uklonimo korisnika usled nedoličnog ponašanja. Naša obaveza je da pružimo
            relevantne i tačne informacije i da uklonimo netačne informacije kada se iste utvrde kao netačne.
          </Paragraph>
          <Typography
            variant={'h3'}
            sx={(theme) => ({
              color: theme.customTypography.paragraph.color,
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '10px',
            })}
          >
            8. Kontakt informacije
          </Typography>
          <Paragraph marginBottom="0">
            U slučaju bilo kakvih pitanja ili problema, možete nas kontaktirati putem e-maila na{' '}
            <a href="mailto:info@pogledaj.rs">info@pogledaj.rs</a>.
          </Paragraph>
        </>
      </MiscTextWrapper>
    </ContentWrapper>
  );
}

export default TermsOfAgreement;
