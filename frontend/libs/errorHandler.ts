import Cookies from 'js-cookie';
import { COOKIE_MESSAGE_ID } from '@/constants/constants';
import { MESSAGE_LOGOUT_PLS } from '@/constants/errormessage';
import { toast } from '@/components/ui/use-toast';

export const CheckSignUserMessage = () => {
  const message = Cookies.get(COOKIE_MESSAGE_ID);

  if (message != undefined) {
    toast({ title: message });
    Cookies.remove(COOKIE_MESSAGE_ID);
  } else {
    return;
  }
};
