export const PB_COLLECTIONS = {
  USERS: 'users',
  COMPANIES: 'companies',
  CATEGORIES: 'categories',
  MANAGEMENT_WAITS: 'management_waits',
  PRODUCTS: 'products',
  USER_WAITS: 'user_waits',
};

export const REVALIDATE_TAG = {
  PRODUCT: 'PRODUCT',
  CATEGORY: 'CATEGORY',
};

export const PRODUCT_PAGINATION_SIZE = 4;

export const SIGNIN_URL = '/auth/signin';
export const COOKIE_MESSAGE_ID = 'message';

export const ORDER_DISPLAY_PAGINATION_SIZE = 4;

/*
 ** --------------------------------
 ** 이곳 하위에 있는 것은 임시 데이터입니다.
 ** 삭제 예정입니다.
 ** --------------------------------
 */

export const ORDER_MOCK_DATA = [
  {
    order_number: 6,
    order_menus: [
      {
        menu: '아메리카노',
        amount: 3,
      },
      {
        menu: '초코 케익',
        amount: 1,
      },
      {
        menu: '라떼',
        amount: 1,
      },
      {
        menu: '블루베리 스무디',
        amount: 1,
      },
    ],
    order_time: '13:27',
    order_elapsed: 15,

    order_status: '접수',
  },
  {
    order_number: 7,
    order_menus: [
      {
        menu: '아메리카노',
        amount: 3,
      },
      {
        menu: '초코 케익',
        amount: 1,
      },
      {
        menu: '라떼',
        amount: 1,
      },
      {
        menu: '블루베리 스무디',
        amount: 1,
      },
      {
        menu: '라떼',
        amount: 1,
      },
      {
        menu: '블루베리 스무디',
        amount: 1,
      },
    ],
    order_time: '13:25',
    order_elapsed: 13,

    order_status: '접수',
  },
  {
    order_number: 8,
    order_menus: [
      {
        menu: '아메리카노',
        amount: 3,
      },
    ],
    order_time: '13:17',
    order_elapsed: 5,
    order_status: '접수',
  },
  {
    order_number: 9,
    order_menus: [
      {
        menu: '아메리카노',
        amount: 2,
      },
      {
        menu: '말차 라떼',
        amount: 1,
      },
    ],
    order_time: '13:15',
    order_elapsed: 3,
    order_status: '접수',
  },
  {
    order_number: 10,
    order_menus: [
      {
        menu: '아메리카노',
        amount: 2,
      },
      {
        menu: '말차 라떼',
        amount: 1,
      },
    ],
    order_time: '13:15',
    order_elapsed: 3,
    order_status: '접수',
  },
  {
    order_number: 11,
    order_menus: [
      {
        menu: '아메리카노',
        amount: 2,
      },
      {
        menu: '말차 라떼',
        amount: 1,
      },
    ],
    order_time: '13:15',
    order_elapsed: 3,
    order_status: '접수',
  },
  {
    order_number: 12,
    order_menus: [
      {
        menu: '아메리카노',
        amount: 2,
      },
      {
        menu: '말차 라떼',
        amount: 1,
      },
    ],
    order_time: '13:15',
    order_elapsed: 3,
    order_status: '접수',
  },
];

export const ORDER_MOCK_DATA_COMPELTE = [
  {
    order_number: 1,
    order_menus: [
      {
        menu: '아메리카노',
        amount: 3,
      },
      {
        menu: '초코 케익',
        amount: 1,
      },
      {
        menu: '라떼',
        amount: 1,
      },
      {
        menu: '블루베리 스무디',
        amount: 1,
      },
    ],
    order_time: '13:27',
    order_elapsed: 15,

    order_status: '접수',
  },
  {
    order_number: 2,
    order_menus: [
      {
        menu: '아메리카노',
        amount: 3,
      },
      {
        menu: '초코 케익',
        amount: 1,
      },
      {
        menu: '라떼',
        amount: 1,
      },
      {
        menu: '블루베리 스무디',
        amount: 1,
      },
      {
        menu: '라떼',
        amount: 1,
      },
      {
        menu: '블루베리 스무디',
        amount: 1,
      },
    ],
    order_time: '13:25',
    order_elapsed: 13,

    order_status: '접수',
  },
  {
    order_number: 3,
    order_menus: [
      {
        menu: '아메리카노',
        amount: 3,
      },
    ],
    order_time: '13:17',
    order_elapsed: 5,
    order_status: '접수',
  },
  {
    order_number: 4,
    order_menus: [
      {
        menu: '아메리카노',
        amount: 2,
      },
      {
        menu: '말차 라떼',
        amount: 1,
      },
    ],
    order_time: '13:15',
    order_elapsed: 3,
    order_status: '접수',
  },
  {
    order_number: 5,
    order_menus: [
      {
        menu: '아메리카노',
        amount: 2,
      },
      {
        menu: '말차 라떼',
        amount: 1,
      },
    ],
    order_time: '13:15',
    order_elapsed: 3,
    order_status: '접수',
  },
  {
    order_number: 6,
    order_menus: [
      {
        menu: '아메리카노',
        amount: 2,
      },
      {
        menu: '말차 라떼',
        amount: 1,
      },
    ],
    order_time: '13:15',
    order_elapsed: 3,
    order_status: '접수',
  },
  {
    order_number: 7,
    order_menus: [
      {
        menu: '아메리카노',
        amount: 2,
      },
      {
        menu: '말차 라떼',
        amount: 1,
      },
    ],
    order_time: '13:15',
    order_elapsed: 3,
    order_status: '접수',
  },
];

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
