import {Link, useLocation} from 'react-router-dom';
import {BottomNavigation, BottomNavigationAction} from '@mui/material';
import {HomeOutlined, TheatersOutlined, Tune, VideoCameraBackOutlined} from '@mui/icons-material';
import {SxProps} from '@mui/system';
import namedRoutes from '../../../routes';

function FooterMenuWrapper() {
  const navActionStyles: SxProps = (isSelected = false) => {
    return {
      color: isSelected ? 'primary.main' : 'text.secondary',
      fontWeight: '600',
      minWidth: '60px',
    };
  };

  const location = useLocation();

  return (
    <BottomNavigation
      component={'footer'}
      showLabels
      sx={{
        position: 'fixed',
        bottom: '16px',
        width: 'calc(100% - 24px);',
        margin: '0 auto',
        boxShadow: '0px 3px 16px rgba(0, 0, 0, 0.05), 0px 3px 10px rgba(0, 0, 0, 0.02)',
        border: '1px solid rgba(233, 233, 233, 0.5)',
        backdropFilter: 'blur(10px)',
        borderRadius: '32px',
        marginLeft: '12px',
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
        sx={navActionStyles(location.pathname === namedRoutes.moviesListing)}
        component={Link}
        to={namedRoutes.moviesListing}
        label="Filmovi"
        icon={<TheatersOutlined />}
      />
      <BottomNavigationAction
        sx={navActionStyles(location.pathname === namedRoutes.cinemasListing)}
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
  );
}

export default FooterMenuWrapper;
