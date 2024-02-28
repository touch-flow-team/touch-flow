"use server"
import { PB_COLLECTIONS, REVALIDATE_TAG } from "@/constants/constants"
import client from "@/libs/pocketbase"
import { IUpdate } from "@/types/common/type"
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
            cache: 'no-store',
            next: { tags: [REVALIDATE_TAG.STOCK] },
        })


    return response
}

export const updateStock = async ({ id, formData }: IUpdate) => {
    await client.collection(PB_COLLECTIONS.STOCKS)
        .update(id, formData)
        .then(() => revalidateTag(REVALIDATE_TAG.STOCK));
};