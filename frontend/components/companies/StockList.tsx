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
            stockCount: 10,
            purchaseAmount: 0,
            buyAmount: 0,
            brandName: "--",
            initialCount: 10,
            safeCount: 5
        },
        {
            id: "489e1d42",
            productName: "물티슈",
            imageUrl: "",
            categoryName: "비품",
            stockCount: 9,
            purchaseAmount: 0,
            buyAmount: 0,
            brandName: "--",
            initialCount: 10,
            safeCount: 5
        },
        {
            id: "231sdfa2",
            productName: "다진 마늘",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 12,
            purchaseAmount: 0,
            buyAmount: 0,
            brandName: "--",
            initialCount: 10,
            safeCount: 5
        },
        {
            id: "1324dafsc",
            productName: "파스타면",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 7,
            purchaseAmount: 0,
            buyAmount: 0,
            brandName: "--",
            initialCount: 10,
            safeCount: 5
        },
        {
            id: "1100dafdfa",
            productName: "의자",
            imageUrl: "",
            categoryName: "비품",
            stockCount: 10,
            purchaseAmount: 0,
            buyAmount: 0,
            brandName: "--",
            initialCount: 10,
            safeCount: 5
        },
        {
            id: "728ed52f",
            productName: "냉동 한우",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 10,
            purchaseAmount: 0,
            buyAmount: 0,
            brandName: "--",
            initialCount: 10,
            safeCount: 5
        },
        {
            id: "489e1d42",
            productName: "물티슈",
            imageUrl: "",
            categoryName: "비품",
            stockCount: 9,
            purchaseAmount: 0,
            buyAmount: 0,
            brandName: "--",
            initialCount: 10,
            safeCount: 5
        },
        {
            id: "231sdfa2",
            productName: "다진 마늘",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 12,
            purchaseAmount: 0,
            buyAmount: 0,
            brandName: "--",
            initialCount: 10,
            safeCount: 5
        },
        {
            id: "1324dafsc",
            productName: "파스타면",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 7,
            purchaseAmount: 0,
            buyAmount: 0,
            brandName: "--",
            initialCount: 10,
            safeCount: 5
        },
        {
            id: "1100dafdfa",
            productName: "의자",
            imageUrl: "",
            categoryName: "비품",
            stockCount: 10,
            purchaseAmount: 0,
            buyAmount: 0,
            brandName: "--",
            initialCount: 10,
            safeCount: 5
        },
        {
            id: "728ed52f",
            productName: "냉동 한우",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 10,
            purchaseAmount: 0,
            buyAmount: 0,
            brandName: "--",
            initialCount: 10,
            safeCount: 5
        },
        {
            id: "489e1d42",
            productName: "물티슈",
            imageUrl: "",
            categoryName: "비품",
            stockCount: 9,
            purchaseAmount: 0,
            buyAmount: 0,
            brandName: "--",
            initialCount: 10,
            safeCount: 5
        },
        {
            id: "231sdfa2",
            productName: "다진 마늘",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 12,
            purchaseAmount: 0,
            buyAmount: 0,
            brandName: "--",
            initialCount: 10,
            safeCount: 5
        },
        {
            id: "1324dafsc",
            productName: "파스타면",
            imageUrl: "",
            categoryName: "식품 / 재료",
            stockCount: 7,
            purchaseAmount: 0,
            buyAmount: 0,
            brandName: "--",
            initialCount: 10,
            safeCount: 5
        },
        {
            id: "1100dafdfa",
            productName: "의자",
            imageUrl: "",
            categoryName: "비품",
            stockCount: 10,
            purchaseAmount: 0,
            buyAmount: 0,
            brandName: "--",
            initialCount: 10,
            safeCount: 5
        },
    ]
    return (
        <div className="container py-10">
            <StockDataTable data={stocks} columns={stockColumns} />
        </div>
    )
}

export default StockList