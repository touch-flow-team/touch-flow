import { Payment, columns } from '@/components/calendar/column';
import { DataTable } from '@/components/calendar/DataTable';

async function getData(): Promise<Payment[]> {
  return [
    {
      UID: 'EEEEAA',
      price: 15000,
      time: '2024-02-11, 19:21',
      payment: 'toss',
    },
    {
      UID: 'KOWEAA',
      price: 4000,
      time: '2024-02-11, 19:21',
      payment: 'kakao',
    },
    {
      UID: 'EEKEAA',
      price: 15000,
      time: '2024-02-11, 19:21',
      payment: 'kakao',
    },
    {
      UID: 'AEEEAA',
      price: 10000,
      time: '2024-02-11, 19:21',
      payment: 'toss',
    },
    {
      UID: 'DSEEAA',
      price: 15000,
      time: '2024-02-11, 19:21',
      payment: 'toss',
    },
    {
      UID: 'WOSEAA',
      price: 17000,
      time: '2024-02-11, 19:21',
      payment: 'kakao',
    },
    {
      UID: 'AQSEAA',
      price: 15000,
      time: '2024-02-11, 19:21',
      payment: 'toss',
    },
  ];
}

export default async function CalendarDetail() {
  const data = await getData();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center top-0 left-0 absolute  bg-[rgba(0,0,0,0.3)] ">
      <div className="w-[60%] h-[75%] bg-gray-100 rounded-lg flex flex-col p-5 items-center gap-4 overflow-scroll">
        <div className="w-[90%] min-h-[40%] border-gray-200 rounded-lg border flex justify-center items-center flex-col p-5">
          <div className=" grid grid-cols-2 w-full justify-items-center items-center text-center gap-4">
            <div className="flex flex-col justify-center ">
              <div className="text-md">매출</div>
              <div className="text-3xl">1,296,000원</div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="text-md">주문건</div>
              <div className="text-3xl">50건</div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="text-md">환불</div>
              <div className="text-3xl">6,000원</div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="text-md">Best 메뉴</div>
              <div className="text-3xl">아메리카노</div>
            </div>
          </div>
        </div>

        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
