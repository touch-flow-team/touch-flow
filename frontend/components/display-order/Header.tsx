'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FaAngleLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { IOrderDisplay, OrderStatus } from '@/types/order-display';
import { ORDER_STATUS } from '@/constants/constants';

interface IProps {
  orders: IOrderDisplay[];
  param: OrderStatus;
}

const Header = ({ orders, param }: IProps) => {
  const receive_count = orders.filter((e) => e.order_status === ORDER_STATUS.RECEIVE).length;
  const complete_count = orders.filter((e) => e.order_status === ORDER_STATUS.COMPLETE).length;
  const cancel_count = orders.filter((e) => e.order_status === ORDER_STATUS.CANCEL).length;
  const router = useRouter();

  return (
    <div className="w-full h-[100px] flex justify-center items-center bg-gray-200">
      <Button className="absolute left-6 bg-gray-200 hover:bg-gray-200">
        <FaAngleLeft className="text-black size-7" />
      </Button>
      <Tabs defaultValue={param} className="w-[50%] flex justify-center">
        <TabsList className="w-full">
          <TabsTrigger
            value="receive"
            className="w-full"
            onClick={() => router.push(`?status=${ORDER_STATUS.RECEIVE}&page=1`)}>
            접수 {receive_count}
          </TabsTrigger>
          <TabsTrigger
            value="complete"
            className="w-full"
            onClick={() => router.push(`?status=${ORDER_STATUS.COMPLETE}&page=1`)}>
            완료 {complete_count}
          </TabsTrigger>
          <TabsTrigger
            value="cancel"
            className="w-full"
            onClick={() => router.push(`?status=${ORDER_STATUS.CANCEL}&page=1`)}>
            취소 {cancel_count}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Header;
