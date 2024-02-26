'use server'

import client from "@/libs/pocketbase";
import twilioClient from "@/libs/twilio";
import { ManagementWaitCreateParams, UserWaitCreateParams } from "@/types/waits/types";
import twilio from "twilio";

const CreateUserWait = async (data: UserWaitCreateParams, manageId: string, manageData: ManagementWaitCreateParams) => {
    try {
        console.log("hihihi")
        const responseData = await client.collection('user_waits').create(data);
        if (responseData.id?.length >= 1) {
            const addedUserWaits = manageData.user_waits.concat(responseData.id)

            const ModifiedManageData = {
                ...manageData,
                "user_waits": addedUserWaits
            }

            const manageResponse = await client.collection('management_waits').update(manageId, ModifiedManageData);

            const message = await twilioClient.messages.create({
                body: `웨이팅 접수가 완료 되었습니다. 예상 대기 시간은 ${manageData.estimated_waiting_time}분 입니다.`,
                to: `+82${data.user_phone_number}`, // 하이픈 없는 폰번호
                from: process.env.NEXT_PUBLIC_PHONE_NUMBER, //  twilio 에서 발급된 번호
            });

            return { "status": 200, "message": "전체 반영 되었습니다." }
        }

        return { "status": 500, "message": "management data 에 반영이 되지 않았습니다." }

    } catch (error) {
        console.error('Error creating user wait:', error);
        throw error;
    }
}

export default CreateUserWait