import * as React from 'react';
import {Menu, usePermissions} from 'react-admin';
// import {MenuProps} from 'ra-ui-materialui/src/layout/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import {AdminRole, AdminRoutes} from '../../../types/GeneralTypes';
import AdminHelper from '../../../helpers/AdminHelper';

const getAdminRoute = (adminRoute: AdminRoutes) => `/admin/${adminRoute}`;

// cannot import MenuProps type due to tsc unable to compile
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const CustomMenu = function (props) {
  const {permissions} = usePermissions<AdminRole>();

  return (
    <Menu {...props}>
      {AdminHelper.checkRoutePermissions(AdminRoutes.adminUsers, permissions) ? (
        <Menu.Item
          to={getAdminRoute(AdminRoutes.adminUsers)}
          primaryText="Administratori"
          leftIcon={<AdminPanelSettingsIcon />}
        />
      ) : null}
      {AdminHelper.checkRoutePermissions(AdminRoutes.movieTickets, permissions) ? (
        <Menu.Item
          to={getAdminRoute(AdminRoutes.movieTickets)}
          primaryText="Validacija Karata"
          leftIcon={<ConfirmationNumberIcon />}
        />
      ) : null}
    </Menu>
  );
};
