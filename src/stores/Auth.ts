import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('Auth', {
  state: () => ({
    token: ref<string | null>(localStorage.getItem('authToken')),
    isAuthenticated: ref<boolean>(!!localStorage.getItem('authToken')),
    username: ref<string | null>(localStorage.getItem('username')),
    selectedTab: ref<'login' | 'register'>('login'),
    showLoginDialog: ref<boolean>(false),
  }),
  actions: {
    setAuth(token: string, username: string) {
      this.token = token;
      this.isAuthenticated = true;
      this.username = username;
      localStorage.setItem('authToken', token);
      localStorage.setItem('username', username);
    },
    clearAuth() {
      this.token = null;
      this.isAuthenticated = false;
      this.username = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
    },
    openLoginDialog() {
      this.showLoginDialog = true;
    },
    closeLoginDialog() {
      this.showLoginDialog = false;
    },
  },
});
