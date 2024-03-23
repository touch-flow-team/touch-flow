// hooks/useHistoriesAndOrders.ts
import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { History, Order } from '@/types/companies/calendar/type';

const fetchAPI = async (url: string, headers: {}) => {
  const response = await fetch(url, { method: 'GET', headers });
  return response.json();
};

const getAuthorizationHeader = () => ({
  Authorization: 'Basic dGVzdF9za19aNjFKT3hSUVZFMjR5RE9SWEpMenJXMFg5YkFxOg==',
});

export const useHistoriesAndOrders = (date: Date, setHistories: Function) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const startDate = format(date, 'yyyy-MM-dd');
  const endDate = format(addDays(date, 1), 'yyyy-MM-dd');

  useEffect(() => {
    const getHistories = async () => {
      const paymentApiUrl = `${process.env.NEXT_PUBLIC_TOSS_PAYMENT_API_URL}startDate=${startDate}&endDate=${endDate}`;
      const orderApiUrl = process.env.NEXT_PUBLIC_TOSS_ORDER_API_URL;
      const headers = getAuthorizationHeader();

      const historiesData = await fetchAPI(paymentApiUrl, headers);
      setHistories(historiesData);

      const ordersData = await Promise.all(
        historiesData.map(async (history: History) => {
          return fetchAPI(`${orderApiUrl}${history?.orderId}`, headers);
        }),
      );
      setOrders(ordersData);
    };

    getHistories();
  }, [date, setHistories]);

  return orders;
};
