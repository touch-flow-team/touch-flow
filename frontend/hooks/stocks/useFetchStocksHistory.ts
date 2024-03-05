"use client"

import { PB_COLLECTIONS } from "@/constants/constants"
import client from "@/libs/pocketbase"
import { getStocksHistoryByCompany } from "@/server-actions/stocks/stocks"
import { IStockHistory } from "@/types/stock/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const useFetchStocksHistory = () => {
    const params = useParams()
    const [stocks, setStocks] = useState<Array<IStockHistory>>([])
    const [action, setAction] = useState<string>("")

    const fetchData = async () => {
        const response = await getStocksHistoryByCompany(String(params?.id))
        setStocks(response)
    }

    useEffect(() => {
        fetchData()
    }, [action == null])

    useEffect(() => {
        const subscribe = client.collection(PB_COLLECTIONS.STOCKS_HISTORY).subscribe('*', function (e) {
            fetchData()
        })

        return () => {
            client.collection(PB_COLLECTIONS.STOCKS_HISTORY).unsubscribe()
        };
    }, [action != null])

    
    return { action, stocks }
}

export default useFetchStocksHistory