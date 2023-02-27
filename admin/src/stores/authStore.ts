import { defineStore } from 'pinia';

export interface AuthState {
  userId: string;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    userId: '',
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
    setIsAuthenticated(isAuthenticated: boolean) {
      this.isAuthenticated = isAuthenticated;
    },
    setUserId(userId: string) {
      this.userId = userId;
    }
  }
});
