'use client';
import client from '@/libs/pockebase';

export default function useLogout() {
  return client.authStore.clear();
}
