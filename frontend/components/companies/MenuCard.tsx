
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"

const MenuCard = () => {
    return (
        <Card className=" rounded-2xl px-8 py-8">
            <CardContent className="flex">
                <div className="bg-gray-50 w-[25rem] h-32 rounded-lg">
                </div>
                <div className="ml-6">
                    <CardTitle className="flex justify-between font-normal text-lg items-center">
                        카라멜 마끼야또
                        <span className="text-main text-sm">₩ 4,800</span>
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm mt-2">하늘을 나는 법을 알고 싶다면, 먼저 일어 서고, 걷고, 오르고, 춤춰야 한다. 바로 나는 법을 배울 수는 없는 것이다.</CardDescription>
                </div>
            </CardContent>
            <CardFooter className="mt-2">
                <div className="flex w-full">
                    <div className=" w-[14rem] justify-between items-center flex">
                        <button className="w-7 h-7 rounded-full border">
                            -
                        </button>
                        <span className="px-4">1</span>
                        <button className="w-7 h-7 rounded-full border hover:">
                            +
                        </button>
                    </div>
                    <button className="ml-5 h-12 flex items-center justify-center transition duration-300 font-medium border text-main border-main hover:text-white hover:bg-main rounded-full w-full">카드에 담기</button>
                </div>
            </CardFooter>
        </Card>
    )
}

export default MenuCard