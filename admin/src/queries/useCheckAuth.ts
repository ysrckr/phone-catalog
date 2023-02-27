import { useQuery } from '@tanstack/vue-query';
import { checkAuth } from '../calls/auth/checkAuth';

export function useCheckAuth(id: string) {
  return useQuery(['checkAuth', id], checkAuth);
}
