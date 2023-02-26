import { z } from 'zod';
import { useQuery } from '@tanstack/vue-query';
import { axiosAdminClient } from '@/utils/axiosClient';

export const emailShema = z.string().email();
export const passwordShema = z.string().min(8);

export type Email = z.infer<typeof emailShema>;
export type Password = z.infer<typeof passwordShema>;

export const useLogin = (email: Email, password: Password, enable: boolean) => {
  return useQuery(
    ['login', email, password],
    async () => {
      const { data } = await axiosAdminClient.post('/login', {
        email,
        password,
      });
      return data;
    },
    {
      enabled: enable,
    }
  );
}
