import {AdminRole, AdminRoutes} from '../types/GeneralTypes';

const AdminRoutePermissions: Record<AdminRoutes, AdminRole[]> = {
  [AdminRoutes.adminUsers]: [AdminRole.Manager],
  [AdminRoutes.movies]: [AdminRole.Manager],
  [AdminRoutes.movieTickets]: [AdminRole.Manager, AdminRole.Employee],
};

const AdminHelper = {
  checkRoutePermissions(adminRouteName: AdminRoutes, adminRole: AdminRole) {
    if (adminRole === AdminRole.SuperAdmin) {
      // SuperAdmin has access to everything!
      return true;
    }

    return AdminRoutePermissions[adminRouteName].includes(adminRole);
  },
};

export default AdminHelper;
