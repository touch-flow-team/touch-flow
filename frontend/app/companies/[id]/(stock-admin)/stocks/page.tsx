'use client'
import StockList from "@/components/companies/StockList"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"

const Stocks = () => {
    const router = useRouter()
    const params = useParams()
    return (
        <div className="flex flex-col w-full p-16">
            <div className="flex flex-row w-full items-center">
                <div><h3 className="mb-4 text-[24px] font-bold">제품 목록</h3></div>
                <div className="ml-auto">
                    <Button onClick={() => {
                        router.push(`/companies/${String(params?.id)}/stocks/add`)
                    }}>
                        + 제품 추가
                    </Button>
                </div>
            </div>
            <StockList />
        </div>
    )
}

export default Stocks