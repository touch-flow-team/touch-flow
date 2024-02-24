import client from '@/libs/pocketbase';

export default function useLogout() {
  return client.authStore.clear();
}
