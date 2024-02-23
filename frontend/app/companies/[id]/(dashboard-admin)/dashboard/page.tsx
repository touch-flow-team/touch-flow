'use client';
import { useState } from 'react';
import Box from '@/components/dashboard/Box';
import MonthRevenue from '@/components/dashboard/MonthRevenue';
import WeekRevenue from '@/components/dashboard/WeekRevenue';
import TimeRevenue from '@/components/dashboard/TimeRevenue';
import DateSelector from '@/components/dashboard/DateSelector';

export default function Dashboard() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  return (
    <div className="w-full">
      <header className="w-full p-6">
        <DateSelector year={year} month={month} />
      </header>
      <section className="w-full flex flex-col items-center bg-gray-100 gap-5  pt-5 pb-5">
        <div className="w-[90%] grid grid-rows-2 grid-flow-col gap-4">
          <Box title="총 매출" data={10000000} />
          <Box title="총 환불" data={10000} />
          <Box title="총 할인" data={381123} />
          <Box title="Best 메뉴" data={'아이스 아메리카노'} />
        </div>
        <div className="w-[90%] p-3 bg-white rounded-md ">
          <strong>일자별 매출</strong>
          <div className="w-full h-[300px] mt-3">
            <MonthRevenue />
          </div>
        </div>

        <div className="w-[90%] flex gap-2 flex-grow-1 ">
          <div className="p-3 bg-white rounded-md flex-1">
            <strong>요일별 평균 매출</strong>
            <div className="w-full h-[300px] mt-3">
              <WeekRevenue />
            </div>
          </div>
          <div className="p-3 bg-white rounded-md flex-1">
            <strong>시간대별 매출</strong>
            <div className="w-full h-[300px] mt-3">
              <TimeRevenue />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
