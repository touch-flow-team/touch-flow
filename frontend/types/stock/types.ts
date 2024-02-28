import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"


export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export interface IStock {
    brandName: string
    categoryName: string
    collectionId: string
    collectionName: string
    companies: string
    created: Date
    currentCount: number
    id: string
    image: any
    productName: string
    purchaseAmount: number
    safeCount: number
    saleAmount: number
    updated: number
}

export interface IStockItem {
    id: string
    productName: string
    image: any
    categoryName: string
    stockCount: number
    purchaseAmount: number
    saleAmount: number
    brandName: string
    currentCount: number
    safeCount: number
}

export interface StockTableProps {
    stocks: IStockItem[]
}


export interface StockFormProps {
    data?: IStockItem
}