"use strict";
import { useState } from "react";
import { DialogDescription } from "../ui/dialog";
import { DataTable } from "./DataTable";

const CalendarModel = ({ DAY_REVENUE, date }: { DAY_REVENUE: number | null, date: Date }) => {
    const [histories, setHistories] = useState<History[]>([]);
    return (
        <DialogDescription>
            <div className="w-full flex flex-col gap-5 items-center justify-center text-black ">
                <div className="w-[90%] min-h-[40%] border-gray-200 rounded-lg border flex justify-center items-center flex-col p-5">
                    <div className=" grid grid-cols-2 w-full justify-items-center items-center text-center gap-4">
                        <div className="flex flex-col justify-center ">
                            <div className="text-md">매출</div>
                            <div className="text-3xl">{DAY_REVENUE?.toLocaleString()}원</div>
                        </div>

                        <div className="flex flex-col justify-center">
                            <div className="text-md">주문건</div>
                            <div className="text-3xl">{histories?.length}건</div>
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
                <div className="w-full flex justify-center">
                    <DataTable setHistories={setHistories} date={date} />
                </div>
            </div>
        </DialogDescription>
    );
};

export default CalendarModel;
