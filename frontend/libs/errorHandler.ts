import Cookies from 'js-cookie';
import { COOKIE_MESSAGE_ID } from '@/constants/constants';
import { MESSAGE_LOGOUT_PLS } from '@/constants/errormessage';
import { toast } from '@/components/ui/use-toast';

export const onClickCheckSignUser = () => {
  const message = Cookies.get(COOKIE_MESSAGE_ID);
  if (message) {
    toast({ title: message });
  } else if (message == null) {
    toast({ title: MESSAGE_LOGOUT_PLS });
  } else {
    Cookies.remove(COOKIE_MESSAGE_ID);
  }
};
