"use server"
import { PB_COLLECTIONS, REVALIDATE_TAG } from "@/constants/constants"
import client from "@/libs/pocketbase"
import { IStock, IStockUpdate } from "@/types/stock/types"
import { revalidateTag } from "next/cache"

export const getStocksByCompany = async (companyId: string) => {
    const response: IStock[] = await client
        .collection(PB_COLLECTIONS.STOCKS)
        .getFullList({
            cache: 'no-store',
        })

    return response
}

export const getOneStock = async (stockId: string) => {
    const response: IStock = await client
        .collection(PB_COLLECTIONS.STOCKS)
        .getOne(stockId, {
            next: { tags: [REVALIDATE_TAG.STOCK] },
        })


    return response
}

export const updateStock = async ({ id, newData }: IStockUpdate) => {
    await client.collection(PB_COLLECTIONS.STOCKS)
        .update(id, newData)
        .then(() => revalidateTag(REVALIDATE_TAG.STOCK));
};