import { axiosAdminClient } from '@/utils/axiosClient';

export const checkAuth = (id: string) => {
  return axiosAdminClient
    .get('/check', {
      headers: {
        Authorization: id,
      },
    })
    .then(response => response.data);
};
