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
}

export interface StockTableProps {
    stocks: IStockItem[]
}
