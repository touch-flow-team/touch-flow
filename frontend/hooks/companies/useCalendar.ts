import { useMemo } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  addDays,
  isSunday,
  differenceInCalendarDays,
} from 'date-fns';
import { History } from '@/types/companies/calendar/type';

interface UseCalendarReturn {
  filteredData: History[];
  createMonth: Date[][];
}

export const useCalendar = (currentDate: Date, history: History[]): UseCalendarReturn => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const filteredData = useMemo(
    () =>
      history.filter((e) => format(e.transactionAt, 'yyyy-MM') === format(currentDate, 'yyyy-MM')),
    [history, currentDate],
  );

  const createMonth = useMemo(() => {
    let monthArray: Date[][] = [];
    let weekArray: Date[] = [];
    let day = startDate;

    while (differenceInCalendarDays(endDate, day) >= 0) {
      weekArray.push(day);
      day = addDays(day, 1);

      if (isSunday(day) || differenceInCalendarDays(endDate, day) < 0) {
        monthArray.push(weekArray);
        weekArray = [];
      }
    }

    return monthArray;
  }, [startDate, endDate]);

  return { filteredData, createMonth };
};
