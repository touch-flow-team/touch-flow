"use server"
import { PB_COLLECTIONS, REVALIDATE_TAG } from "@/constants/constants"
import client from "@/libs/pocketbase"
import { IDelete, IUpdate, IUpdateStockCount } from "@/types/common/type"
import { IStock, IStockHistory, IStockHistoryCreate, IStockUpdate } from "@/types/stock/types"
import { revalidateTag } from "next/cache"
import { redirect } from 'next/navigation'

export const getStocksByCompany = async (companyId: string) => {
    const response: IStock[] = await client
        .collection(PB_COLLECTIONS.STOCKS)
        .getFullList({
            expand: "companies",
            filter: `companies.id="${companyId}"`,
            cache: 'no-store',
        })

    return response
}

export const getOneStock = async (stockId: string, companyId: string) => {
    try {
        const response: IStock = await client
            .collection(PB_COLLECTIONS.STOCKS)
            .getOne(stockId, {
                cache: 'no-store',
                next: { tags: [REVALIDATE_TAG.STOCK] },
            })


        return response
    } catch (error) {
        console.error('Error fetching user wait:', error);
        redirect(`/companies/${companyId}/stocks`)
        throw error;
    }
}

export const updateStock = async ({ id, formData }: IUpdate) => {
    await client.collection(PB_COLLECTIONS.STOCKS)
        .update(id, formData)
        .then(() => revalidateTag(REVALIDATE_TAG.STOCK));
};

export const updateStockCount = async ({ id, data }: IUpdateStockCount) => {
    const response = await client.collection(PB_COLLECTIONS.STOCKS).update(id, data)
        .then(() => revalidateTag(REVALIDATE_TAG.STOCK));

    return response
}

export const deleteStock = async ({ id }: IDelete) => {
    await client.collection(PB_COLLECTIONS.STOCKS).delete(id)
        .then(() => revalidateTag(REVALIDATE_TAG.STOCK));
}

export const getStocksHistoryByCompany = async (companyId: string) => {
    const response: IStockHistory[] = await client
        .collection(PB_COLLECTIONS.STOCKS_HISTORY)
        .getFullList({
            sort: '-created',
            expand: "companies",
            filter: `companies.id="${companyId}"`,
            cache: 'no-store',
        })

    return response
}

export const addStockHistory = async (data: IStockHistoryCreate) => {
    const response: IStockHistory[] = await client
        .collection(PB_COLLECTIONS.STOCKS_HISTORY)
        .create(data)

    return response
}