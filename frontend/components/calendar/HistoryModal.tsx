"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import CalendarModel from './CalendarModel';

interface HistoryModalProps {
  isCurrentMonth: boolean;
  isToday: boolean;
  date: Date;
  DAY_REVENUE: number | null
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  isCurrentMonth,
  isToday,
  date,
  DAY_REVENUE,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`flex flex-col gap-2 p-1 text-sm w-full rounded-md hover:bg-gray-100 cursor-pointer ${!isCurrentMonth ? 'text-gray-400' : ''}`}>
          <div className="flex items-center gap-1">
            <span>{format(date, 'd')}</span>
            {isToday && (
              <div className="text-white text-xs p-1 pl-2 pr-2 rounded-lg bg-red-400">오늘</div>
            )}
          </div>

          {/* 조건부 렌더링으로 DAY_REVENUE이 유효한 경우에만 값을 표시합니다. */}
          {isCurrentMonth && DAY_REVENUE !== null && <span>{DAY_REVENUE?.toLocaleString()}</span>}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60%] h-[80%] p-5 overflow-scroll">
        <DialogHeader>
          <DialogTitle className="mb-5">{format(date, 'yyyy.MM.dd')}</DialogTitle>
          {/* DAY_REVENUE와 date를 CalendarModel 컴포넌트에 props로 전달합니다. */}
          <CalendarModel date={date} DAY_REVENUE={DAY_REVENUE} />
        </DialogHeader>
        {/* 이하 내용 생략 */}
      </DialogContent>
    </Dialog>
  );
};

export default HistoryModal;
