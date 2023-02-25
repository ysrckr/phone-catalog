import { axiosClient } from './axiosClient';

export interface UserRegisterInfo {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
}

export const auth = (userRegisterInfo: UserRegisterInfo) => {
  return axiosClient.post('/users', userRegisterInfo).then(response => {
    return response.data;
  });
};
