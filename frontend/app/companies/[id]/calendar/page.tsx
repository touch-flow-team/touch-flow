import Calendar from '@/components/calendar/calendar';

type Order = {
  menu: string;
  category: string;
  quantity: number;
  price: number;
};

export type History = {
  id: string;
  total_price: number;
  payment_method: 'kakao-pay' | 'toss-pay' | 'payco';
  payment_time: string;
  orders: Order[];
};

const getData = async (): Promise<History[]> => {
  return await fetch('https://payment.free.beeceptor.com/historys').then((res) => res.json());
};

export default async function CalendarPage() {
  const data = await getData();
  data.sort((a, b) => {
    const dateA = new Date(a.payment_time);
    const dateB = new Date(b.payment_time);

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0;
    }

    return dateA.getTime() - dateB.getTime();
  });

  return <Calendar history={data} />;
}
