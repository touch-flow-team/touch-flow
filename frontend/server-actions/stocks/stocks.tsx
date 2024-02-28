"use server"
import { PB_COLLECTIONS, REVALIDATE_TAG } from "@/constants/constants"
import client from "@/libs/pocketbase"
import { IResult } from "@/types/common/type"
import { IStock, IStockItem } from "@/types/stock/types"

export const getStocksByCompany = async (companyId: string) => {
    const response: IStock[] = await client
        .collection(PB_COLLECTIONS.STOCKS)
        .getFullList({
            cache: 'no-store',
            next: { tags: [REVALIDATE_TAG.STOCK] },
        })

    return response
}