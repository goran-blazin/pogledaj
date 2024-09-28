import PageTitle from '../utility/typography/PageTitle';
import PageSubTitle from '../utility/typography/PageSubTitle';
import ContentWrapper from '../layout/ContentWrapper';
import MiscTextWrapper from '../layout/MiscTextWrapper';
import Paragraph from '../utility/typography/Paragraph';
import ListStyled from '../utility/typography/ListStyled';

// icons
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';

function FollowUs() {
  return (
    <ContentWrapper padding>
      <MiscTextWrapper>
        <>
          <PageTitle title="Prati nas" />
          <Paragraph>
            Budite u toku sa najnovijim informacijama, vestima i ekskluzivnim ponudama prateći nas na društvenim
            mrežama! Povežite se sa nama i budite deo naše filmske zajednice.
          </Paragraph>
          <PageSubTitle title="Gde nas možete pronaći:" variant="h3" />
          <PageSubTitle title="Facebook" variant="h3" marginBottom="0" icon={<FacebookRoundedIcon />} />
          <Paragraph>
            Pratite nas na Facebook kako biste prvi saznali za najnovije premijere, specijalne popuste i događaje u
            bioskopima širom Srbije. Uključite se u diskusije, delite svoje omiljene filmske trenutke i povežite se sa
            drugim filmofilima.
          </Paragraph>
          <PageSubTitle title="Facebook" variant="h3" marginBottom="0" icon={<InstagramIcon />} />
          <Paragraph>
            Za svakodnevne filmske inspiracije, ekskluzivne slike iza kulisa i najave filmova, zapratite naš Instagram.
            Obeležite nas u svojim bioskopskim avanturama sa #PogledajRS i možda se vaša fotografija pojavi na našem
            profilu!
          </Paragraph>
          <PageSubTitle title="X" variant="h3" marginBottom="0" icon={<XIcon />} />
          <Paragraph>
            Ostanite informisani o najnovijim vestima i trenutnim dešavanjima u svetu filma prateći nas na X-u (bivšem
            Twitteru). Pridružite se razgovoru koristeći @Pogledaj_RS i podelite svoje mišljenje o filmovima koje ste
            upravo pogledali.
          </Paragraph>
          <PageSubTitle title="YouTube" variant="h3" marginBottom="0" icon={<SubscriptionsOutlinedIcon />} />
          <Paragraph>
            Pogledajte naše najnovije video sadržaje na YouTube. Pratite najave, trejlere, intervjue sa glumcima i još
            mnogo toga. Pretplatite se na naš kanal da ne biste propustili nijedan video!
          </Paragraph>
          <PageSubTitle title="Zašto nas pratiti?" variant="h3" marginBottom="0" />
          <ListStyled>
            <li>Ekskluzivne ponude: Budite prvi koji će saznati za specijalne popuste i akcije.</li>
            <li>Najnovije vesti: Pratite najnovije informacije o filmskim premijerama i događajima.</li>
            <li>Zajednica: Povežite se sa drugim ljubiteljima filma, delite mišljenja i preporuke.</li>
            <li>Kul sadržaji: Uživajte u ekskluzivnim slikama, video zapisima i najavama.</li>
          </ListStyled>
          <Paragraph marginBottom={'0'}>
            Ne propustite ništa! Pratite nas na društvenim mrežama i budite uvek informisani o svemu što se dešava u
            svetu filma i bioskopa.
          </Paragraph>
        </>
      </MiscTextWrapper>
    </ContentWrapper>
  );
}

export default FollowUs;
