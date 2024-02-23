import { IResult } from '@/app/companies/[id]/(dashboard-admin)/product/page';
import { ICategory } from '@/app/companies/[id]/(dashboard-admin)/category/page';

export const getCategories = async () => {
  const categories: IResult<ICategory> = await fetch(
    'http://127.0.0.1:8090/api/collections/categorys/records',
    { next: { tags: ['CATEGORY'] } },
  ).then((res) => res.json());

  const categories_info = categories.items.map((category) => {
    return {
      name: category.name,
      id: category.id,
    };
  });
  return categories_info;
};
