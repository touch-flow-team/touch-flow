import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"


export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export interface IStockItem {
    id: string
    productName: string
    imageUrl: string
    categoryName: string
    stockCount: number
    purchaseAmount: number
    buyAmount: number
    brandName: string
    initialCount: number
    safeCount: number
}

export interface StockTableProps {
    stocks: IStockItem[]
}


export interface StockFormProps {
    data?: IStockItem
}