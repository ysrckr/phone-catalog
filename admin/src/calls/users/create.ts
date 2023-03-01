import { axiosAdminClient } from '@/utils/axiosClient';
import { CreateUser } from '@/types/user';

export const createUser = async (data: CreateUser, id: string): Promise<any> => {
  return await axiosAdminClient.post('/register', {
    headers: {
      Authorization: id,
    },
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    },
  });
};
