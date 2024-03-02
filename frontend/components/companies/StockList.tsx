import StockDataTable, { stockColumns } from "./StockDataTable"
import useFetchStocks from "@/hooks/stocks/useFetchStocks"
import { Skeleton } from "@/components/ui/skeleton"


const StockList = () => {
    const stocks = useFetchStocks()
    
    return (
        <div className="container py-10">
            <StockDataTable data={stocks} columns={stockColumns} />
        </div>

    )
}

export default StockList