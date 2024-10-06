import {AppBar, Box, Button, ButtonProps, Toolbar} from '@mui/material';
import {AccountCircle, ArrowBackIosNew, NotificationsNoneRounded} from '@mui/icons-material';
import {useNavigate, useLocation} from 'react-router-dom';
import {namedRoutes} from '../../../routes';
import SvgIconComp from '../utility/svgCustomIcons/SvgIconComp';
import MainLogoIcon from '../utility/svgCustomIcons/main_logo.svg';
import {SxProps} from '@mui/system';
import React, {ReactElement} from 'react';
import Utils from '../../../helpers/Utils';
import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';

import IconButtonStyled from '../utility/buttons/IconButtonStyled';

function MenuIconStyle(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <MenuIcon />
    </SvgIcon>
  );
}
function ClearIconStyle(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <ClearIcon />
    </SvgIcon>
  );
}
function ArrowBackIconStyle(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <ArrowBackIosNew />
    </SvgIcon>
  );
}

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
        borderRadius: 0,
      }}
    >
      <Toolbar sx={{justifyContent: 'center'}}>
        <Box
          display="flex"
          flex={'1 0 auto'}
          width={'33%'}
          justifyContent={'flex-start'}
          visibility={location.pathname === namedRoutes.home ? 'hidden' : 'visible'}
        >
          <div>
            {location.pathname !== namedRoutes.home && location.pathname !== namedRoutes.settings ? (
              <Box onClick={() => navigate(-1)}>
                <IconButtonStyled>
                  <ArrowBackIconStyle />
                </IconButtonStyled>
              </Box>
            ) : null}
          </div>
        </Box>
        <Box
          component="a"
          href={namedRoutes.home}
          onClick={(e) => {
            e.preventDefault();
            navigate(namedRoutes.home);
          }}
          display="flex"
          flex={'1 0 auto'}
          width={'33%'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <SvgIconComp src={MainLogoIcon} />
        </Box>
        <Box display="flex" flex={'1 0 auto'} width={'33%'} justifyContent={'flex-end'}>
          <HeaderMenuButton visible={Utils.isBetaMode()}>
            <NotificationsNoneRounded fontSize="small" sx={helperIconStyle} />
          </HeaderMenuButton>
          <HeaderMenuButton visible={Utils.isBetaMode()}>
            <AccountCircle fontSize="small" sx={helperIconStyle} />
          </HeaderMenuButton>
          <Box
            display="flex"
            flex={'1 0 auto'}
            justifyContent={'flex-end'}
            onClick={() => {
              if (location.pathname === namedRoutes.settings) {
                navigate(-1);
              } else {
                navigate(namedRoutes.settings);
              }
            }}
          >
            {location.pathname === namedRoutes.settings ? (
              <IconButtonStyled>
                <ClearIconStyle />
              </IconButtonStyled>
            ) : (
              <IconButtonStyled>
                <MenuIconStyle />
              </IconButtonStyled>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderMenuWrapper;
