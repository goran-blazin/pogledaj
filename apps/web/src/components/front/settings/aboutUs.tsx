import PageTitle from '../utility/typography/PageTitle';
import MiscTextWrapper from '../layout/MiscTextWrapper';
import ContentWrapper from '../layout/ContentWrapper';
import Paragraph from '../utility/typography/Paragraph';
import Link from '../utility/typography/Link';
import PageSubTitle from '../utility/typography/PageSubTitle';
import ListStyled from '../utility/typography/ListStyled';

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
          <PageSubTitle title="Ko smo mi?" variant="h3" marginBottom="0" />
          <Paragraph>
            Pogledaj.rs je informativni portal posvećen ljubiteljima filma. Naša misija je da vam omogućimo brz i lak
            pristup najnovijim informacijama o bioskopskim repertoarima, specijalnim popustima, akcijama i događajima
            koji se tiču bioskopskih projekcija.
          </Paragraph>
          <PageSubTitle title="Naša misija" variant="h3" marginBottom="0" />
          <Paragraph>
            Naša misija je da obogatimo vaše filmsko iskustvo pružajući vam sve potrebne informacije na jednom mestu.
            Verujemo da filmovi povezuju ljude i želimo da vam pomognemo da pronađete savršene filmske trenutke za vas i
            vaše najbliže.
          </Paragraph>
          <PageSubTitle title="Šta nudimo?" variant="h3" marginBottom="0" />
          <Paragraph marginBottom="0">Na Pogledaj.rs možete pronaći:</Paragraph>
          <ListStyled>
            <li>
              <strong>Repertoare</strong> bioskopa širom Srbije, sa tačnim terminima projekcija.
            </li>
            <li>
              <strong>Informacije o popustima</strong> i specijalnim akcijama koje nude bioskopi.
            </li>
            <li>
              <strong>Novosti o filmovima</strong> koji stižu u bioskope, kao i informacije o premijerama.
            </li>
            {/*<li>*/}
            {/*  U budućnosti planiramo da uvedemo mogućnost <strong>rezervacije i plaćanja ulaznica</strong> direktno*/}
            {/*  putem našeg sajta.*/}
            {/*</li>*/}
          </ListStyled>
          <PageSubTitle title="Naš tim" variant="h3" marginBottom="0" />
          <Paragraph>
            Naš tim čine entuzijastični ljubitelji filma sa dugogodišnjim iskustvom u industriji zabave. Svi mi delimo
            strast prema filmovima i posvećeni smo tome da vam pružimo najkvalitetnije i najtačnije informacije.
          </Paragraph>
          <PageSubTitle title="Kontaktirajte nas" variant="h3" marginBottom="0" />
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
