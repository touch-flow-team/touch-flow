import { toast } from '@/components/ui/use-toast';
import client from '@/lib/pockebase';

export default async function useSignin(email: string, password: string) {
  try {
    const authData = await client.collection('users').authWithPassword(email, password);
    toast({
      title: `✅ 로그인 성공적으로 완료했습니다`,
    });
    return authData;
  } catch (error) {
    throw error;
  }
}
