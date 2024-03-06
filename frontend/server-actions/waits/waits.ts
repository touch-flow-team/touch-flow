'use server'

import twilioClient from "@/libs/twilio";
import { CallUserProps, GetCompanyInfoProps, ManagementWaitCreateParams, UserWaitCreateParams } from "@/types/waits/types";
import client from "@/libs/pocketbase";

export const GetCompanyInfo = async ({ companyId }: GetCompanyInfoProps) => {
    try {
        const record = await client.collection('companies').getOne(companyId, {
            sort: '-created',
            expand: 'management_waits',
            fields: 'id,name,expand.management_waits.id,expand.management_waits.waiting_enabled,expand.management_waits.limit_persons,expand.management_waits.estimated_waiting_time,expand.management_waits.rules_enabled,expand.management_waits.rules_content,expand.management_waits.user_waits'
        });

        return record;
    } catch (error) {
        console.error('Error fetching user wait:', error);
        throw error;
    }
}

export const CallUser = async ({ companyId, user_phone_number }: CallUserProps) => {
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

export const CreateUserWait = async (data: UserWaitCreateParams, manageId: string, manageData: ManagementWaitCreateParams) => {
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

export const GetUserWait = async (dataManageId: string) => {
    try {
        const record = await client.collection('management_waits').getOne(dataManageId, {
            sort: '-created',
            expand: 'user_waits',
            fields: 'expand.user_waits.id,expand.user_waits.user_phone_number,expand.user_waits.admission_status'
        });

        return record;
    } catch (error) {
        console.error('Error fetching user wait:', error);
        throw error;
    }
}