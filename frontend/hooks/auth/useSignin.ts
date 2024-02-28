'use client';

import client from '@/libs/pocketbase';
import { toast } from '@/components/ui/use-toast';
import { ClientResponseError } from 'pocketbase';

export default function useSignin() {
  const signin = async (email: string, password: string) => {
    try {
      const authData = await client.collection('users').authWithPassword(email, password);
      toast({
        variant: 'default',
        title: `✅ 로그인 성공적으로 완료했습니다`,
      });
      document.cookie = client.authStore.exportToCookie({ httpOnly: false, secure: false });
      return authData;
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast({
          variant: 'destructive',
          title: `올바르지 않은 회원 정보입니다.`,
          description: `이메일과 비밀번호를 확인 해주세요.`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: '알 수 없는 에러 발생',
          description: '로그인을 시도하는 중에 알 수 없는 문제가 발생했습니다.',
        });
      }
      throw error;
    }
  };
  return signin;
}
