'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FaAngleLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { resetOrders } from '@/server-actions/display/updateOrderStatus';
import { IOrderDisplay, OrderStatus } from '@/types/order-display';
import { ORDER_STATUS } from '@/constants/constants';
import Modal from '../common/Modal';

interface IProps {
  orders: IOrderDisplay[];
  param: OrderStatus;
}

const Header = ({ orders, param }: IProps) => {
  const receive_count = orders.filter((e) => e.order_status === ORDER_STATUS.RECEIVE).length;
  const complete_count = orders.filter((e) => e.order_status === ORDER_STATUS.COMPLETE).length;
  const cancel_count = orders.filter((e) => e.order_status === ORDER_STATUS.CANCEL).length;
  const router = useRouter();
  const TAB_TRIGGER_ELEMS = [
    {
      value: 'receive',
      router: ORDER_STATUS.RECEIVE,
      title: '접수',
      count: receive_count,
    },
    {
      value: 'complete',
      router: ORDER_STATUS.COMPLETE,
      title: '완료',
      count: complete_count,
    },
    {
      value: 'cancel',
      router: ORDER_STATUS.CANCEL,
      title: '취소',
      count: cancel_count,
    },
  ];

  return (
    <div className="w-full h-[100px] flex justify-between items-center bg-gray-200 p-7">
      <Button className=" bg-gray-200 hover:bg-gray-200">
        <FaAngleLeft className="text-black size-7" />
      </Button>
      <Tabs defaultValue={param} className="w-[50%] flex justify-center">
        <TabsList className="w-full">
          {TAB_TRIGGER_ELEMS.map((tab) => {
            return (
              <TabsTrigger
                value={tab.value}
                className="w-full"
                onClick={() => router.push(`?status=${tab.router}&page=1`)}>
                {tab.title} {tab.count}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
      <Modal
        InnerComponent={
          <div className="flex justify-center">
            <Button size="lg" variant="destructive" onClick={() => resetOrders()}>
              초기화
            </Button>
          </div>
        }
        title="초기화 하시겠습니까?"
        trigger={<Button>초기화</Button>}
      />
    </div>
  );
};

export default Header;
