import { CardHeader } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { elapsedBgColor, elapsedTextColor, getTime } from '@/libs/utils';
import { getElapsedMinutes } from '@/libs/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { GoClock } from 'react-icons/go';
import { updateOrderStatus } from '@/server-actions/display/updateOrderStatus';
import { OrderStatus } from '@/types/order-display';
import { ORDER_STATUS } from '@/constants/constants';

interface IProps {
  order_time: string;
  order_status: OrderStatus;
  order_number: number;
  order_id: string;
  complete_time: string;
}

const OrderCardHeader = ({
  order_time,
  order_number,
  order_status,
  order_id,
  complete_time,
}: IProps) => {
  const BADGE_BG = elapsedBgColor(getElapsedMinutes(order_time));
  const time = getTime(order_time);
  const [timeTrigger, setTimeTrigger] = useState(false);
  const [elapsedMinute, setElapsedMinute] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeTrigger((prev) => !prev);
    }, 1000 * 60);
    setElapsedMinute(getElapsedMinutes(order_time));

    return () => {
      clearInterval(interval);
    };
  }, [timeTrigger]);

  return (
    <CardHeader className="bg-gray-900 text-white p-5 rounded-t-md flex flex-col gap-3  ">
      <div className="flex justify-between">
        <strong>#{order_number}</strong>
        <div className="flex gap-2">
          {order_status === ORDER_STATUS.RECEIVE && <span>{time}</span>}
          {order_status === ORDER_STATUS.RECEIVE ? (
            <Badge
              className={`bg-${BADGE_BG} text-${elapsedTextColor(getElapsedMinutes(order_time))} flex gap-2 `}>
              <GoClock />
              {elapsedMinute}분 경과
            </Badge>
          ) : (
            <Badge className={`bg-white text-black flex gap-2`}>
              <GoClock />
              {getTime(complete_time)}
            </Badge>
          )}
        </div>
      </div>
      {order_status === ORDER_STATUS.RECEIVE && (
        <div className="flex justify-between gap-2">
          <Button
            className="bg-blue-500 hover:bg-blue-300 flex-1"
            onClick={() =>
              updateOrderStatus({
                id: order_id,
                data: { order_status: 'complete', complete_time: new Date() },
              })
            }>
            완료
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-300 flex-1"
            onClick={() =>
              updateOrderStatus({
                id: order_id,
                data: { order_status: 'cancel', complete_time: new Date() },
              })
            }>
            취소
          </Button>
        </div>
      )}
    </CardHeader>
  );
};

export default OrderCardHeader;
