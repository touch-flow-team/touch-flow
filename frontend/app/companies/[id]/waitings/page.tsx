'use client';
import { useEffect, useState } from 'react';
import WaitConfirmModal from '@/components/companies/WaitConfirmModal';
import PhonePad from '@/components/companies/PhonePad';
import WaitingCard from '@/components/companies/WaitingCard';
import Image from 'next/image';
import { z } from "zod"
import { UserWaitParams } from '@/constants/interface';

export const phoneSchema = z.string().refine((value) => /^\d{3}-\d{4}-\d{4}$/g.test(value), {
    message: "Invalid phone number. Please enter a valid format (e.g., 010-1234-5678).",
});

interface WaitingPageProps {
    initialData: any,
    userWaitData: any
}


export default function WaitingPage () {
    const [manageId, setManageId] = useState("")
    const [companyId, setCompanyId] = useState("") // company id
    const [companyName, setCompanyName] = useState("")
    const [waitTime, setWaitTime] = useState(0) // estimated waiting time
    const [userWaitsNumber, setUserWaitsNumber] = useState(0) // 유효한 웨이팅 개수
    const [rulesContent, setRulesContent] = useState("") // rules
    const [limitPerson, setLimitPerson] = useState(0)
    const [waitUserList, setWaitUserList] = useState<UserWaitParams[]>([])
    const [phoneNumber, setPhoneNumber] = useState("010-")
    const [isFetching, setIsFetching] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                // data settings
                const response = await fetch(`http://127.0.0.1:8090/api/collections/companies/records?expand=management_waits&fields=id,name,expand.management_waits.id,expand.management_waits.waiting_enabled,expand.management_waits.limit_persons,expand.management_waits.estimated_waiting_time,expand.management_waits.rules_enabled,expand.management_waits.rules_content,expand.management_waits.user_waits`, { next: { tags: ['WAIT'], revalidate: 10 } }).then((res) => res.json())
                const data = response.items[0]
                setManageId(data.expand.management_waits[0].id)

                if (data.expand.management_waits[0]?.id?.length >= 1) {
                    const dataManageId = data.expand.management_waits[0]?.id
                    const response = await fetch(`http://127.0.0.1:8090/api/collections/management_waits/records/${dataManageId}?expand=user_waits&fields=expand.user_waits.id,expand.user_waits.user_phone_number,expand.user_waits.admission_status`, { next: { tags: ['WAIT'], revalidate: 10 } }).then((res) => res.json())
                    const userWaitData = response.expand?.user_waits
                    const trueAdmissionStatusList = userWaitData.filter((item: UserWaitParams) => item.admission_status === false);
                    setUserWaitsNumber(trueAdmissionStatusList?.length ? trueAdmissionStatusList.length : 0)
                    setWaitUserList(userWaitData)
                }


                setWaitTime(data.expand.management_waits[0]?.estimated_waiting_time)
                setCompanyId(data.id)
                setCompanyName(data.name)

                if (data.expand.management_waits[0]?.rules_enabled) {
                    setRulesContent(data.expand.management_waits[0]?.rules_content)
                }

                setLimitPerson(data.expand.management_waits[0]?.limit_persons)


            } catch (error) {
                console.error('Error fetching user waits:', error);
            }
        };

        fetchData()

    }, [isFetching]);


    const manageData = {
        "id": manageId,
        "company": companyId,
        "waiting_enabled": true,
        "estimated_waiting_time": waitTime,
        "limit_persons": limitPerson,
        "rules_enabled": rulesContent.length >= 1 ? true : false,
        "rules_content": rulesContent,
        "expand": {
            "user_waits": waitUserList
        }
    }


    return (
        <div className="flex flex-col sm:flex-row w-full min-h-screen">
            <div className="flex flex-col w-full sm:w-[50%] bg-main h-[50%] sm:h-screen">
                <div className='ml-12 flex items-center space-x-2'>
                    <div className=' my-12'>
                        <Image className=' rounded-[10px] border' src="/logo.png" alt="logo" width={30} height={30} />
                    </div>
                    <span className="font-bold text-[20px]">TouchFlow</span>
                </div>
                <div className='mx-12 mb-12 mt-auto'>
                    <WaitingCard companyName={companyName} waitingNumber={userWaitsNumber} waitingTime={waitTime} />
                </div>
            </div>
            <div className="flex flex-col w-full sm:w-[50%] h-[50%] sm:h-screen">
                <div className='flex flex-col space-y-10 my-20 justify-center items-center'>
                    <span className='font-medium text-[16px]'>웨이팅 안내를 받을 수 있도록 번호를 입력해주세요.</span>
                    <span className='text-[40px] font-bold'>{phoneNumber}</span>
                </div>
                <div className='mt-auto'>
                    <PhonePad phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
                </div>
                <WaitConfirmModal phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} manageData={manageData} setIsFetching={setIsFetching} />
            </div>
        </div>
    );
}
