import { axiosAdminClient } from '@/utils/axiosClient';

export const checkAuth = async (id: string) => {
  try {
    const response = await axiosAdminClient.get('/check', {
      headers: {
        Authorization: id,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
