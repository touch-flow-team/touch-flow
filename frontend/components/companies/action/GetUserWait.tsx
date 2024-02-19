'use server'
import PocketBase from 'pocketbase'

const GetUserWait = async (dataManageId: string) => {
    const pb = new PocketBase('http://127.0.0.1:8090')
    try {
        const record = await pb.collection('management_waits').getOne(dataManageId, {
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