import {Link} from 'react-router-dom';
import {BottomNavigation, BottomNavigationAction} from '@mui/material';
import {HomeOutlined, TheatersOutlined, VideoCameraBackOutlined} from '@mui/icons-material';

function FooterMenuWrapper() {
  const navActionStyles = {
    color: 'text.secondary',
  };

  return (
    <BottomNavigation
      component={'footer'}
      showLabels
      sx={{
        bgcolor: 'background.default',
        position: 'fixed',
        bottom: 0,
        width: 1.0,
      }}
    >
      <BottomNavigationAction sx={navActionStyles} component={Link} to={'/'} label="Pocetna" icon={<HomeOutlined />} />
      <BottomNavigationAction
        sx={navActionStyles}
        component={Link}
        to={'/movies'}
        label="Filmovi"
        icon={<TheatersOutlined />}
      />
      <BottomNavigationAction
        sx={navActionStyles}
        component={Link}
        to={'/cinemas'}
        label="Bioskopi"
        icon={<VideoCameraBackOutlined />}
      />
    </BottomNavigation>
  );
}

export default FooterMenuWrapper;
