import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WaitingListCard from "./WaitingListCard"

const WaitingDashboardList = () => {

    const mockData = [
        {
            "phone_number": "01066667777",
            "adult_persons": 4,
            "child_persons": 2,
            "created": new Date(),
            "admission_status": false
        },
        {
            "phone_number": "01088889999",
            "adult_persons": 2,
            "child_persons": 0,
            "created": new Date(),
            "admission_status": false
        },
        {
            "phone_number": "01011112222",
            "adult_persons": 4,
            "child_persons": 2,
            "created": new Date(),
            "admission_status": true
        },
    ]

    const progressData = mockData.filter((item) => item.admission_status === false)
    const completeData = mockData.filter((item) => item.admission_status === true)

    return (
        <div className="flex flex-col w-full">
            <h3 className="mb-4 text-[24px] font-bold">웨이팅 목록</h3>
            <Tabs defaultValue="대기" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger className="w-full" value="대기">대기</TabsTrigger>
                    <TabsTrigger className="w-full" value="완료">완료</TabsTrigger>
                </TabsList>
                <TabsContent value="대기">
                    <div className="flex flex-col space-y-4">
                    {
                         progressData.map((item) => {
                            return (
                                <WaitingListCard key={item.phone_number} phone_number={item.phone_number} adult_persons={item.adult_persons} child_persons={item.child_persons} created={item.created} admission_status={item.admission_status} />
                            )
                        })
                    }
                    </div>
                </TabsContent>
                <TabsContent value="완료">
                {
                        completeData.map((item) => {
                            return (
                                <WaitingListCard key={item.phone_number} phone_number={item.phone_number} adult_persons={item.adult_persons} child_persons={item.child_persons} created={item.created} admission_status={item.admission_status} />
                            )
                        })
                    }
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default WaitingDashboardList