'use client';
import { SetStateAction, useEffect, useState } from 'react';
import WaitConfirmModal from '@/components/companies/WaitConfirmModal';
import PhonePad from '@/components/companies/PhonePad';
import WaitingCard from '@/components/companies/WaitingCard';
import Image from 'next/image';
import { z } from "zod"
import waitingService, { pb } from '@/service/WaitingService';
import { ManagementWaitConfirmParams, UserWaitParams } from '@/constants/interface';

export const phoneSchema = z.string().refine((value) => /^\d{3}-\d{4}-\d{4}$/g.test(value), {
    message: "Invalid phone number. Please enter a valid format (e.g., 010-1234-5678).",
});

export default function WaitingPage() {
    const [manageId, setManageId] = useState("")
    const [companyId, setCompanyId] = useState("") // company id
    const [waitTime, setWaitTime] = useState(0) // estimated waiting time
    const [userWaitsNumber, setUserWaitsNumber] = useState(0) // 유효한 웨이팅 개수
    const [rulesContent, setRulesContent] = useState("") // rules
    const [limitPerson, setLimitPerson] = useState(0)
    const [waitUserList, setWaitUserList] = useState<UserWaitParams[]>([])
    const [phoneNumber, setPhoneNumber] = useState("010-")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await waitingService.getUserWait()
                setManageId(data.id)

                const trueAdmissionStatusList = data?.expand?.user_waits.filter((item: UserWaitParams) => item.admission_status === false);
                setUserWaitsNumber(trueAdmissionStatusList.length ? trueAdmissionStatusList.length : 0)
                setWaitUserList(data?.expand?.user_waits)
                setWaitTime(data.estimated_waiting_time)
                setCompanyId(data.company)

                if (data.rules_enabled) {
                    setRulesContent(data.rules_content)
                }
                
                setLimitPerson(data.limit_persons)
            } catch (error) {
                console.error('Error fetching user waits:', error);
            }
        };

        fetchData(); 
    }, []); 


    const manageData = {
        "id": manageId,
        "company": companyId,
        "waiting_enabled": true,
        "estimated_waiting_time": waitTime,
        "limit_persons": limitPerson,
        "rules_enabled": rulesContent.length >= 1 ? true : false,
        "rules_content": rulesContent,
        "expand" : {
            "user_waits" : waitUserList
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
                    <WaitingCard companyName={'런던베이글뮤지엄'} waitingNumber={userWaitsNumber} waitingTime={waitTime} />
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
                <WaitConfirmModal phoneNumber={phoneNumber} manageData={manageData} />
            </div>
        </div>
    );
}
