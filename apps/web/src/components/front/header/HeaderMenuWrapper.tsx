import {AppBar, Box, Button, ButtonProps, Toolbar, Typography} from '@mui/material';
import {AccountCircle, ArrowBackIos, NotificationsNoneRounded} from '@mui/icons-material';
import {useNavigate, useLocation} from 'react-router-dom';
import {namedRoutes} from '../../../routes';
import PogledajSvgIcon from '../utility/svgCustomIcons/PogledajSvgIcon';
import {SxProps} from '@mui/system';
import {ReactElement} from 'react';

function HeaderMenuButton({
  children,
  props = {},
  visible = true,
}: {
  children: ReactElement;
  props?: ButtonProps;
  visible?: boolean;
}) {
  return (
    <Button
      {...props}
      variant="outlined"
      color="secondary"
      sx={{
        visibility: visible ? 'visible' : 'hidden',
        maxWidth: '32px',
        maxHeight: '32px',
        minWidth: '32px',
        minHeight: '32px',
        borderRadius: '10px',
        border: '1px solid rgba(233, 233, 233, 0.5)',
        boxShadow: '0px 3px 16px rgba(0, 0, 0, 0.05), 0px 3px 10px rgba(0, 0, 0, 0.02)',
      }}
    >
      {children}
    </Button>
  );
}

function HeaderMenuWrapper() {
  const helperIconStyle: SxProps = {
    color: '#A4A4A4',
  };

  const navigate = useNavigate();
  const location = useLocation();

  function goToHome() {
    navigate(namedRoutes.home);
  }

  function goBack() {
    navigate(-1);
  }

  return (
    <AppBar color="secondary" position={'relative'} elevation={0}>
      <Toolbar sx={{justifyContent: 'center'}}>
        <Box
          display="flex"
          flex={'1 auto'}
          justifyContent={'flex-start'}
          visibility={location.pathname === namedRoutes.home ? 'hidden' : 'visible'}
        >
          <HeaderMenuButton
            visible={location.pathname !== namedRoutes.home}
            props={{
              onClick: goBack,
            }}
          >
            <ArrowBackIos sx={helperIconStyle} fontSize={'small'} viewBox="-5 0 24 24" />
          </HeaderMenuButton>
          <HeaderMenuButton visible={false}>
            <ArrowBackIos sx={helperIconStyle} fontSize={'small'} />
          </HeaderMenuButton>
        </Box>
        <Box display="flex" flex={'1 auto'} justifyContent={'center'} alignItems={'center'} onClick={goToHome}>
          <PogledajSvgIcon height="28px" color="primary" viewBox="0 0 24 28" />
          <Typography component="h1" color="primary" fontWeight="600" fontSize="15px" lineHeight="19px" pb="5px">
            pogledaj
          </Typography>
        </Box>
        <Box display="flex" flex={'1 auto'} justifyContent={'flex-end'}>
          <HeaderMenuButton>
            <NotificationsNoneRounded fontSize="small" sx={helperIconStyle} />
          </HeaderMenuButton>
          <HeaderMenuButton>
            <AccountCircle fontSize="small" sx={helperIconStyle} />
          </HeaderMenuButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderMenuWrapper;
