import { axiosAdminClient } from '@/utils/axiosClient';

export const deleteProduct = (id: string) => {
  return axiosAdminClient.delete(`/products/${id}`).then(res => res.data);
};
