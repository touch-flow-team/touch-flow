'use server'

import { ManagementWaitCreateParams, UserWaitCreateParams } from "@/constants/interface";
import { revalidatePath, revalidateTag } from "next/cache";
import twilio from "twilio";

const CreateUserWait = async (data: UserWaitCreateParams, manageId: string, manageData: ManagementWaitCreateParams) => {
    try {
        // const record = await pb.collection('user_waits').create(data);
        const { user_phone_number, admission_status, adult_persons, child_persons } = data

        const userResponse = await fetch('http://127.0.0.1:8090/api/collections/user_waits/records', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_phone_number, admission_status, adult_persons, child_persons }),
        })

        const responseData = await userResponse.json();

        if (responseData.id?.length >= 1) {
            const addedUserWaits = manageData.user_waits.concat(responseData.id)

            const ModifiedManageData = {
                ...manageData,
                "user_waits": addedUserWaits
            }

            const { company, waiting_enabled, estimated_waiting_time, limit_persons, rules_enabled, rules_content, user_waits } = ModifiedManageData

            const manageResponse = await fetch(`http://127.0.0.1:8090/api/collections/management_waits/records/${manageId}`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ company, waiting_enabled, estimated_waiting_time, limit_persons, rules_enabled, rules_content, user_waits }),
            })

            const twilioClient = twilio(process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID, process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN);

            const message = await twilioClient.messages.create({
                body: `웨이팅 접수가 완료 되었습니다. 예상 대기 시간은 ${manageData.estimated_waiting_time}분 입니다.`,
                to: `+82${user_phone_number}`, // 하이픈 없는 폰번호
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