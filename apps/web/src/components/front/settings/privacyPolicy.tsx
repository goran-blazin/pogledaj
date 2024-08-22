import PageTitle from '../utility/typography/PageTitle';
import MiscTextWrapper from '../layout/MiscTextWrapper';
import ContentWrapper from '../layout/ContentWrapper';
import Paragraph from '../utility/typography/Paragraph';
import {Typography} from '@mui/material';

function Subtitle1({children}: {children: React.ReactNode}) {
  return (
    <Typography
      variant={'h3'}
      sx={(theme) => ({
        color: theme.customTypography.paragraph.color,
        fontSize: '18px',
        fontWeight: 700,
        marginBottom: '10px',
      })}
    >
      {children}
    </Typography>
  );
}

function Subtitle2({children}: {children: React.ReactNode}) {
  return (
    <Typography
      variant={'h5'}
      sx={(theme) => ({
        color: theme.customTypography.paragraph.color,
        fontSize: '16px',
        fontWeight: 700,
        marginBottom: '6px',
      })}
    >
      {children}
    </Typography>
  );
}

function PrivacyPolicy() {
  return (
    <ContentWrapper padding>
      <MiscTextWrapper>
        <>
          <PageTitle title="Politika privatnosti" />
          <Paragraph>
            Ova Politika privatnosti opisuje kako Pogledaj.rs prikuplja, koristi i štiti vaše lične podatke kada
            koristite naš sajt. Korišćenjem našeg sajta, pristajete na praksu opisanu u ovoj politici.
          </Paragraph>
          <Subtitle1>1. Prikupljanje Podataka</Subtitle1>
          <Subtitle2>1.1. Podaci koji se automatski prikupljaju</Subtitle2>
          <Paragraph>
            Kada posetite naš sajt, automatski prikupljamo određene informacije o vašem uređaju, uključujući IP adresu,
            tip pregledača, jezik pregledača, vreme pristupa i adrese referentnih sajtova.
          </Paragraph>
          <Subtitle1>2. Korišćenje Podataka</Subtitle1>
          <Subtitle2>2.1. Pružanje i Poboljšanje Usluga</Subtitle2>
          <Paragraph marginBottom="0">
            Vaši podaci nam pomažu da pružamo, održavamo i poboljšavamo naše usluge, uključujući:
          </Paragraph>
          <ul>
            <li>
              <Paragraph marginBottom="0">Informisanje o poslednjim dešavanjima u bioskopima</Paragraph>
            </li>
            <li>
              <Paragraph>Pružanje personalizovanih preporuka</Paragraph>
            </li>
          </ul>
          <Subtitle2>2.2. Marketing i Komunikacija</Subtitle2>
          <Paragraph>
            Možemo koristiti vaše podatke za slanje promotivnih materijala, obaveštenja o novim uslugama, specijalnim
            ponudama i drugim informacijama koje bi vam mogle biti od interesa.
          </Paragraph>
          <Subtitle2>2.3. Sigurnost</Subtitle2>
          <Paragraph>
            Vaše podatke koristimo kako bismo unapredili sigurnost našeg sajta i zaštitili od prevara i zloupotreba.
            Koristimo sigurnu konekciju HTTPS.
          </Paragraph>
          <Subtitle1>3. Deljenje Podataka</Subtitle1>
          <Subtitle2>3.1. Sa Trećim Stranama</Subtitle2>
          <Paragraph>
            Vaše lične podatke možemo deliti sa pouzdanim trećim stranama koje nam pomažu u pružanju naših usluga, kao
            što su marketinške agencije ili pružaoci IT usluga. Te treće strane su obavezne da koriste vaše podatke
            isključivo u skladu sa našim uputstvima i u skladu sa ovom politikom privatnosti.
          </Paragraph>
          <Subtitle2>3.2. Zakonski Zahtevi</Subtitle2>
          <Paragraph>
            Vaše podatke možemo otkriti ako je to potrebno radi ispunjenja zakonskih obaveza ili radi zaštite naših
            prava i imovine.
          </Paragraph>
          <Subtitle1>4. Sigurnost Podataka</Subtitle1>
          <Paragraph>
            Preduzimamo odgovarajuće tehničke i organizacione mere kako bismo zaštitili vaše lične podatke od
            neovlašćenog pristupa, upotrebe, izmene ili uništenja.
          </Paragraph>
          <Subtitle1>5. Prava Korisnika</Subtitle1>
          <Paragraph>
            Imate pravo da pristupite svojim ličnim podacima, da ih ispravite, obrišete ili ograničite njihovu obradu.
            Takođe imate pravo da prigovorite na obradu vaših podataka i pravo na prenosivost podataka.
          </Paragraph>
          <Subtitle1>6. Kolačići</Subtitle1>
          <Paragraph>
            Naš sajt koristi kolačiće za poboljšanje korisničkog iskustva. Kolačići su male tekstualne datoteke koje se
            smeštaju na vaš uređaj kada posetite naš sajt. Možete da kontrolišete i upravljate kolačićima putem
            podešavanja vašeg pregledača.
          </Paragraph>
          <Subtitle1>7. Izmene Politike Privatnosti</Subtitle1>
          <Paragraph>
            Zadržavamo pravo da povremeno izmenimo ovu politiku privatnosti. Sve izmene će biti objavljene na ovoj
            stranici, a značajne izmene ćemo vam saopštiti putem e-maila ili obaveštenja na našem sajtu.
          </Paragraph>
          <Subtitle1>8. Kontakt</Subtitle1>
          <Paragraph marginBottom="0">
            Ukoliko imate bilo kakva pitanja ili zahteve u vezi sa ovom politikom privatnosti, možete nas kontaktirati
            putem e-maila na <a href="mailto:info@pogledaj.rs">info@pogledaj.rs</a>.
          </Paragraph>
        </>
      </MiscTextWrapper>
    </ContentWrapper>
  );
}

export default PrivacyPolicy;
