import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');

const waitingService = {
  getUserWait: async () => {
    try {
      // company id 별로 가지고 와야 함 - 추후 company id 를 기반으로 getOne 을 사용하도록   
      const response = await fetch(`http://127.0.0.1:8090/api/collections/companies/records?expand=management_waits&fields=id,name,expand.management_waits.id,expand.management_waits.waiting_enabled,expand.management_waits.limit_persons,expand.management_waits.estimated_waiting_time,expand.management_waits.rules_enabled,expand.management_waits.rules_content,expand.management_waits.user_waits`, { next: { revalidate: 1 } }).then((res) => res.json())
      return response.items[0]
    } catch (error) {
      console.error('Error fetching user wait:', error);
      throw error;
    }
  },
  getWaitUserList: async (manageId: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8090/api/collections/management_waits/records/${manageId}?expand=user_waits&fields=expand.user_waits.id,expand.user_waits.user_phone_number,expand.user_waits.admission_status`).then((res) => res.json())
      
      return response.expand?.user_waits
      
    } catch (error) {
      console.error('Error fetching user wait:', error);
      throw error;
    }
  }
};

export default waitingService