'use client'
import client from "@/libs/pocketbase"
import { UseFetchWaitSettings } from "@/types/waits/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


const useFetchWaitSettings = (): UseFetchWaitSettings => {
    const [waitingEnabled, setWaitingEnabled] = useState<boolean>(false)
    const [estimatedWaitingTime, setEstimatedWaitingTime] = useState<number>(0)
    const [limitPerson, setLimitPerson] = useState<number>(0)
    const [rulesEnabled, setRulesEnabled] = useState<boolean>(false)
    const [rulesContent, setRulesContent] = useState<string>("")
    const [manageId, setManageId] = useState<string>("")
    const [userWaits, setUserWaits] = useState<Array<string>>([])
    const [action, setAction] = useState<string>("")
    const params = useParams()

    const fetchData = async () => {
        const company = await client.collection('companies').getOne(String(params?.id), {
            expand: 'management_waits',
            fields: 'expand.management_waits.id'
        });
        setManageId(company?.expand?.management_waits[0]?.id);

        if (company?.expand?.management_waits[0]?.id.length >= 1) {
            const response = await client.collection('management_waits').getOne(company?.expand?.management_waits[0]?.id, {});
            setUserWaits(response.user_waits)
            setWaitingEnabled(response.waiting_enabled)
            setEstimatedWaitingTime(response.estimated_waiting_time)
            setLimitPerson(response.limit_persons)
            setRulesEnabled(response.rules_enabled)
            setRulesContent(response.rules_content)
        }
    };

    useEffect(() => {
        fetchData();
    }, [action == null]);

    useEffect(() => {
        // 데이터 가져오기
        // manageId가 변경될 때마다 이전 구독을 취소하고 다시 구독
        const managementWaitSubscribe = client.collection('management_waits').subscribe('*', function (e) {
            if (manageId.length >= 1) {
                fetchData();
            }
        })

        // 컴포넌트가 언마운트되거나 manageId가 변경될 때 이전 구독 취소
        return () => {
            client.collection('management_waits').unsubscribe()
        };
    }, [manageId, action != null]);


    return [
        waitingEnabled, estimatedWaitingTime, limitPerson, 
        rulesEnabled, rulesContent, manageId, userWaits, action,
        setWaitingEnabled, setRulesEnabled, setRulesContent
    ]
}

export default useFetchWaitSettings