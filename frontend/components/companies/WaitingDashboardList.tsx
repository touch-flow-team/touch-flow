"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WaitingListCard, { WaitingListCardProps } from "./WaitingListCard"
import GetCompanyInfo from "./action/GetCompanyInfo"
import { useParams } from "next/navigation"
import PocketBase from 'pocketbase'
import { useEffect, useState } from "react"

const WaitingDashboardList = () => {
    const pb = new PocketBase('http://127.0.0.1:8090')
    const params = useParams()
    const [manageId, setManageId] = useState("")
    const [data, setData] = useState<Array<WaitingListCardProps>>([])
    const fetchAllData = async () => {
        const response = await pb.collection('companies').getOne(String(params?.id), {
            expand: 'management_waits',
            fields: 'expand.management_waits.id'
        });
        setManageId(response?.expand?.management_waits[0]?.id)

        if (response?.expand?.management_waits[0]?.id.length >= 1){
            fetchUserWaits(response?.expand?.management_waits[0]?.id)
        }
    }

    const fetchUserWaits = async (manageId: string) => {

        const response = await pb.collection('management_waits').getOne(manageId, {
            expand: 'user_waits',
            fields: 'expand.user_waits.id, expand.user_waits.user_phone_number, expand.user_waits.admission_status, expand.user_waits.adult_persons, expand.user_waits.child_persons, expand.user_waits.created'
        });
        setData(response.expand?.user_waits)
        return response.expand?.user_waits
    }

    useEffect(() => {
        fetchAllData()
    }, [])

    const progressData = data.filter((item) => item.admission_status === false)
    const completeData = data.filter((item) => item.admission_status === true)

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
                                    <WaitingListCard key={item.user_phone_number} user_phone_number={item.user_phone_number} adult_persons={item.adult_persons} child_persons={item.child_persons} created={item.created} admission_status={item.admission_status} />
                                )
                            })
                        }
                    </div>
                </TabsContent>
                <TabsContent value="완료">
                    {
                        completeData.map((item) => {
                            return (
                                <WaitingListCard key={item.user_phone_number} user_phone_number={item.user_phone_number} adult_persons={item.adult_persons} child_persons={item.child_persons} created={item.created} admission_status={item.admission_status} />
                            )
                        })
                    }
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default WaitingDashboardList