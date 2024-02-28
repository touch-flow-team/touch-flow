"use server"
import { PB_COLLECTIONS, REVALIDATE_TAG } from "@/constants/constants"
import client from "@/libs/pocketbase"
import { IStock } from "@/types/stock/types"

export const getStocksByCompany = async (companyId: string) => {
    const response: IStock[] = await client
        .collection(PB_COLLECTIONS.STOCKS)
        .getFullList({
            cache: 'no-store',
        })

    return response
}