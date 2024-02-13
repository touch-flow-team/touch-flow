import {
    Card, CardContent, CardHeader
} from "@/components/ui/card"

interface WaitingCardProps {
    companyName: string
    waitingNumber: number
    waitingTime: number
}


const WaitingCard = ({ companyName, waitingNumber, waitingTime }: WaitingCardProps) => {
    return (
        <Card className="flex flex-col w-full">
            <CardContent className="flex flex-row w-full p-8">
                <div className="flex justify-center items-center w-[50%]">
                    <span className="font-bold text-[25px]">{companyName}</span>
                </div>
                <div className="w-[1px] bg-border"></div>
                <div className="flex flex-col space-y-2 justify-center items-center w-[50%]">
                    <div className="flex flex-col space-y-2 justify-center items-center">
                        <span className="font-medium text-[20px]">현재 웨이팅</span>
                        <span className="font-bold text-[40px]">{waitingNumber} 팀</span>
                        <span className="font-medium text-[20px]">예상 대기 시간: {waitingTime} 분</span>
                    </div>
                </div>
                <div className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1" viewBox="0 0 489.533 489.533">
                        <g>
                            <path d="M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7-210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9   l-118.6,87.1c-2,1.5-2,4.4,0,5.9l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6   c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3-14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6   C49.575,418.961,150.875,501.261,268.175,488.161z" />
                        </g>
                    </svg>
                </div>
            </CardContent>
        </Card>
    )
}

export default WaitingCard