import {AuthProvider, UserIdentity} from 'react-admin';
import AdminAuthService from './AdminAuthService';
import jwt_decode from 'jwt-decode';
import {AdminUserJwtPayload, AUTH_DATA_LOCAL_STORAGE, AuthData} from '../types/GeneralTypes';

const ReactAdminAuthProvider: AuthProvider = {
  async checkAuth(): Promise<void> {
    if (!localStorage.getItem(AUTH_DATA_LOCAL_STORAGE)) {
      throw new Error('Please login to continue');
    }
  },
  async checkError(error): Promise<void> {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem(AUTH_DATA_LOCAL_STORAGE);
      return Promise.reject({redirectTo: '/admin/login'});
    }
    // other error code (404, 500, etc.): no need to log out
  },
  async getIdentity(): Promise<UserIdentity> {
    const authDataString = localStorage.getItem(AUTH_DATA_LOCAL_STORAGE);
    if (authDataString) {
      const authData: AuthData = JSON.parse(authDataString);
      const userPayload = jwt_decode<AdminUserJwtPayload>(authData.accessToken);

      return {
        id: userPayload.email,
        fullName: userPayload.fullName,
        adminUserRole: userPayload.adminUserRole,
        cinemaIds: userPayload.cinemaIds,
        email: userPayload.email,
      };
    }

    throw new Error('User not found');
  },
  async getPermissions(): Promise<any> {
    return Promise.resolve(undefined);
  },
  async handleCallback(): Promise<any> {
    return Promise.resolve(undefined);
  },
  async login({username, password}): Promise<boolean> {
    try {
      const authData = await AdminAuthService.localLogin(username, password);
      localStorage.setItem(AUTH_DATA_LOCAL_STORAGE, JSON.stringify(authData));

      return true;
    } catch (e) {
      throw new Error('Login failed');
    }
  },
  async logout(): Promise<void | false | string> {
    localStorage.removeItem(AUTH_DATA_LOCAL_STORAGE);
  },
};

export default ReactAdminAuthProvider;
