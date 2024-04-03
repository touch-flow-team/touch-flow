import StockDataTable, { stockColumns } from "./StockDataTable"
import useFetchStocks from "@/hooks/stocks/useFetchStocks"


const StockList = () => {
    const stocks = useFetchStocks()
    return (
        <div className=" m-0 p-0">
            <StockDataTable data={stocks} columns={stockColumns} />
        </div>

    )
}

export default StockList