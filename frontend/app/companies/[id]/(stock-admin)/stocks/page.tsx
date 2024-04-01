'use client'
import BreadcrumbDynamic from "@/components/common/BreadcrumbDynamic"
import StockList from "@/components/companies/stocks/StockList"
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
                    <div className="flex space-x-2">
                        <Button onClick={() => {
                            router.push(`/companies/${String(params?.id)}/stocks/add`)
                        }}>
                            + 제품 추가
                        </Button>
                        <Button variant="outline" onClick={() => {
                            router.push(`/companies/${String(params?.id)}/stocks/history`)
                        }}>
                            입출고 히스토리 확인
                        </Button>
                    </div>
                </div>

            </div>
            {document && (
                <BreadcrumbDynamic
                    routes={[
                        { name: '홈', path: '/' },
                        { name: '제품목록' },
                    ]}
                />
            )}
            <div className="flex flex-col space-y-2 mb-7">
                <div className="w-full h-[1px] bg-border"></div>
            </div>
            <StockList />
        </div>
    )
}

export default Stocks