'use client';
import WaitConfirmModal from '@/components/companies/waitings/WaitConfirmModal';
import PhonePad from '@/components/companies/PhonePad';
import WaitingCard from '@/components/companies/waitings/WaitingCard';
import Image from 'next/image';
import useFetchWaitList from '@/hooks/waits/useFetchWaitList';

export default function WaitingPage() {
    const [manageId, companyId, companyName, waitTime, userWaitsNumber, rulesEnabled,
        rulesContent, limitPerson, waitUserList, phoneNumber,
        setPhoneNumber, action
    ] = useFetchWaitList()
    
    const manageData = {
        "id": manageId,
        "company": companyId,
        "waiting_enabled": true,
        "estimated_waiting_time": waitTime,
        "limit_persons": limitPerson,
        "rules_enabled": rulesEnabled,
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
                <WaitConfirmModal phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} manageData={manageData} />
            </div>
        </div>
    );
}
