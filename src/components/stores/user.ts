// stores/user.ts
import { ref } from 'vue';

export const user = ref(JSON.parse(localStorage.getItem('user') || '{}'));

export const isAuthenticated = () => !!localStorage.getItem('token');

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  user.value = null;
};
