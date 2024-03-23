'use client';

import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useHistoriesAndOrders } from '@/hooks/companies/useHistoriesAndOrders';

export function DataTable({ date, setHistories }: { date: Date, setHistories: Function }) {
  const orders = useHistoriesAndOrders(date, setHistories);

  return (
    <div className="rounded-md pb-3 border w-[90%]">
      <Table>
        <TableCaption className='pb-3'>최근 거래 목록 입니다.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">결제 시간</TableHead>
            <TableHead>상품 내역</TableHead>
            <TableHead>결제 수단</TableHead>
            <TableHead className="text-right">가격</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.mId}>
              <TableCell className="font-medium">{format(new Date(order.requestedAt), "HH시 mm분")}</TableCell>
              <TableCell>{order.orderName}</TableCell>
              <TableCell>{order.easyPay?.provider}</TableCell>
              <TableCell className="text-right">{order.totalAmount.toLocaleString()}원</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div >
  );
}
