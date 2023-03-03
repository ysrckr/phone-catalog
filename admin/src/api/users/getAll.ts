import { axiosAdminClient } from '@/utils/axiosClient';

export const getAllUsers = async (userId: string) => {
  try {
    const { data } = await axiosAdminClient.get('/users', {
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
