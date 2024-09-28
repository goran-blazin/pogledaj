import PageTitle from '../utility/typography/PageTitle';
import PageSubTitle from '../utility/typography/PageSubTitle';
import MiscTextWrapper from '../layout/MiscTextWrapper';
import ContentWrapper from '../layout/ContentWrapper';
import Paragraph from '../utility/typography/Paragraph';
import ListStyled from '../utility/typography/ListStyled';
import Link from '../utility/typography/Link';

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
          <PageSubTitle title="1. Prikupljanje Podataka" variant="h3" />
          <PageSubTitle title="1.1. Podaci koji se automatski prikupljaju" fontSize="14px" marginBottom="0" />
          <Paragraph>
            Kada posetite naš sajt, automatski prikupljamo određene informacije o vašem uređaju, uključujući IP adresu,
            tip pregledača, jezik pregledača, vreme pristupa i adrese referentnih sajtova.
          </Paragraph>
          <PageSubTitle title="2. Korišćenje Podataka" variant="h3" />
          <PageSubTitle title="2.1. Pružanje i Poboljšanje Usluga" fontSize="14px" marginBottom="0" />
          <Paragraph marginBottom="0">
            Vaši podaci nam pomažu da pružamo, održavamo i poboljšavamo naše usluge, uključujući:
          </Paragraph>
          <ListStyled>
            <li>Informisanje o poslednjim dešavanjima u bioskopima</li>
            <li>Pružanje personalizovanih preporuka</li>
          </ListStyled>
          <PageSubTitle title="2.2. Marketing i Komunikacija" fontSize="14px" marginBottom="0" />
          <Paragraph>
            Možemo koristiti vaše podatke za slanje promotivnih materijala, obaveštenja o novim uslugama, specijalnim
            ponudama i drugim informacijama koje bi vam mogle biti od interesa.
          </Paragraph>
          <PageSubTitle title="2.3. Sigurnost" fontSize="14px" marginBottom="0" />
          <Paragraph>
            Vaše podatke koristimo kako bismo unapredili sigurnost našeg sajta i zaštitili od prevara i zloupotreba.
            Koristimo sigurnu konekciju HTTPS.
          </Paragraph>
          <PageSubTitle title="3. Deljenje Podataka" variant="h3" />
          <PageSubTitle title="3.1. Sa Trećim Stranama" fontSize="14px" marginBottom="0" />
          <Paragraph>
            Vaše lične podatke možemo deliti sa pouzdanim trećim stranama koje nam pomažu u pružanju naših usluga, kao
            što su marketinške agencije ili pružaoci IT usluga. Te treće strane su obavezne da koriste vaše podatke
            isključivo u skladu sa našim uputstvima i u skladu sa ovom politikom privatnosti.
          </Paragraph>
          <PageSubTitle title="3.2. Zakonski Zahtevi" fontSize="14px" marginBottom="0" />
          <Paragraph>
            Vaše podatke možemo otkriti ako je to potrebno radi ispunjenja zakonskih obaveza ili radi zaštite naših
            prava i imovine.
          </Paragraph>
          <PageSubTitle title="4. Sigurnost Podataka" variant="h3" marginBottom="0" />
          <Paragraph>
            Preduzimamo odgovarajuće tehničke i organizacione mere kako bismo zaštitili vaše lične podatke od
            neovlašćenog pristupa, upotrebe, izmene ili uništenja.
          </Paragraph>
          <PageSubTitle title="5. Prava Korisnika" variant="h3" marginBottom="0" />
          <Paragraph>
            Imate pravo da pristupite svojim ličnim podacima, da ih ispravite, obrišete ili ograničite njihovu obradu.
            Takođe imate pravo da prigovorite na obradu vaših podataka i pravo na prenosivost podataka.
          </Paragraph>
          <PageSubTitle title="6. Kolačići" variant="h3" marginBottom="0" />
          <Paragraph>
            Naš sajt koristi kolačiće za poboljšanje korisničkog iskustva. Kolačići su male tekstualne datoteke koje se
            smeštaju na vaš uređaj kada posetite naš sajt. Možete da kontrolišete i upravljate kolačićima putem
            podešavanja vašeg pregledača.
          </Paragraph>
          <PageSubTitle title="7. Izmene Politike Privatnosti" variant="h3" marginBottom="0" />
          <Paragraph>
            Zadržavamo pravo da povremeno izmenimo ovu politiku privatnosti. Sve izmene će biti objavljene na ovoj
            stranici, a značajne izmene ćemo vam saopštiti putem e-maila ili obaveštenja na našem sajtu.
          </Paragraph>
          <PageSubTitle title="8. Kontakt" variant="h3" marginBottom="0" />
          <Paragraph marginBottom="0">
            Ukoliko imate bilo kakva pitanja ili zahteve u vezi sa ovom politikom privatnosti, možete nas kontaktirati
            putem e-maila na <Link link="mailto:info@pogledaj.rs" text="info@pogledaj.rs." />
          </Paragraph>
        </>
      </MiscTextWrapper>
    </ContentWrapper>
  );
}

export default PrivacyPolicy;
