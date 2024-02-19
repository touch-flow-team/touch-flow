import client from '@/lib/pockebase';
import { SignupFormData } from '@/lib/zodSchema';

export default async function useSignup(signupFormData: SignupFormData) {
  try {
    const record = await client.collection('users').create(signupFormData);
    return record;
  } catch (error) {
    throw error;
  }
}
