import { ManagementWaitCreateParams, UserWaitCreateParams, UserWaitParams } from '@/constants/interface';
import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');

const waitingService = {
  getUserWait: async () => {
    try {
        const record = await pb.collection('management_waits').getFullList({
            sort: '-created',
            expand: 'user_waits',
            fields: 'id, company, waiting_enabled, limit_persons, estimated_waiting_time, rules_enabled, rules_content, expand.user_waits'
        });

        return record[0];
    } catch (error) {
        console.error('Error fetching user wait:', error);
        throw error;
    }
  }, 
  createUserWait: async (data: UserWaitCreateParams, manageId: string,  manageData: ManagementWaitCreateParams) => {
    try {
      const record = await pb.collection('user_waits').create(data);
      const addedUserWaits = manageData.user_waits.concat(record.id)

      console.log(addedUserWaits);
      

      const ModifiedManageData = {
        ...manageData,
        "user_waits": addedUserWaits
      }

      const manageRecord = await pb.collection('management_waits').update(manageId, ModifiedManageData)
      return record;
    } catch (error) {
      console.error('Error creating user wait:', error);
      throw error;
    }
  },
  getCompanyName: async (companyId: string) => {
    try {
        const record = await pb.collection('companies').getOne(companyId, {
            fields: 'name'
        });
        
        return record;
      } catch (error) {
        console.error('Error creating user wait:', error);
        throw error;
      }
  }
};

export default waitingService