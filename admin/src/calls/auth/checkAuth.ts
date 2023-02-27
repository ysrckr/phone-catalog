import { axiosAdminClient } from '@/utils/axiosClient';

export const checkAuth = async () => {
  try {
    const response = await axiosAdminClient.get('/auth/check');
    return response.data;
  } catch (error) {
    throw error;
  }
};
