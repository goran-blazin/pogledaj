import {AdminRole} from '@prisma/client';
import {AdminUserSafe} from '../types/CommonTypes';

export default {
  checkAccessToCinema(user: AdminUserSafe, cinemaId: string) {
    // if user is super admin always return true
    if (user.role === AdminRole.SuperAdmin) {
      return true;
    }

    // else check if user works for passed cinema
    return (user.cinemaIds as string[]).includes(cinemaId);
  },
};
