import { ICategory } from '@/app/companies/[id]/(dashboard-admin)/category/page';
import client from '@/libs/pocketbase';

export const getCategories = async () => {
  const categories: ICategory[] = await client.collection('categorys').getFullList();

  const categories_info = categories.map((category) => {
    return {
      name: category.name,
      id: category.id,
    };
  });
  return categories_info;
};
