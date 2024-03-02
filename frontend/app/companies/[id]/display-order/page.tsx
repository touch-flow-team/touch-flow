'use client';
import { IOrderDisplay, OrderStatus } from '@/types/order-display';
import Header from '@/components/display-order/Header';
import OrderList from '@/components/display-order/OrderList';
import PageController from '@/components/display-order/PageController';
import client from '@/libs/pocketbase';
import {
  ORDER_DISPLAY_PAGINATION_SIZE,
  PB_COLLECTIONS,
  REVALIDATE_TAG,
} from '@/constants/constants';

import { useEffect, useState } from 'react';
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
      const data: IOrderDisplay[] = await client
        .collection(PB_COLLECTIONS.ORDERS)
        .getFullList({ next: { tags: [REVALIDATE_TAG.DISPLAY] } });
      setOrders(data);
      setTotalPage(
        Math.ceil(
          data.filter((e) => e.order_status === searchParams.status).length /
            ORDER_DISPLAY_PAGINATION_SIZE,
        ),
      );
    };
    getData();
  }, [getDataTrigger, searchParams.status]);

  useEffect(() => {
    client.collection(PB_COLLECTIONS.ORDERS).subscribe('*', function (e) {
      setGetDataTrigger((prev) => !prev);
    });
  }, []);
  if (!orders) return <div>Loading..</div>;
  return (
    <div className="relative h-lvh">
      <Header orders={orders} param={searchParams.status} />
      <OrderList page={Number(page)} status={searchParams.status} orders={orders} />
      <PageController page={Number(page)} total_page={totalPage} status={searchParams.status} />
    </div>
  );
}
