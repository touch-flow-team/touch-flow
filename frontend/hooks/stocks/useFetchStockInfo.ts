"use client"

import { PB_COLLECTIONS } from "@/constants/constants"
import client from "@/libs/pocketbase"
import { getOneStock, getStocksByCompany } from "@/server-actions/stocks/stocks"
import { IStock, IStockItem } from "@/types/stock/types"
import { useParams } from "next/navigation"
import { RecordModel } from "pocketbase"
import { useEffect, useState } from "react"

const useFetchStockInfo = (stockId: string, companyId: string) => {
    const params = useParams()
    const [stock, setStock] = useState<IStock>()

    const fetchData = async () => {
        const response = await getOneStock(stockId, companyId)
        setStock(response)
    }

    useEffect(() => {
        fetchData()
    }, [])

    
    return stock
}

export default useFetchStockInfo