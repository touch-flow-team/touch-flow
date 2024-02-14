import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import CustomTooltip from './CustomTooltip';

const data = [
  {
    name: '08:00',
    uv: 4000,
    pv: 5000,
    amt: 2400,
  },
  {
    name: '10:00',
    uv: 3000,
    pv: 7398,
    amt: 2210,
  },
  {
    name: '12:00',
    uv: 2000,
    pv: 7800,
    amt: 2290,
  },
  {
    name: '14:00',
    uv: 2780,
    pv: 7908,
    amt: 2000,
  },
  {
    name: '16:00',
    uv: 1890,
    pv: 8800,
    amt: 2181,
  },
  {
    name: '18:00',
    uv: 2390,
    pv: 6800,
    amt: 2500,
  },
  {
    name: '20:00',
    uv: 2390,
    pv: 6800,
    amt: 2500,
  },
  {
    name: '22:00',
    uv: 2390,
    pv: 6800,
    amt: 2500,
  },
];

const TimeRevenue = () => {
  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        syncId="time"
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 0,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" className="text-sm" />
        <YAxis className="text-sm" />
        <Tooltip content={<CustomTooltip />} />
        <Area type="linear" dataKey="pv" stroke="#565fb0ff" fill="#d7dafaff" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TimeRevenue;
