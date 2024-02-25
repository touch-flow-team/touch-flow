"use client"
import client from "@/libs/pocketbase"
import { UseFetchWaitDashboardList, WaitingListCardProps } from "@/types/waits/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const useFetchWaitDashboardList = (): UseFetchWaitDashboardList => {
    const params = useParams()
    const [manageId, setManageId] = useState<string>("")
    const [action, setAction] = useState<string>("")
    const [data, setData] = useState<Array<WaitingListCardProps>>([])
    const [realData, setRealData] = useState<Array<WaitingListCardProps>>([])

    useEffect(() => {
        const fetchData = async () => {
            const company = await client.collection('companies').getOne(String(params?.id), {
                expand: 'management_waits',
                fields: 'expand.management_waits.id'
            });
            setManageId(company?.expand?.management_waits[0]?.id);

            if (company?.expand?.management_waits[0]?.id.length >= 1) {
                const response = await client.collection('management_waits').getOne(company?.expand?.management_waits[0]?.id, {
                    expand: 'user_waits',
                    fields: 'expand.user_waits.id, expand.user_waits.user_phone_number, expand.user_waits.admission_status, expand.user_waits.adult_persons, expand.user_waits.child_persons, expand.user_waits.created'
                });
                setData(response.expand?.user_waits);
            }
        };

        fetchData();
    }, [action == null]);

    useEffect(() => {
        // 데이터 가져오기
        const fetchManageData = async () => {
            // Use manageId from the state 
            const response = await client.collection('management_waits').getOne(manageId, {
                expand: 'user_waits',
                fields: 'expand.user_waits.id, expand.user_waits.user_phone_number, expand.user_waits.admission_status, expand.user_waits.adult_persons, expand.user_waits.child_persons, expand.user_waits.created'
            });
            setData(response.expand?.user_waits);
            setRealData(response.expand?.user_waits);
        };

        // manageId가 변경될 때마다 이전 구독을 취소하고 다시 구독
        const userWaitSubscribe = client.collection('user_waits').subscribe('*', function (e) {
            if (manageId.length >= 1) {
                fetchManageData();
            }
        });

        const managementWaitSubscribe = client.collection('management_waits').subscribe('*', function (e) {
            if (manageId.length >= 1) {
                fetchManageData();
            }
        })

        // 컴포넌트가 언마운트되거나 manageId가 변경될 때 이전 구독 취소
        return () => {
            client.collection('user_waits').unsubscribe()
            client.collection('management_waits').unsubscribe()
        };
    }, [manageId, action != null]);


    return [
        manageId, action, data, realData
    ]
}

export default useFetchWaitDashboardList