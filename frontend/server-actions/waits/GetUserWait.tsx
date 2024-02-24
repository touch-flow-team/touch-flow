'use server'

import client from "@/libs/pocketbase";

const GetUserWait = async (dataManageId: string) => {
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

export default GetUserWait