import {
  IUserData,
  IResponseUserData,
  IResponseUserDataLogin,
  IUser,
} from '../types/types';
import { instant } from '../api/axios.api';

export const AuthService = {
  async registration(
    userData: IUserData,
  ): Promise<IResponseUserData | undefined> {
    const { data } = await instant.post<IResponseUserData>('user', userData);
    return data;
  },
  async login(
    userData: IUserData,
  ): Promise<IResponseUserDataLogin | undefined> {
    const { data } = await instant.post<IResponseUserDataLogin>(
      'auth/login',
      userData,
    );

    return data;
  },
  async getProfile(): Promise<Omit<IUser, 'token'> | undefined> {
    const { data } = await instant.get<Omit<IUser, 'token'>>('auth/profile');

    if (data) {
      return data;
    }
  },
};
