"use client"

import StockForm from "@/components/companies/StockForm"
import { useParams } from "next/navigation"

const StockUpdate = () => {
    const params = useParams()
    const data = {
        id: "728ed52f",
        productName: "냉동 한우",
        imageUrl: "",
        categoryName: "식품 / 재료",
        stockCount: 10,
        purchaseAmount: 0,
        buyAmount: 0,
        brandName: "--",
        initialCount: 10,
        safeCount: 5
    }


    return (
        <div className="flex flex-col w-full p-16">
            <div className="flex flex-row w-full items-center">
                <div><h3 className="mb-4 text-[24px] font-bold">제품 수정</h3></div>
            </div>
            <StockForm data={data} />
        </div>
    )
}

export default StockUpdate