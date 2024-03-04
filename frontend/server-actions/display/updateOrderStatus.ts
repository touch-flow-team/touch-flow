'use server';

import { PB_COLLECTIONS } from '@/constants/constants';
import client from '@/libs/pocketbase';
import { OrderStatus } from '@/types/order-display';
import { redirect } from 'next/navigation';

interface IUpdate {
  id: string;
  data: {
    order_status: OrderStatus;
    complete_time: Date;
  };
}

export const updateOrderStatus = async ({ id, data }: IUpdate) => {
  await client.collection(PB_COLLECTIONS.ORDERS).update(id, data);
};

export const resetOrders = async () => {
  const orders = await client.collection(PB_COLLECTIONS.ORDERS).getFullList();
  orders.map(async (order) => {
    await client.collection(PB_COLLECTIONS.ORDERS).delete(order.id);
  });
  redirect('display-order?status=receive&page=1');
};
