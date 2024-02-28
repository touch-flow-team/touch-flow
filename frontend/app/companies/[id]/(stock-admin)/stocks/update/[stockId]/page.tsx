import StockForm from "@/components/companies/StockForm"
import { getOneStock } from "@/server-actions/stocks/stocks";
import { useParams } from "next/navigation"

export default async function StockUpdate({
    params,
  }: {
    params: { id: string; stockId: string };
  }) {

    const data = await getOneStock(params.stockId)
    
    return (
        <div className="flex flex-col w-full p-16">
            <div className="flex flex-row w-full items-center">
                <div><h3 className="mb-4 text-[24px] font-bold">제품 수정</h3></div>
            </div>
            <StockForm data={data} />
        </div>
    )
  }
  

