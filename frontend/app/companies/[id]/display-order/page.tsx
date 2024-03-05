'use client';
import { IOrderDisplay, OrderStatus } from '@/types/order-display';
import Header from '@/components/display-order/Header';
import OrderList from '@/components/display-order/OrderList';
import PageController from '@/components/display-order/PageController';
import client from '@/libs/pocketbase';
import { ORDER_DISPLAY_PAGINATION_SIZE, PB_COLLECTIONS } from '@/constants/constants';
import { useEffect, useState } from 'react';
import FallbackHeader from '@/components/display-order/skeleton/FallbackHeader';
import FallbackOrderList from '@/components/display-order/skeleton/FallbackOrderCard';

export default function DisplayOrderPage({
  searchParams,
}: {
  searchParams: { page: string; status: OrderStatus };
}) {
  const [orders, setOrders] = useState<IOrderDisplay[]>();
  const [totalPage, setTotalPage] = useState(0);
  const page = searchParams.page;
  const [getDataTrigger, setGetDataTrigger] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data: IOrderDisplay[] = await client.collection(PB_COLLECTIONS.ORDERS).getFullList();
        setOrders(data);
        setTotalPage(
          Math.ceil(
            data.filter((e) => e.order_status === searchParams.status).length /
              ORDER_DISPLAY_PAGINATION_SIZE,
          ),
        );
      } catch (error) {
        throw { error };
      }
    };
    getData();
  }, [getDataTrigger, searchParams.status]);

  useEffect(() => {
    client.collection(PB_COLLECTIONS.ORDERS).subscribe('*', function (e) {
      setGetDataTrigger((prev) => !prev);
    });
    return () => {
      client.collection(PB_COLLECTIONS.ORDERS).unsubscribe();
    };
  }, []);

  if (!orders) {
    return (
      <div className="relative h-lvh">
        <FallbackHeader />
        <FallbackOrderList />
      </div>
    );
  }

  return (
    <div className="relative h-lvh">
      <Header orders={orders} param={searchParams.status} />
      <OrderList page={Number(page)} status={searchParams.status} orders={orders} />
      <PageController page={Number(page)} total_page={totalPage} status={searchParams.status} />
    </div>
  );
}
