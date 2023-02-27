import { useQuery } from '@tanstack/vue-query';


import { axiosAdminClient } from '@/utils/axiosClient';

export const checkAuth = (id: string) => {
  return axiosAdminClient.get('/check', {
    headers: {
      Authorization: id,
    }
  }).then(response => response.data);
};

export function useCheckAuth(id: string) {
  return useQuery<string>(['checkAuth', id], () => checkAuth(id));
}
