import { defineStore } from 'pinia';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { logout } from '@/calls/auth/logout';
import { login } from '@/calls/auth/login';
import { toast } from 'vue3-toastify';
import { LoginUser } from '@/types/user';
import { checkAuth } from '@/calls/auth/checkAuth';

const [userId, setUserId] = useLocalStorage('userId');

export interface AuthState {
  userId: string | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    userId: userId || null,
    isAuthenticated: userId ? true : false,
  }),
  getters: {
    async getIsAuthenticated(state: AuthState) {
      if (!state.userId) {
        return false;
      }

      try {
        const isAuthenticated = await checkAuth(state.userId);
        state.userId = isAuthenticated ? userId : '';
        state.isAuthenticated = isAuthenticated;
        return state.isAuthenticated;
      } catch (error) {
        toast.error('Error checking auth');
      }
    },
  },
  actions: {
    async login(user: LoginUser) {
      try {
        const userFromServer = await login(user);
        if (userFromServer) {
          setUserId(userFromServer.id);
          this.userId = userFromServer.id;
          this.isAuthenticated = true;
        } else {
          toast.error('Invalid user id');
        }
      } catch (error) {
        toast.error('Error logging in');
      }
    },
    async logout() {
      if (!this.userId) {
        return;
      }

      try {
        await logout(this.userId);
        setUserId('');
        this.userId = '';
        this.isAuthenticated = false;
      } catch (error) {
        toast.error('Error logging out');
      }
    },
  },
});
