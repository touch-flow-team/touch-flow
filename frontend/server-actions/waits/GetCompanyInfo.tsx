'use server'
import client from '@/libs/pocketbase';

interface GetCompanyInfoProps {
    companyId: string
}

const GetCompanyInfo = async ({ companyId }: GetCompanyInfoProps) => {
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

export default GetCompanyInfo