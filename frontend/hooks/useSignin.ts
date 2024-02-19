import client from '@/lib/pockebase';

export default async function useSignin(email: string, password: string) {
  try {
    const authData = await client.collection('users').authWithPassword(email, password);
    return authData;
  } catch (error) {
    throw error;
  }
}
