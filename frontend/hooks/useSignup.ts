'use client';
import client from '@/lib/pockebase';
import { toast } from '@/components/ui/use-toast';
import { SignupFormData } from '@/lib/zodSchema';

export default async function useSignup(signupFormData: SignupFormData) {
  try {
    await client.collection('users').create(signupFormData);
    toast({
      title: `💬 ${signupFormData.username}님의 유저생성을 성공적으로 완료했습니다`,
    });
  } catch (error) {
    throw error;
  }
}
