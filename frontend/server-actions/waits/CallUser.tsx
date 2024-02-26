'use server'

import twilioClient from "@/libs/twilio";
import { CallUserProps, ManagementWaitCreateParams, UserWaitCreateParams } from "@/types/waits/types";
import GetCompanyInfo from "./GetCompanyInfo";


const CallUser = async ({ companyId, user_phone_number }: CallUserProps) => {
    try {
        const company = await GetCompanyInfo({ companyId: companyId })
        const message = await twilioClient.messages.create({
            body: `${company.name}: 웨이팅이 완료 되었습니다. 이제 입장해주세요.`,
            to: `+82${user_phone_number}`, // 하이픈 없는 폰번호
            from: process.env.NEXT_PUBLIC_PHONE_NUMBER, //  twilio 에서 발급된 번호
        });

        return { "status": 200, "message": "전체 반영 되었습니다." }
    } catch (error) {
        console.error('Error creating user wait:', error);
        return { "status": 500, "message": "management data 에 반영이 되지 않았습니다." }
    }
}

export default CallUser