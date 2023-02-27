import { axiosAdminClient } from '../../utils/axiosClient';

export const checkAuth = async (id: string) => {
  const response = axiosAdminClient.get('/check', {
    headers: {
      Authorization: id,
    },
  });

  return (await response).data;
}