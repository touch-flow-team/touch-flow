import { ColumnDef } from "@tanstack/react-table"
import { Row } from '@tanstack/react-table';


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

export interface IStockUpdateItem {
    productName: string
    image: any
    categoryName: string
    purchaseAmount: number
    saleAmount: number
    brandName: string
    currentCount: number
    safeCount: number
    companies: string
}

export interface IStockUpdate {
    id: string
    newData: IStockUpdateItem
}

export interface StockTableProps {
    stocks: IStockItem[]
}


export interface StockFormProps {
    data?: IStock
}

export interface IStockList {
    stocks: (undefined | IStock)[]
}

export interface IProp {
    data: Row<any>[]
}

export interface IUpdateProp extends IProp {
    mode: string
}

export interface Idata {
    data: Row<any>
}