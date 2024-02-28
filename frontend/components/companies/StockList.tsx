import StockDataTable, { stockColumns } from "./StockDataTable"
import useFetchStocks from "@/hooks/stocks/useFetchStocks"
import { Skeleton } from "@/components/ui/skeleton"


const StockList = () => {
    const stocks = useFetchStocks()
    
    return (
        <div className="container py-10">
            {
                stocks.length >= 1 ? (
                    <StockDataTable
                        data={stocks} columns={stockColumns} />
                ) : (
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="w-[800px] h-[200px]" />
                        <Skeleton className="w-[800px] h-[200px]" />
                        <Skeleton className="w-[800px] h-[200px]" />
                    </div>
                )
            }
        </div>

    )
}

export default StockList