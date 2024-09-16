import PageTitle from '../utility/typography/PageTitle';
import MiscTextWrapper from '../layout/MiscTextWrapper';
import ContentWrapper from '../layout/ContentWrapper';
import Paragraph from '../utility/typography/Paragraph';
import {Box, Typography} from '@mui/material';
import Link from '../utility/typography/Link';
import React from 'react';

function AboutUs() {
  return (
    <ContentWrapper padding>
      <MiscTextWrapper>
        <>
          <PageTitle title="O nama" />
          <Paragraph>
            Dobrodošli na Pogledaj.rs, vaš pouzdani izvor za najnovije informacije o dešavanjima u bioskopima širom
            Srbije!
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
            Ko smo mi?
          </Typography>
          <Paragraph>
            Pogledaj.rs je informativni portal posvećen ljubiteljima filma. Naša misija je da vam omogućimo brz i lak
            pristup najnovijim informacijama o bioskopskim repertoarima, specijalnim popustima, akcijama i događajima
            koji se tiču bioskopskih projekcija.
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
            Naša misija
          </Typography>
          <Paragraph>
            Naša misija je da obogatimo vaše filmsko iskustvo pružajući vam sve potrebne informacije na jednom mestu.
            Verujemo da filmovi povezuju ljude i želimo da vam pomognemo da pronađete savršene filmske trenutke za vas i
            vaše najbliže.
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
            Šta nudimo?
          </Typography>
          <Paragraph marginBottom="0">Na Pogledaj.rs možete pronaći:</Paragraph>
          <ul>
            <li>
              <Paragraph marginBottom="0">
                <Box component={'span'} fontWeight={600}>
                  Repertoare
                </Box>{' '}
                bioskopa širom Srbije, sa tačnim terminima projekcija.
              </Paragraph>
            </li>
            <li>
              <Paragraph marginBottom="0">
                <Box component={'span'} fontWeight={600}>
                  Informacije o popustima
                </Box>{' '}
                i specijalnim akcijama koje nude bioskopi.
              </Paragraph>
            </li>
            <li>
              <Paragraph marginBottom="0">
                <Box component={'span'} fontWeight={600}>
                  Novosti o filmovima
                </Box>{' '}
                koji stižu u bioskope, kao i informacije o premijerama.
              </Paragraph>
            </li>
            <li>
              <Paragraph marginBottom="0">
                U budućnosti planiramo da uvedemo mogućnost{' '}
                <Box component={'span'} fontWeight={600}>
                  rezervacije i plaćanja ulaznica
                </Box>{' '}
                direktno putem našeg sajta.
              </Paragraph>
            </li>
          </ul>
          <Typography
            variant={'h3'}
            sx={(theme) => ({
              color: theme.customTypography.paragraph.color,
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '10px',
            })}
          >
            Naš tim
          </Typography>
          <Paragraph>
            Naš tim čine entuzijastični ljubitelji filma sa dugogodišnjim iskustvom u industriji zabave. Svi mi delimo
            strast prema filmovima i posvećeni smo tome da vam pružimo najkvalitetnije i najtačnije informacije.
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
            Kontaktirajte nas
          </Typography>
          <Paragraph marginBottom="0">
            Vaša povratna informacija nam je veoma važna. Ukoliko imate pitanja, sugestije ili komentare, slobodno nas
            kontaktirajte putem e-maila na <Link text="info@pogledaj.rs" link="mailto:info@pogledaj.rs" />. Rado ćemo
            vam odgovoriti i pomoći vam.
          </Paragraph>
        </>
      </MiscTextWrapper>
    </ContentWrapper>
  );
}

export default AboutUs;
