import client from '@/libs/pocketbase';
import { PB_COLLECTIONS, REVALIDATE_TAG } from '@/constants/constants';
import { revalidateTag } from 'next/cache';

type ActionParams = {
  actionType: 'create' | 'update' | 'delete';
  collection: keyof typeof PB_COLLECTIONS;
  data?: object;
  id?: string;
};

export const performServerAction = async ({ actionType, collection, data, id }: ActionParams) => {
  try {
    const result = await (async () => {
      switch (actionType) {
        case 'create':
          return client.collection(PB_COLLECTIONS[collection]).create(data);
        case 'update':
          if (!id) throw new Error('Update action requires an ID.');
          return client.collection(PB_COLLECTIONS[collection]).update(id, data);
        case 'delete':
          if (!id) throw new Error('Delete action requires an ID.');
          return client.collection(PB_COLLECTIONS[collection]).delete(id);
        default:
          throw new Error('Invalid action type.');
      }
    })();
    revalidateTag(`${collection.toUpperCase()}`);
    return result;
  } catch (error) {
    console.error('Server action failed:', error);
    throw error;
  }
};
