import PageTitle from '../utility/typography/PageTitle';
import ContentWrapper from '../layout/ContentWrapper';
import MiscTextWrapper from '../layout/MiscTextWrapper';
import Paragraph from '../utility/typography/Paragraph';
import {Box, Typography} from '@mui/material';

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
          <Typography
            variant={'h3'}
            sx={(theme) => ({
              color: theme.customTypography.paragraph.color,
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '10px',
            })}
          >
            Gde nas možete pronaći:
          </Typography>
          <Typography
            variant={'h5'}
            sx={(theme) => ({
              color: theme.customTypography.paragraph.color,
              fontSize: '16px',
              fontWeight: 700,
              marginBottom: '6px',
            })}
          >
            Facebook
          </Typography>
          <Paragraph>
            Pratite nas na Facebook kako biste prvi saznali za najnovije premijere, specijalne popuste i događaje u
            bioskopima širom Srbije. Uključite se u diskusije, delite svoje omiljene filmske trenutke i povežite se sa
            drugim filmofilima.
          </Paragraph>
          <Typography
            variant={'h5'}
            sx={(theme) => ({
              color: theme.customTypography.paragraph.color,
              fontSize: '16px',
              fontWeight: 700,
              marginBottom: '6px',
            })}
          >
            Instagram
          </Typography>
          <Paragraph>
            Za svakodnevne filmske inspiracije, ekskluzivne slike iza kulisa i najave filmova, zapratite naš Instagram.
            Obeležite nas u svojim bioskopskim avanturama sa #PogledajRS i možda se vaša fotografija pojavi na našem
            profilu!
          </Paragraph>
          <Typography
            variant={'h5'}
            sx={(theme) => ({
              color: theme.customTypography.paragraph.color,
              fontSize: '16px',
              fontWeight: 700,
              marginBottom: '6px',
            })}
          >
            X (ex-Twitter)
          </Typography>
          <Paragraph>
            Ostanite informisani o najnovijim vestima i trenutnim dešavanjima u svetu filma prateći nas na X-u (bivšem
            Twitteru). Pridružite se razgovoru koristeći @Pogledaj_RS i podelite svoje mišljenje o filmovima koje ste
            upravo pogledali.
          </Paragraph>
          <Typography
            variant={'h5'}
            sx={(theme) => ({
              color: theme.customTypography.paragraph.color,
              fontSize: '16px',
              fontWeight: 700,
              marginBottom: '6px',
            })}
          >
            YouTube
          </Typography>
          <Paragraph>
            Pogledajte naše najnovije video sadržaje na YouTube. Pratite najave, trejlere, intervjue sa glumcima i još
            mnogo toga. Pretplatite se na naš kanal da ne biste propustili nijedan video!
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
            Zašto nas pratiti?
          </Typography>

          <ul>
            <li>
              <Paragraph marginBottom={'0'}>
                <Box component={'span'} fontWeight={600}>
                  Ekskluzivne ponude:
                </Box>{' '}
                Budite prvi koji će saznati za specijalne popuste i akcije.
              </Paragraph>
            </li>
            <li>
              <Paragraph marginBottom={'0'}>
                <Box component={'span'} fontWeight={600}>
                  Najnovije vesti:
                </Box>{' '}
                Pratite najnovije informacije o filmskim premijerama i događajima.
              </Paragraph>
            </li>
            <li>
              <Paragraph marginBottom={'0'}>
                <Box component={'span'} fontWeight={600}>
                  Zajednica:
                </Box>{' '}
                Povežite se sa drugim ljubiteljima filma, delite mišljenja i preporuke.
              </Paragraph>
            </li>
            <li>
              <Paragraph marginBottom={'0'}>
                <Box component={'span'} fontWeight={600}>
                  Kul sadržaji:
                </Box>{' '}
                Uživajte u ekskluzivnim slikama, video zapisima i najavama.
              </Paragraph>
            </li>
          </ul>
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
