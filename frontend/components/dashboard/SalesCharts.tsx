import React from 'react';
import { format, parseISO, getDay, getHours } from 'date-fns';
import { ko } from 'date-fns/locale';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';
import CustomTooltip from './CustomTooltip';

interface Transaction {
  transactionAt: string;
  amount: number;
}

interface Props {
  transactions: Transaction[];
}


const SalesCharts: React.FC<Props> = ({ transactions }) => {
  const sortedTransactions = transactions.sort((a, b) =>
    parseISO(a.transactionAt).getTime() - parseISO(b.transactionAt).getTime()
  );
  const salesByDate = sortedTransactions.reduce((acc: { name: string; pv: number; }[], curr) => {
    const date = format(parseISO(curr.transactionAt), 'MM월dd일', { locale: ko });
    const existingEntry = acc.find(entry => entry.name === date);

    if (existingEntry) {
      existingEntry.pv += curr.amount;
    } else {
      acc.push({ name: date, pv: curr.amount });
    }

    return acc;
  }, []);

  const salesByDayOfWeek = transactions.reduce((acc, curr) => {
    const dayOfWeek = format(parseISO(curr.transactionAt), 'EEEE', { locale: ko });
    if (!acc[dayOfWeek]) {
      acc[dayOfWeek] = { total: 0, count: 0 };
    }
    acc[dayOfWeek].total += curr.amount;
    acc[dayOfWeek].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const averageSalesByDayOfWeek = Object.entries(salesByDayOfWeek).map(([day, { total, count }]) => ({
    day,
    avgAmount: Math.round(total / count)
  }));

  const salesByHour = transactions.reduce((acc, curr) => {
    const hour = getHours(parseISO(curr.transactionAt));
    if (!acc[hour]) {
      acc[hour] = { hour: `${hour}시`, amount: 0 };
    }
    acc[hour].amount += curr.amount;
    return acc;
  }, {} as Record<number, { hour: string; amount: number }>);

  const salesByHourArray = Object.values(salesByHour).sort((a, b) => parseInt(a.hour) - parseInt(b.hour));

  return (
    <div>
      <div className='w-full p-3 bg-white rounded-md'>
        <strong>일자별 매출</strong>
        <div className='flex mt-3 items-center justify-center'>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={salesByDate}
              syncId="month"
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 0,
              }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" className="text-sm" />
              <YAxis domain={[0, 'auto']} allowDataOverflow={true} className="text-sm" />
              <Tooltip content={<CustomTooltip />} />
              <Area type='linear' dataKey="pv" stroke="#75b5faff" fill="#dcecfcff" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className='flex justify-between space-x-5 mt-5'>
        <div className='w-full p-3 bg-white rounded-md'>
          <strong>요일별 평균 매출</strong>
          <div className='flex mt-3 items-center justify-center'></div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart width={700}
              height={300}
              data={averageSalesByDayOfWeek} margin={{ right: 10, left: 10, bottom: 5, }} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" scale="point" padding={{ left: 40, right: 40 }} className="text-sm" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="avgAmount" fill="#398bf7ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='w-full p-3 bg-white rounded-md '>
          <strong>시간대별 매출 차트</strong>
          <div className='flex mt-3 items-center justify-center'>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={salesByHourArray} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area type="linear" dataKey="amount" stroke="#565fb0ff" fill="#d7dafaff" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div >
  );
};

export default SalesCharts
