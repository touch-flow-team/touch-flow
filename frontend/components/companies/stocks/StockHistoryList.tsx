"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WaitingListCard from "../waitings/WaitingListCard"
import useFetchStocksHistory from "@/hooks/stocks/useFetchStocksHistory"
import StockHistoryCard from "./StockHistoryCard"

const StockHistoryList = () => {
    const { action, stocks } = useFetchStocksHistory()
    const inData = stocks?.filter((item) => item.mode === "in")
    const outData = stocks?.filter((item) => item.mode === "out")
    
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row space-x-2 items-center">
                <h3 className="mb-4 text-[24px] font-bold">입출고 내역</h3>
                <button onClick={() => window.location.reload()} className="flex mb-4">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                            height="20px"
                            width="20px"
                            version="1.1"
                            id="Capa_1"
                            viewBox="0 0 489.533 489.533">
                            <g>
                                <path d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9   l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6   c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6   C49.575,418.961,150.875,501.261,268.175,488.161z" />
                            </g>
                        </svg>
                    </div>
                </button>
            </div>
            <Tabs defaultValue="전체" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger className="w-full" value="전체">
                        전체
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="입고">
                        입고
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="출고">
                        출고
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="전체">
                    <div className="flex flex-col space-y-4">
                        {stocks?.map((item) => {
                            return (
                                <StockHistoryCard key={item.id} data={item} />
                            );
                        })}
                    </div>
                </TabsContent>
                <TabsContent value="입고">
                    <div className="flex flex-col space-y-4">
                        {inData?.map((item) => {
                            return (
                                <StockHistoryCard key={item.id} data={item} />
                            );
                        })}
                    </div>
                </TabsContent>
                <TabsContent value="출고">
                    <div className="flex flex-col space-y-4">
                        {outData?.map((item) => {
                            return (
                                <StockHistoryCard key={item.id} data={item} />
                            );
                        })}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
export default StockHistoryList;