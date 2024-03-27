import * as React from 'react';
import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';

const DateSelector = ({ year: initialYear, month: initialMonth }: { year: number; month: number }) => {
  const [selectedYear, setSelectedYear] = useState(`${initialYear}년`);
  const [selectedMonth, setSelectedMonth] = useState(`${initialMonth}월`);

  const onSubmit = () => {
    // console.log('Selected Year:', selectedYear);
    // console.log('Selected Month:', selectedMonth);

  };

  return (
    <div className="flex w-full gap-3">
      <Select defaultValue={selectedYear} onValueChange={setSelectedYear}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Year</SelectLabel>
            <SelectItem value="2024년">2024년</SelectItem>
            <SelectItem value="2023년">2023년</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select defaultValue={selectedMonth} onValueChange={setSelectedMonth}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Month</SelectLabel>
            {Array.from({ length: 12 }, (_, idx) => (
              <SelectItem key={idx} value={`${idx + 1}월`}>{idx + 1}월</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={onSubmit}>선택</Button>
    </div>
  );
};

export default DateSelector;
