'use client';
import client from '@/libs/pockebase';
import { toast } from '@/components/ui/use-toast';
import { SignupFormData } from '@/types/auth/type';
import { ClientResponseError } from 'pocketbase';

export default function useSignup() {
  const signup = async (signupFormData: SignupFormData) => {
    try {
      await client.collection('users').create(signupFormData);
      toast({
        variant: 'default',
        title: `💬 ${signupFormData.username}님의 유저생성을 성공적으로 완료했습니다`,
      });
    } catch (error) {
      if (error instanceof ClientResponseError) {
        const firstErrorKey = Object.keys(error.data['data'])[0];
        const firstErrorMessage = error.data['data'][firstErrorKey].message;
        toast({
          variant: 'destructive',
          title: `아래의 사유로 회원가입이 진행되지 않았습니다.`,
          description: `${firstErrorKey}: ${firstErrorMessage}`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: '알 수 없는 에러 발생',
          description: '회원가입을 시도하는 중에 알 수 없는 문제가 발생했습니다.',
        });
      }
      throw null;
    }
  };

  return signup;
}
