import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/Auth';

const host = import.meta.env.COGNEX_API_HOST ?? '';

export default async function sendRequest(requireLogin: boolean, endpoint: string, init: RequestInit = {}): Promise<Response> {
  const authStore = useAuthStore();
  const { clearAuth } = authStore;
  const { token, isAuthenticated, showLoginDialog } = storeToRefs(authStore);

  if (requireLogin) {
    if (!isAuthenticated.value) {
      showLoginDialog.value = true;
      throw new Error('用户未登录');
    }

    init.headers = {
      ...(init.headers ?? {}),
      Authorization: token.value!,
    };
  }

  const response = await fetch(host + endpoint, init);
  if (response.status === 401) {
    clearAuth();
    showLoginDialog.value = true;
  }
  if (response.status != 200) {
    throw new Error((await response.json()).error);
  }

  return response;
}
