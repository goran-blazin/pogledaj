import {Link, useLocation} from 'react-router-dom';
import {BottomNavigation, BottomNavigationAction, styled} from '@mui/material';
import {
  HomeOutlined,
  // TheatersOutlined,
  Tune,
  VideoCameraBackOutlined,
  LocalActivityOutlined,
} from '@mui/icons-material';
import {SxProps} from '@mui/system';
import {namedRoutes} from '../../../routes';
import {ThemeProvider} from '@mui/material/styles';
import darkTheme from '../utility/themes/darkTheme';
import lightTheme from '../utility/themes/lightTheme';
import useTheme from '../../../store/ThemeStore';
import Utils from '../../../helpers/Utils';

function FooterMenuWrapper() {
  const navActionStyles: SxProps = (isSelected = false) => {
    return {
      color: isSelected ? 'primary.main' : 'text.primary',
      fontWeight: '600',
      minWidth: '60px',
      textAlign: 'center',
      '&.Mui-disabled': {
        color: 'gray',
      },
      '::before': isSelected
        ? {
            content: '""',
            display: 'block',
            backgroundColor: 'primary.main',
            position: 'absolute',
            width: '15px',
            height: '4px',
            top: '0',
            borderRadius: '0px 0px 5px 5px',
          }
        : {},
    };
  };

  const FooterPositionWrap = styled('div')({
    position: 'fixed',
    bottom: '16px',
    maxWidth: 'calc(1024px - 24px);',
    right: 0,
    left: 0,
    marginRight: 'auto',
    marginLeft: 'auto',
    zIndex: '1000',
    padding: '0 12px',
  });

  const location = useLocation();
  // theme store
  const themeStore = useTheme();

  return (
    <ThemeProvider theme={themeStore.darkTheme ? darkTheme : lightTheme}>
      <FooterPositionWrap>
        <BottomNavigation
          component={'footer'}
          showLabels
          sx={{
            height: '68px',
            boxShadow: '0px 3px 16px rgba(0, 0, 0, 0.05), 0px 3px 10px rgba(0, 0, 0, 0.02)',
            border: '1px solid rgba(233, 233, 233, 0.5)',
            backdropFilter: 'blur(10px)',
            borderRadius: '32px',
            backgroundColor: (theme) => theme.footerTheme.backgroundColor,
          }}
        >
          <BottomNavigationAction
            sx={{
              ...navActionStyles(location.pathname === namedRoutes.home),
              borderBottomLeftRadius: '32px',
              borderTopLeftRadius: '32px',
              color: (theme) =>
                location.pathname === namedRoutes.home ? theme.footerTheme.activeItemColor : theme.footerTheme.color,
            }}
            component={Link}
            to={namedRoutes.home}
            label="Početna"
            icon={<HomeOutlined />}
          />
          {/*<BottomNavigationAction*/}
          {/*  sx={navActionStyles(location.pathname.startsWith('/movie'))}*/}
          {/*  component={Link}*/}
          {/*  to={namedRoutes.moviesListing}*/}
          {/*  label="Filmovi"*/}
          {/*  icon={<TheatersOutlined />}*/}
          {/*/>*/}
          <BottomNavigationAction
            sx={navActionStyles(location.pathname.startsWith('/reservations'))}
            component={Link}
            to={namedRoutes.reservations}
            label={Utils.isBetaMode() ? 'Rezervacije' : 'Rezervacije (uskoro)'}
            icon={<LocalActivityOutlined />}
            disabled={!Utils.isBetaMode()}
          />
          <BottomNavigationAction
            sx={navActionStyles(location.pathname.startsWith('/cinema'))}
            component={Link}
            to={namedRoutes.cinemasListing}
            label={Utils.isBetaMode() ? 'Bioskopi' : 'Bioskopi (uskoro)'}
            icon={<VideoCameraBackOutlined />}
            disabled={!Utils.isBetaMode()}
          />
          <BottomNavigationAction
            sx={{
              ...navActionStyles(location.pathname === namedRoutes.settings),
              borderBottomRightRadius: '32px',
              borderTopRightRadius: '32px',
              color: (theme) =>
                location.pathname === namedRoutes.settings
                  ? theme.footerTheme.activeItemColor
                  : theme.footerTheme.color,
            }}
            component={Link}
            to={namedRoutes.settings}
            label="Podešavanja"
            icon={<Tune />}
          />
        </BottomNavigation>
      </FooterPositionWrap>
    </ThemeProvider>
  );
}

export default FooterMenuWrapper;
