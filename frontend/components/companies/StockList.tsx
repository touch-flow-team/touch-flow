import { IStockItem } from "@/types/stock/types"
import StockDataTable, { stockColumns } from "./StockDataTable"

const StockList = () => {

    // dummy list 
    const stocks: IStockItem[] = [
        {
            id: "728ed52f",
            productName: "냉동 한우",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 10
        },
        {
            id: "489e1d42",
            productName: "물티슈",
            imageUrl: "",
            categoryName: "비품",
            stockCount: 9
        },
        {
            id: "231sdfa2",
            productName: "다진 마늘",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 12
        },
        {
            id: "1324dafsc",
            productName: "파스타면",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 7
        },
        {
            id: "1100dafdfa",
            productName: "의자",
            imageUrl: "",
            categoryName: "비품",
            stockCount: 10
        },
        {
            id: "728ed52f",
            productName: "냉동 한우",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 10
        },
        {
            id: "489e1d42",
            productName: "물티슈",
            imageUrl: "",
            categoryName: "비품",
            stockCount: 9
        },
        {
            id: "231sdfa2",
            productName: "다진 마늘",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 12
        },
        {
            id: "1324dafsc",
            productName: "파스타면",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 7
        },
        {
            id: "1100dafdfa",
            productName: "의자",
            imageUrl: "",
            categoryName: "비품",
            stockCount: 10
        },
        {
            id: "728ed52f",
            productName: "냉동 한우",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 10
        },
        {
            id: "489e1d42",
            productName: "물티슈",
            imageUrl: "",
            categoryName: "비품",
            stockCount: 9
        },
        {
            id: "231sdfa2",
            productName: "다진 마늘",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 12
        },
        {
            id: "1324dafsc",
            productName: "파스타면",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 7
        },
        {
            id: "1100dafdfa",
            productName: "의자",
            imageUrl: "",
            categoryName: "비품",
            stockCount: 10
        },
    ]
    return (
        <div className="container py-10">
            <StockDataTable data={stocks} columns={stockColumns} />
        </div>
    )
}

export default StockList