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

type Key = typeof obj[keyof typeof obj]