import StockForm from "@/components/companies/StockForm"


const StockAdd = () => {
    return (
        <div className="flex flex-col w-full p-16">
            <div className="flex flex-row w-full items-center">
                <div><h3 className="mb-4 text-[24px] font-bold">제품 추가</h3></div>
            </div>
            <StockForm />
        </div>
    )
}

export default StockAdd