import client from '@/lib/pockebase';

export default function useLogout() {
  return client.authStore.clear();
}
