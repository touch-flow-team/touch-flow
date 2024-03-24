import { useState } from 'react';

import Toast from '@/components/common/Toast';
import { performServerAction } from '@/server-actions/common/common';
import { PB_COLLECTIONS } from '@/constants/constants';

const useCategoryActions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const performAction = async (
    actionType: 'create' | 'update' | 'delete',
    collection: keyof typeof PB_COLLECTIONS,
    data: object = {},
    id?: string,
  ) => {
    setIsLoading(true);
    try {
      await performServerAction({ actionType, collection, data, id });
      Toast({
        title: 'Success',
        description: `${actionType} action completed successfully.`,
        mode: 'success',
      });
    } catch (error) {
      Toast({
        title: 'Error',
        description: `Error performing ${actionType} action.`,
        mode: 'fail',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { performAction, isLoading };
};

export default useCategoryActions;
