import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { GoClock } from 'react-icons/go';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { elapsedBgColor, elapsedTextColor } from '@/libs/utils';

interface IProps {
  order_time: string;
  order_elapsed: number;
  order_status: 'prepare' | 'complete';
  order_number: number;
  order_menus: { menu: string; amount: number }[];
}

const OrderCard = ({
  order_time,
  order_elapsed,
  order_status,
  order_number,
  order_menus,
}: IProps) => {
  const BADGE_BG = elapsedBgColor(order_elapsed);

  return (
    <Card className="w-[25%]">
      <CardHeader className="bg-gray-900 text-white p-5 rounded-t-md flex flex-col gap-3  ">
        <div className="flex justify-between">
          <strong>#{order_number}</strong>
          <div className="flex gap-2">
            {order_status === 'prepare' && <span>{order_time}</span>}
            {order_status === 'prepare' ? (
              <Badge
                className={`bg-${BADGE_BG} text-${elapsedTextColor(order_elapsed)} flex gap-2`}>
                <GoClock />
                {order_elapsed}분 경과
              </Badge>
            ) : (
              <Badge className={`bg-white text-black flex gap-2`}>
                <GoClock />
                {order_time} - 13:50
              </Badge>
            )}
          </div>
        </div>
        {order_status === 'prepare' && (
          <Button className="bg-blue-500 hover:bg-blue-300">완료</Button>
        )}
      </CardHeader>
      <CardContent>
        {order_menus.map((e, idx) => (
          <div
            key={idx}
            className={`p-5 ${idx !== order_menus.length - 1 && 'border-b'} border-gray-200 flex gap-5`}>
            <strong>{e.amount}</strong>
            <strong>{e.menu}</strong>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
