import * as React from 'react';
import {Menu} from 'react-admin';
// import {MenuProps} from 'ra-ui-materialui/src/layout/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

// cannot import MenuProps type due to tsc unable to compile
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const CustomMenu = function (props) {
  return (
    <Menu {...props}>
      <Menu.Item to="/admin/adminUsers" primaryText="Administratori" leftIcon={<AdminPanelSettingsIcon />} />
      <Menu.Item to="/admin/movieTickets" primaryText="Validacija Karata" leftIcon={<ConfirmationNumberIcon />} />
    </Menu>
  );
};
