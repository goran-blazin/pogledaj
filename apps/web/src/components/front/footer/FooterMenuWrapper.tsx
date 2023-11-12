import {Link, useLocation} from 'react-router-dom';
import {BottomNavigation, BottomNavigationAction} from '@mui/material';
import {
  HomeOutlined,
  TheatersOutlined,
  Tune,
  VideoCameraBackOutlined,
  LocalActivityOutlined,
} from '@mui/icons-material';
import {SxProps} from '@mui/system';
import {namedRoutes} from '../../../routes';
import {createTheme, ThemeProvider} from '@mui/material/styles';

function FooterMenuWrapper() {
  const navActionStyles: SxProps = (isSelected = false) => {
    return {
      color: isSelected ? 'primary.main' : 'text.primary',
      fontWeight: '600',
      minWidth: '60px',
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

  const location = useLocation();

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: {
            main: '#3274F6',
          },
          text: {
            primary: '#595959',
          },
        },
      })}
    >
      <BottomNavigation
        component={'footer'}
        showLabels
        sx={{
          position: 'fixed',
          bottom: '16px',
          width: 'calc(100% - 24px);',
          height: '68px',
          margin: '0 auto',
          boxShadow: '0px 3px 16px rgba(0, 0, 0, 0.05), 0px 3px 10px rgba(0, 0, 0, 0.02)',
          border: '1px solid rgba(233, 233, 233, 0.5)',
          backdropFilter: 'blur(10px)',
          borderRadius: '32px',
          marginLeft: '12px',
          zIndex: '1000',
        }}
      >
        <BottomNavigationAction
          sx={{
            ...navActionStyles(location.pathname === namedRoutes.home),
            borderBottomLeftRadius: '32px',
            borderTopLeftRadius: '32px',
          }}
          component={Link}
          to={namedRoutes.home}
          label="Početna"
          icon={<HomeOutlined />}
        />
        <BottomNavigationAction
          sx={navActionStyles(location.pathname.startsWith('/movie'))}
          component={Link}
          to={namedRoutes.moviesListing}
          label="Filmovi"
          icon={<TheatersOutlined />}
        />
        <BottomNavigationAction
          sx={navActionStyles(location.pathname.startsWith('/reservations'))}
          component={Link}
          to={namedRoutes.reservations}
          label="Rezervacije"
          icon={<LocalActivityOutlined />}
        />
        <BottomNavigationAction
          sx={navActionStyles(location.pathname.startsWith('/cinema'))}
          component={Link}
          to={namedRoutes.cinemasListing}
          label="Bioskopi"
          icon={<VideoCameraBackOutlined />}
        />
        <BottomNavigationAction
          sx={{
            ...navActionStyles(location.pathname === namedRoutes.settings),
            borderBottomRightRadius: '32px',
            borderTopRightRadius: '32px',
          }}
          component={Link}
          to={namedRoutes.settings}
          label="Podešavanja"
          icon={<Tune />}
        />
      </BottomNavigation>
    </ThemeProvider>
  );
}

export default FooterMenuWrapper;
