import { Skeleton } from "@/components/ui/skeleton"

export function CategorySkeletonCard() {
    return (
        <div className="flex">
            <Skeleton className="h-12 w-[120px] rounded-full  bg-slate-200" />
            <Skeleton className="h-12 w-[120px] rounded-full ml-4  bg-slate-200" />
        </div>
    )
}