import StockHistoryList from "@/components/companies/stocks/StockHistoryList"

const StockHistory = () => {
    return (
        <div className="flex flex-col sm:flex-row w-full min-h-screen p-16 overflow-y-scroll">
            <StockHistoryList />
        </div>
    )
}

export default StockHistory