'use client'
import client from "@/libs/pocketbase"
import { GetCompanyInfo, GetUserWait } from "@/server-actions/waits/waits"
import { UseFetchWaitListResult, UserWaitParams } from "@/types/waits/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const useFetchWaitList = (): UseFetchWaitListResult => {
    const [manageId, setManageId] = useState<string>("")
    const [companyId, setCompanyId] = useState<string>("") // company id
    const [companyName, setCompanyName] = useState<string>("")
    const [waitTime, setWaitTime] = useState<number>(0) // estimated waiting time
    const [userWaitsNumber, setUserWaitsNumber] = useState(0) // 유효한 웨이팅 개수
    const [rulesEnabled, setRulesEnabled] = useState<boolean>(true) // rules
    const [rulesContent, setRulesContent] = useState<string>("") // rules
    const [limitPerson, setLimitPerson] = useState<number>(0)
    const [waitUserList, setWaitUserList] = useState<UserWaitParams[]>([])
    const [phoneNumber, setPhoneNumber] = useState<string>("010-")
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [action, setAction] = useState<string>("")

    const params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                // data settings
                const data = await GetCompanyInfo({ companyId: String(params?.id) })

                setManageId(data?.expand?.management_waits[0]?.id)

                if (data?.expand?.management_waits[0]?.id.length >= 1) {
                    const dataManageId = data?.expand?.management_waits[0]?.id
                    const response = await GetUserWait(dataManageId)
                    const userWaitData = response.expand?.user_waits ? response.expand?.user_waits : []
                    const trueAdmissionStatusList = userWaitData?.filter((item: UserWaitParams) => item.admission_status === false);
                    setUserWaitsNumber(trueAdmissionStatusList?.length ? trueAdmissionStatusList.length : 0)
                    setWaitUserList(userWaitData)
                }


                setWaitTime(data?.expand?.management_waits[0]?.estimated_waiting_time)
                setCompanyId(data?.id)
                setCompanyName(data?.name)

                setRulesEnabled(data?.expand?.management_waits[0]?.rules_enabled)
                setRulesContent(data?.expand?.management_waits[0]?.rules_content)

                setLimitPerson(data?.expand?.management_waits[0]?.limit_persons)


            } catch (error) {
                console.error('Error fetching user waits:', error);
            }
        };

        fetchData()

    }, [action == null]);

    useEffect(() => {
        const fetchManageData = async () => {
            const response = await GetUserWait(manageId)
            const userWaitData = response.expand?.user_waits ? response.expand?.user_waits : []
            const trueAdmissionStatusList = userWaitData?.filter((item: UserWaitParams) => item.admission_status === false);
            setUserWaitsNumber(trueAdmissionStatusList?.length ? trueAdmissionStatusList.length : 0)
            setWaitUserList(userWaitData)
        }

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
    }, [manageId, action != null])

    return [manageId, companyId, companyName, waitTime, userWaitsNumber, rulesEnabled,
        rulesContent, limitPerson, waitUserList, phoneNumber,
        setPhoneNumber, action
    ]
}

export default useFetchWaitList