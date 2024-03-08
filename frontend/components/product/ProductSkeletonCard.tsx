import { Skeleton } from "@/components/ui/skeleton"

export function ProductSkeletonCard() {
    return (
        <>
            <div className="flex w-96 h-56 items-center bg-slate-100 p-7 rounded-2xl">
                <Skeleton className="h-[130px] w-[130px] bg-slate-200 " />
                <div className="pl-5">
                    <Skeleton className="h-4 w-[100px]  bg-slate-200" />
                    <Skeleton className="h-4 w-[170px] mt-7  bg-slate-200" />
                    <Skeleton className="h-4 w-[170px] mt-2  bg-slate-200" />
                </div>
            </div>
            <div className="flex w-96 h-56 items-center bg-slate-100 p-7 rounded-2xl">
                <Skeleton className="h-[130px] w-[130px] bg-slate-200 " />
                <div className="pl-5">
                    <Skeleton className="h-4 w-[100px]  bg-slate-200" />
                    <Skeleton className="h-4 w-[170px] mt-7  bg-slate-200" />
                    <Skeleton className="h-4 w-[170px] mt-2  bg-slate-200" />
                </div>
            </div>
            <div className="flex w-96 h-56 items-center bg-slate-100 p-7 rounded-2xl">
                <Skeleton className="h-[130px] w-[130px] bg-slate-200 " />
                <div className="pl-5">
                    <Skeleton className="h-4 w-[100px]  bg-slate-200" />
                    <Skeleton className="h-4 w-[170px] mt-7  bg-slate-200" />
                    <Skeleton className="h-4 w-[170px] mt-2  bg-slate-200" />
                </div>
            </div>

        </>
    )
}