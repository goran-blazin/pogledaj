import {AppBar, Box, Button, ButtonProps, Toolbar} from '@mui/material';
import {AccountCircle, ArrowBackIos, NotificationsNoneRounded, Menu, Clear} from '@mui/icons-material';
import {useNavigate, useLocation} from 'react-router-dom';
import {namedRoutes} from '../../../routes';
import SvgIconComp from '../utility/svgCustomIcons/SvgIconComp';
import MainLogoIcon from '../utility/svgCustomIcons/main_logo.svg';
import {SxProps} from '@mui/system';
import React, {ReactElement} from 'react';
import Utils from '../../../helpers/Utils';

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

  return (
    <AppBar
      color="secondary"
      position={'relative'}
      elevation={0}
      sx={{
        backgroundColor: (theme) => theme.headerTheme.backgroundColor,
      }}
    >
      <Toolbar sx={{justifyContent: 'center'}}>
        <Box
          display="flex"
          flex={'1 auto'}
          justifyContent={'flex-start'}
          visibility={location.pathname === namedRoutes.home ? 'hidden' : 'visible'}
        >
          <HeaderMenuButton
            visible={location.pathname !== namedRoutes.home && location.pathname !== namedRoutes.settings}
            props={{
              onClick: () => navigate(-1),
            }}
          >
            <ArrowBackIos sx={helperIconStyle} fontSize={'small'} viewBox="-5 0 24 24" />
          </HeaderMenuButton>
          <HeaderMenuButton visible={false}>
            <ArrowBackIos sx={helperIconStyle} fontSize={'small'} />
          </HeaderMenuButton>
          <HeaderMenuButton visible={false}>
            <ArrowBackIos sx={helperIconStyle} fontSize={'small'} />
          </HeaderMenuButton>
        </Box>
        <Box
          component="a"
          href={namedRoutes.home}
          onClick={(e) => {
            e.preventDefault();
            navigate(namedRoutes.home);
          }}
          display="flex"
          flex={'1 auto'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <SvgIconComp src={MainLogoIcon} />
        </Box>
        <Box display="flex" flex={'1 auto'} justifyContent={'flex-end'}>
          <HeaderMenuButton visible={Utils.isBetaMode()}>
            <NotificationsNoneRounded fontSize="small" sx={helperIconStyle} />
          </HeaderMenuButton>
          <HeaderMenuButton visible={Utils.isBetaMode()}>
            <AccountCircle fontSize="small" sx={helperIconStyle} />
          </HeaderMenuButton>
          <HeaderMenuButton
            props={{
              onClick: () => {
                if (location.pathname === namedRoutes.settings) {
                  navigate(-1);
                } else {
                  navigate(namedRoutes.settings);
                }
              },
            }}
          >
            {location.pathname === namedRoutes.settings ? (
              <Clear fontSize="small" sx={helperIconStyle} />
            ) : (
              <Menu fontSize="small" sx={helperIconStyle} />
            )}
          </HeaderMenuButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderMenuWrapper;
