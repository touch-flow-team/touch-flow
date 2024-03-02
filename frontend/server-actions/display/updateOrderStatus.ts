'use server';

import { PB_COLLECTIONS, REVALIDATE_TAG } from '@/constants/constants';
import client from '@/libs/pocketbase';
import { OrderStatus } from '@/types/order-display';
import { revalidateTag } from 'next/cache';

interface IUpdate {
  id: string;
  data: {
    order_status: OrderStatus;
    complete_time: Date;
  };
}

export const updateOrderStatus = async ({ id, data }: IUpdate) => {
  await client
    .collection(PB_COLLECTIONS.ORDERS)
    .update(id, data)
    .then(() => revalidateTag(REVALIDATE_TAG.DISPLAY));
};
