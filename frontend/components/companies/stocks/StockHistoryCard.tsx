import { IStockHistoryCardProps } from "@/types/stock/types"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ArrowUpRightFromSquare, Inbox, Minus, MoveRight, Plus } from "lucide-react"
import { formatDate } from "@/libs/utils"
import useFetchStockInfo from "@/hooks/stocks/useFetchStockInfo"


const StockHistoryCard = ({ data }: IStockHistoryCardProps) => {
    const stock = useFetchStockInfo(data.stocks, data.companies)

    return (
        <Card className="p-8">
            <CardHeader className="mb-2 flex flex-row">
                <div>
                    {data.mode === "in" ? (
                        <CardTitle className="flex space-x-2">
                            <Inbox />
                            <span>입고</span>
                        </CardTitle>
                    ) : (
                        <CardTitle className="flex space-x-2">
                            <ArrowUpRightFromSquare />
                            <span>출고</span>
                        </CardTitle>
                    )
                    }
                </div>
                <div className="ml-auto">
                    {data.mode === "in" ? (
                        <CardTitle className="flex space-x-1 items-center">
                            <Plus className="text-blue" />
                            <span className="text-blue">{data.current_count - data.past_count}</span>
                        </CardTitle>
                    ) : (
                        <CardTitle className="flex space-x-1 items-center">
                            <Minus className="text-destructive" />
                            <span className="text-destructive">{data.past_count - data.current_count}</span>
                        </CardTitle>
                    )
                    }
                </div>
            </CardHeader>
            <CardContent className="flex flex-row">
                <div className="flex flex-col space-y-2">
                    <span className="font-bold">{formatDate(String(data.created))}</span>
                    <span className="font-bold">제품명: {stock?.productName}</span>
                </div>
                <div className="flex space-x-[2px] ml-auto">
                    <span className="text-moonGray">{data.past_count}</span>
                    <MoveRight className="text-moonGray" />
                    <span className="text-moonGray">{data.current_count}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default StockHistoryCard