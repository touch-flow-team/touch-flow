import { History } from '@/app/companies/[id]/(admin)/calendar/page';

const TotalRevenue = ({ data }: { data: History[] }) => {
  let TOTAL_REVENUE = 0;
  data.forEach((e) => {
    TOTAL_REVENUE += e.total_price;
  });
  return (
    <div className="w-full flex justify-center">
      <div className="w-full h-[60px] bg-gray-100 rounded-lg  flex pl-5 items-center">
        총 매출 금액<span className="ml-10">{TOTAL_REVENUE.toLocaleString()}원</span>
      </div>
    </div>
  );
};

export default TotalRevenue;
