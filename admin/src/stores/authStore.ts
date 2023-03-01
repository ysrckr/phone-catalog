import { defineStore } from 'pinia';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { logout } from '@/calls/auth/logout';
import { login } from '@/calls/auth/login';
import { toast } from 'vue3-toastify';
import { LoginUser } from '@/types/user';
import { checkAuth } from '@/calls/auth/checkAuth';

const [userId, setUserId] = useLocalStorage('userId');

export interface AuthState {
  userId: string;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    userId: userId || '',
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
    async checkAuth() {
      if (userId === '' || !userId) {
        this.isAuthenticated = false;
        this.userId = '';
        return;
      }

      this.userId = userId;

      try {
        const isAuth = await checkAuth(this.userId);
        if (isAuth) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false;
          this.userId = '';
        }
      } catch (error) {
        this.isAuthenticated = false;
        this.userId = '';
      }
    },

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
        setUserId('');
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
