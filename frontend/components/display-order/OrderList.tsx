import OrderCard from './OrderCard';
import {
  ORDER_MOCK_DATA,
  ORDER_DISPLAY_PAGINATION_SIZE,
  ORDER_MOCK_DATA_COMPELTE,
} from '@/constants/constants';

interface IProps {
  page: number;
  status: 'prepare' | 'complete';
}

const OrderList = ({ page, status }: IProps) => {
  const MOCK_DATA = status === 'prepare' ? ORDER_MOCK_DATA : ORDER_MOCK_DATA_COMPELTE;
  const order_data = MOCK_DATA.slice(
    (page - 1) * ORDER_DISPLAY_PAGINATION_SIZE,
    page * ORDER_DISPLAY_PAGINATION_SIZE,
  );

  return (
    <div className="w-full p-10 flex gap-3 justify-start items-start">
      {order_data.map((e) => (
        <OrderCard
          key={e.order_number}
          order_elapsed={e.order_elapsed}
          order_menus={e.order_menus}
          order_number={e.order_number}
          order_status={status as 'prepare' | 'complete'}
          order_time={e.order_time}
        />
      ))}
    </div>
  );
};

export default OrderList;
