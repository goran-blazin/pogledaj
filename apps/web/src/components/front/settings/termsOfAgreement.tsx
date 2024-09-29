import MiscTextWrapper from '../layout/MiscTextWrapper';
import ContentWrapper from '../layout/ContentWrapper';
import PageTitle from '../utility/typography/PageTitle';
import PageSubTitle from '../utility/typography/PageSubTitle';
import Paragraph from '../utility/typography/Paragraph';
import LinkStyled from '../utility/typography/Link';
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
          <PageSubTitle title="1. Opis usluga" variant="h3" marginBottom="0" />
          <Paragraph>
            Pogledaj.rs pruža informacije o poslednjim dešavanjima u bioskopima širom Srbije, uključujući repertoar,
            popuste, akcije i druge srodne informacije.
          </Paragraph>
          <PageSubTitle title="2. Ciljna publika" variant="h3" marginBottom="0" />
          <Paragraph>Naše usluge su dostupne su svima bez obzira na godine i pol.</Paragraph>
          <PageSubTitle title="3. Registracija i korisnički nalozi" variant="h3" marginBottom="0" />
          <Paragraph>Trenutno nije potrebno registrovati se za korišćenje naših usluga.</Paragraph>
          <PageSubTitle title="4. Korisnički sadržaj" variant="h3" marginBottom="0" />
          <Paragraph>Trenutno nije moguće postavljati sadržaj na sajt.</Paragraph>
          <PageSubTitle title="5. Plaćanje i transakcije" variant="h3" marginBottom="0" />
          <Paragraph>Trenutno ne obavljamo finansijske transakcije na sajtu.</Paragraph>
          <PageSubTitle title="6. Privatnost i sigurnost" variant="h3" marginBottom="0" />
          <Paragraph>
            Vaši podaci neće biti zloupotrebljeni i biće dostupni samo našem timu i saradnicima. Više o tome možete
            saznati u našoj{' '}
            <Link to={namedRoutes.privacyPolicy}>
              <LinkStyled link="" text="Politici privatnosti"></LinkStyled>
            </Link>
            .
          </Paragraph>
          <PageSubTitle title="7. Prava i obaveze vlasnika sajta" variant="h3" marginBottom="0" />
          <Paragraph>
            Tim Pogledaj.rs ima pravo da koristi podatke unete prilikom registracije u svrhu istraživanja i marketinga.
            Takođe zadržavamo pravo da uklonimo korisnika usled nedoličnog ponašanja. Naša obaveza je da pružimo
            relevantne i tačne informacije i da uklonimo netačne informacije kada se iste utvrde kao netačne.
          </Paragraph>
          <PageSubTitle title="8. Kontakt informacije" variant="h3" marginBottom="0" />
          <Paragraph marginBottom="0">
            U slučaju bilo kakvih pitanja ili problema, možete nas kontaktirati putem e-maila na{' '}
            <LinkStyled link="mailto:info@pogledaj.rs" text="info@pogledaj.rs" />
          </Paragraph>
        </>
      </MiscTextWrapper>
    </ContentWrapper>
  );
}

export default TermsOfAgreement;
