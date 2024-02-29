"use client"

import { PB_COLLECTIONS } from "@/constants/constants"
import client from "@/libs/pocketbase"
import { getStocksByCompany } from "@/server-actions/stocks/stocks"
import { IStock, IStockItem } from "@/types/stock/types"
import { useParams } from "next/navigation"
import { RecordModel } from "pocketbase"
import { useEffect, useState } from "react"

const useFetchStocks = () => {
    const params = useParams()
    const [stocks, setStocks] = useState<IStock[]>([])
    const [action, setAction] = useState<string>("")

    const fetchData = async () => {
        const response = await getStocksByCompany(String(params?.id))
        console.log('response ===========> ', response);
        
        setStocks(response)
    }

    useEffect(() => {
        fetchData()
    }, [action == null])

    useEffect(() => {
        const subscribe = client.collection('stocks').subscribe('*', function (e) {
            fetchData()
        })

        return () => {
            client.collection('stocks').unsubscribe()
        };
    }, [action != null])

    
    return stocks
}

export default useFetchStocks