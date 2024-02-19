'use server'

import { ManagementWaitCreateParams, UserWaitCreateParams } from "@/constants/interface";
import twilio from "twilio";
import PocketBase from 'pocketbase'

const CreateUserWait = async (data: UserWaitCreateParams, manageId: string, manageData: ManagementWaitCreateParams) => {
    try {
        const pb = new PocketBase('http://127.0.0.1:8090')
        const responseData = await pb.collection('user_waits').create(data);

        if (responseData.id?.length >= 1) {
            const addedUserWaits = manageData.user_waits.concat(responseData.id)

            const ModifiedManageData = {
                ...manageData,
                "user_waits": addedUserWaits
            }

            const manageResponse = await pb.collection('management_waits').update(manageId, ModifiedManageData);

            // 추후 upgrade 하면 주석 제거 예정
            // const twilioClient = twilio(process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID, process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN);

            // const message = await twilioClient.messages.create({
            //     body: `웨이팅 접수가 완료 되었습니다. 예상 대기 시간은 ${manageData.estimated_waiting_time}분 입니다.`,
            //     to: `+82${user_phone_number}`, // 하이픈 없는 폰번호
            //     from: process.env.NEXT_PUBLIC_PHONE_NUMBER, //  twilio 에서 발급된 번호
            // });
            
            return { "status": 200, "message": "전체 반영 되었습니다." }
        }

        return { "status": 500, "message": "management data 에 반영이 되지 않았습니다." }

    } catch (error) {
        console.error('Error creating user wait:', error);
        throw error;
    }
}

export default CreateUserWait