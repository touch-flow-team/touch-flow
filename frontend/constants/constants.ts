export const PB_COLLECTIONS = {
  USERS: 'users',
  COMPANIES: 'companies',
  CATEGORIES: 'categories',
  MANAGEMENT_WAITS: 'management_waits',
  PRODUCTS: 'products',
  USER_WAITS: 'user_waits',
  STOCKS: 'stocks',
};

export const REVALIDATE_TAG = {
  PRODUCT: 'PRODUCT',
  CATEGORY: 'CATEGORY',
  STOCK: 'STOCK',
};

export const PRODUCT_PAGINATION_SIZE = 4;

export const SIGNIN_URL = '/auth/signin';
export const COOKIE_MESSAGE_ID = 'message';

/*
 ** --------------------------------
 ** 이곳 하위에 있는 것은 임시 데이터입니다.
 ** 삭제 예정입니다.
 ** --------------------------------
 */

import { ColumnDef } from '@tanstack/react-table';

export type Payment = {
  UID: string;
  price: number;
  time: string;
  payment: 'toss' | 'kakao';
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'UID',
    header: 'Order UID',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'payment',
    header: 'Payment',
  },
  {
    accessorKey: 'time',
    header: 'Time',
  },
];

const obj = { red: 'apple', yellow: 'banana', green: 'cucumber' } as const;

type Key = (typeof obj)[keyof typeof obj];
